import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { projects } from "../data/content";
import Reveal from "./Reveal";

export default function Works() {
  const viewportRef = useRef(null);
  const pausedRef = useRef(false);
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
      duration: 0.9,
      ease: "power3.inOut",
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

    const advance = () => {
      if (pausedRef.current || gsap.isTweening(viewport)) return;

      const step = getStep();
      if (!step) return;

      const loopWidth = step * projects.length;
      viewport.scrollLeft += 0.55 * gsap.ticker.deltaRatio(60);

      if (viewport.scrollLeft >= loopWidth) {
        viewport.scrollLeft -= loopWidth;
      }
    };

    gsap.ticker.add(advance);

    return () => {
      gsap.ticker.remove(advance);
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
            <h2>Projets sélectionnés</h2>
            <p>Vol. 2009–2026</p>
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
        aria-label="Projets sélectionnés, faites défiler horizontalement"
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
          const viewport = event.currentTarget;
          const step = getStep();
          if (!step) return;

          const loopWidth = step * projects.length;
          const delta =
            Math.abs(event.deltaX) > Math.abs(event.deltaY)
              ? event.deltaX
              : event.deltaY;

          viewport.scrollLeft += delta * 0.65;

          if (viewport.scrollLeft >= loopWidth) {
            viewport.scrollLeft -= loopWidth;
          } else if (viewport.scrollLeft < 0) {
            viewport.scrollLeft += loopWidth;
          }
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
