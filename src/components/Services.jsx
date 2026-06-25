import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { services } from "../data/content";

export default function Services() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let observer;
    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      const eyebrow = sectionRef.current.querySelector(".services-eyebrow");
      const title = sectionRef.current.querySelector(".services-title");
      const cta = sectionRef.current.querySelector(".services-cta");
      const rows = gsap.utils.toArray(".service-row");

      gsap.set([eyebrow, title, cta], { autoAlpha: 0, y: 28 });
      gsap.set(rows, { autoAlpha: 0, y: 34 });
      rows.forEach((row) => {
        gsap.set(row.children, { autoAlpha: 0, y: 18 });
      });

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          const timeline = gsap.timeline({
            defaults: { ease: "power4.out" },
          });

          timeline
            .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.55 })
            .to(title, { autoAlpha: 1, y: 0, duration: 0.75 }, "-=0.34")
            .to(cta, { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.42");

          rows.forEach((row, index) => {
            const position = index === 0 ? "-=0.12" : "-=0.42";

            timeline
              .to(
                row,
                { autoAlpha: 1, y: 0, duration: 0.68 },
                position,
              )
              .to(
                row.children,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.48,
                  stagger: 0.07,
                },
                "-=0.5",
              );
          });

          observer.disconnect();
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      observer.observe(sectionRef.current);
    }, sectionRef);

    return () => {
      observer?.disconnect();
      context.revert();
    };
  }, []);

  return (
    <section
      className="services paper-section"
      id="services"
      ref={sectionRef}
    >
      <div className="shell">
        <div className="services-heading">
          <div>
            <span className="eyebrow services-eyebrow">
              Ce que nous maîtrisons
            </span>
            <h2 className="services-title">Nos expertises</h2>
          </div>
          <a className="text-link services-cta" href="#contact">
            Tous les services
          </a>
        </div>

        <div className="service-list">
          {services.map((service, index) => (
            <a className="service-row" href="#contact" key={service.title}>
              <span className="service-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
