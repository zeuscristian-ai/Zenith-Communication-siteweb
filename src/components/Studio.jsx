import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Reveal from "./Reveal";

export default function Studio() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let observer;
    const context = gsap.context(() => {
      const counters = gsap.utils.toArray(".studio-counter");
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const animateCounters = () => {
        counters.forEach((counter, index) => {
          const target = Number(counter.dataset.value);
          const suffix = counter.dataset.suffix || "";
          const digits = Number(counter.dataset.digits || 1);
          const state = { value: 0 };

          const render = () => {
            counter.textContent =
              String(Math.round(state.value)).padStart(digits, "0") + suffix;
          };

          render();

          gsap.to(state, {
            value: target,
            duration: 2.1,
            delay: index * 0.12,
            ease: "power3.out",
            onUpdate: render,
          });
        });
      };

      counters.forEach((counter) => {
        const target = Number(counter.dataset.value);
        const suffix = counter.dataset.suffix || "";
        const digits = Number(counter.dataset.digits || 1);
        counter.textContent = reducedMotion
          ? String(target).padStart(digits, "0") + suffix
          : String(0).padStart(digits, "0") + suffix;
      });

      if (reducedMotion) return undefined;

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          animateCounters();
          observer.disconnect();
        },
        { threshold: 0.2 },
      );

      observer.observe(sectionRef.current);
    }, sectionRef);

    return () => {
      observer?.disconnect();
      context.revert();
    };
  }, []);

  return (
    <section className="studio paper-section" id="agence" ref={sectionRef}>
      <div className="shell studio-grid">
        <Reveal>
          <span className="eyebrow">Groupe Zenith</span>
          <h2>
            Le terrain,
            <br />
            <em>amplifié.</em>
          </h2>
          <p>
            Une agence dynamique et créative qui accompagne les marques au Togo
            et dans la sous-région, de la réflexion stratégique jusqu’à
            l’exécution.
          </p>
        </Reveal>

        <Reveal className="studio-stats" delay={100}>
          <div>
            <strong className="studio-counter" data-value="2009">
              0
            </strong>
            <span>Présents sur le marché togolais</span>
          </div>
          <div>
            <strong
              className="studio-counter"
              data-value="360"
              data-suffix="°"
            >
              0°
            </strong>
            <span>Une communication pensée de bout en bout</span>
          </div>
          <div>
            <strong
              className="studio-counter"
              data-value="1"
              data-digits="2"
            >
              00
            </strong>
            <span>Un partenaire pour tous vos points de contact</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
