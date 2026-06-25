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
        counter.textContent = `0${counter.dataset.suffix || ""}`;
      });

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          counters.forEach((counter, index) => {
            const target = Number(counter.dataset.value);
            const suffix = counter.dataset.suffix || "";
            const state = { value: 0 };

            gsap.to(state, {
              value: target,
              duration: 1.8,
              delay: index * 0.1,
              ease: "power4.out",
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
        { threshold: 0.3 },
      );

      observer.observe(sectionRef.current);
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
          <span className="eyebrow">Notre trajectoire</span>
          <h2>La proximité crée la performance</h2>
          <p>
            Nous développons des solutions modernes, adaptées aux objectifs et
            aux publics de chaque organisation.
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
