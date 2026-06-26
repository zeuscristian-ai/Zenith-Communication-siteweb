import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { projects } from "../data/content";
import Reveal from "./Reveal";

const AUTO_SCROLL_SPEED = 0.055;

export default function Works() {
  const viewportRef = useRef(null);
  const pausedRef = useRef(false);
  const loopWidthRef = useRef(0);
  const wheelVelocityRef = useRef(0);
  const dragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    startScroll: 0,
  });
  const carouselProjects = [...projects, ...projects];

  const getStep = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;

    const card = viewport.querySelector(".project-card");
    const track = viewport.querySelector(".works-track");
    if (!card || !track) return 0;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }, []);

  const moveCarousel = useCallback((direction) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const step = getStep();
    if (!step) return;

    let currentIndex = Math.round(viewport.scrollLeft / step);

    if (direction < 0 && currentIndex === 0) {
      currentIndex = projects.length;
      viewport.scrollLeft = currentIndex * step;
    }

    const targetIndex = currentIndex + direction;

    gsap.to(viewport, {
      scrollLeft: targetIndex * step,
      duration: 1.05,
      ease: "power4.inOut",
      overwrite: true,
      onComplete: () => {
        if (targetIndex >= projects.length) {
          viewport.scrollLeft = (targetIndex - projects.length) * step;
        }
      },
    });
  }, [getStep]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return undefined;

    let frame;
    let previousTime = performance.now();

    const updateMetrics = () => {
      loopWidthRef.current = getStep() * projects.length;
    };

    const advance = (time) => {
      const elapsed = Math.min(time - previousTime, 34);
      previousTime = time;

      if (!pausedRef.current && !gsap.isTweening(viewport)) {
        const loopWidth = loopWidthRef.current;
        const wheelVelocity = wheelVelocityRef.current;

        viewport.scrollLeft +=
          elapsed * (AUTO_SCROLL_SPEED + wheelVelocity);
        wheelVelocityRef.current *= Math.pow(0.9, elapsed / 16.67);

        if (Math.abs(wheelVelocityRef.current) < 0.002) {
          wheelVelocityRef.current = 0;
        }

        if (loopWidth > 0) {
          if (viewport.scrollLeft >= loopWidth) {
            viewport.scrollLeft -= loopWidth;
          } else if (viewport.scrollLeft < 0) {
            viewport.scrollLeft += loopWidth;
          }
        }
      }

      frame = window.requestAnimationFrame(advance);
    };

    updateMetrics();
    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(viewport);
    frame = window.requestAnimationFrame(advance);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      gsap.killTweensOf(viewport);
    };
  }, [getStep]);

  return (
    <section
      className="works paper-section"
      id="projets"
    >
      <div className="works-header shell">
        <Reveal className="works-heading">
          <div>
            <h2>Le travail parle</h2>
            <p>Sélection de réalisations · 2009–2026</p>
          </div>

          <div className="works-controls" aria-label="Navigation des projets">
            <button
              type="button"
              aria-label="Voir les projets précédents"
              onClick={() => moveCarousel(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Voir les projets suivants"
              onClick={() => moveCarousel(1)}
            >
              ›
            </button>
          </div>
        </Reveal>
      </div>

      <div
        className="works-viewport"
        ref={viewportRef}
        tabIndex={0}
        aria-label="Nos réalisations, faites défiler horizontalement"
        onClickCapture={(event) => {
          if (dragRef.current.moved) {
            event.preventDefault();
            event.stopPropagation();
            dragRef.current.moved = false;
          }
        }}
        onPointerDown={(event) => {
          pausedRef.current = true;
          if (event.pointerType !== "mouse") return;

          dragRef.current = {
            active: true,
            moved: false,
            startX: event.clientX,
            startScroll: event.currentTarget.scrollLeft,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragRef.current.active || event.pointerType !== "mouse") return;

          const distance = event.clientX - dragRef.current.startX;
          if (Math.abs(distance) > 4) dragRef.current.moved = true;
          event.currentTarget.scrollLeft =
            dragRef.current.startScroll - distance;
        }}
        onPointerUp={(event) => {
          dragRef.current.active = false;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          pausedRef.current = false;
        }}
        onPointerCancel={() => {
          dragRef.current.active = false;
          pausedRef.current = false;
        }}
        onWheel={(event) => {
          event.preventDefault();
          const delta =
            Math.abs(event.deltaX) > Math.abs(event.deltaY)
              ? event.deltaX
              : event.deltaY;

          wheelVelocityRef.current = Math.max(
            -1.45,
            Math.min(1.45, wheelVelocityRef.current + delta * 0.0065),
          );
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveCarousel(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            moveCarousel(1);
          }
        }}
      >
        <div className="works-track">
          {carouselProjects.map((project, index) => {
            const duplicate = index >= projects.length;

            return (
              <article
                className="project-card"
                key={`${project.title}-${index}`}
                aria-hidden={duplicate}
              >
                <a href="#contact" tabIndex={duplicate ? -1 : 0}>
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <small>{project.category}</small>
                      <h3>{project.title}</h3>
                    </div>
                  </div>
                  <p>{project.description}</p>
                </a>
              </article>
            );
          })}
        </div>
      </div>

      <div className="shell">
        <a className="text-link all-projects" href="#contact">
          Voir toutes les réalisations <span>→</span>
        </a>
      </div>
    </section>
  );
}
