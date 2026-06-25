import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { milestones } from "../data/content";
import Reveal from "./Reveal";

export default function Milestones() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let observer;
    const context = gsap.context(() => {
      const counters = gsap.utils.toArray(".milestone-counter");
      const grid = sectionRef.current.querySelector(".milestone-grid");
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const renderFinalValues = () => {
        counters.forEach((counter) => {
          counter.textContent =
            counter.dataset.value + (counter.dataset.suffix || "");
        });
      };

      if (reducedMotion) {
        renderFinalValues();
        return;
      }

      counters.forEach((counter) => {
        const target = Number(counter.dataset.value);
        const start = target === 2009 ? 2000 : 0;
        counter.textContent = `${start}${counter.dataset.suffix || ""}`;
      });
      gsap.set(counters, { autoAlpha: 0, y: 28 });

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          counters.forEach((counter, index) => {
            const target = Number(counter.dataset.value);
            const start = target === 2009 ? 2000 : 0;
            const suffix = counter.dataset.suffix || "";
            const state = { value: start };

            gsap.to(counter, {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              delay: index * 0.14,
              ease: "power4.out",
            });

            gsap.to(state, {
              value: target,
              duration: 2.2,
              delay: index * 0.14,
              ease: "power3.out",
              onUpdate: () => {
                counter.textContent = `${Math.round(state.value)}${suffix}`;
              },
              onComplete: () => {
                counter.textContent = `${target}${suffix}`;
              },
            });
          });

          observer.disconnect();
        },
        { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
      );

      observer.observe(grid);
    }, sectionRef);

    return () => {
      observer?.disconnect();
      context.revert();
    };
  }, []);

  return (
    <section className="milestones paper-section" ref={sectionRef}>
      <div className="shell">
        <Reveal className="milestone-heading">
          <span className="eyebrow">Notre crédibilité</span>
          <h2>Des preuves, pas seulement des promesses</h2>
          <p>
            Une expérience construite dans la durée, une présence nationale et
            une capacité de déploiement pensée pour les réalités du marché.
          </p>
        </Reveal>

        <div className="milestone-grid">
          {milestones.map(([value, label], index) => {
            const suffix = value.endsWith("+") ? "+" : "";
            const numericValue = value.replace(/\D/g, "");

            return (
              <Reveal className="milestone" delay={index * 70} key={value}>
                <strong
                  className="milestone-counter"
                  data-value={numericValue}
                  data-suffix={suffix}
                >
                  {value}
                </strong>
                <span>{label}</span>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="quote">
          <blockquote>
            « Simplicité, collaboration, résultats. »
          </blockquote>
          <cite>La philosophie Groupe Zenith</cite>
        </Reveal>
      </div>
    </section>
  );
}
