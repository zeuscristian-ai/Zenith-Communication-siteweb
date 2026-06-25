import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Studio() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let observer;
    const context = gsap.context(() => {
      const blocks = gsap.utils.toArray(".studio-stat");
      const introElements = gsap.utils.toArray(".studio-intro > *");
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      gsap.set(introElements, { autoAlpha: 0, y: 28 });
      blocks.forEach((block) => {
        gsap.set(block.children, { autoAlpha: 0, y: 24 });
      });

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          const timeline = gsap.timeline({
            defaults: { ease: "power4.out" },
          });

          timeline.to(introElements, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
          });

          blocks.forEach((block, index) => {
            timeline
              .to(
                block.querySelector("strong"),
                { autoAlpha: 1, y: 0, duration: 0.7 },
                index === 0 ? "-=0.2" : "-=0.25",
              )
              .to(
                block.querySelector("span"),
                { autoAlpha: 1, y: 0, duration: 0.5 },
                "-=0.38",
              );
          });

          observer.disconnect();
        },
        { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
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
      className="studio paper-section"
      id="agence"
      ref={sectionRef}
    >
      <div className="shell studio-grid">
        <div className="studio-intro">
          <span className="eyebrow">Notre positionnement</span>
          <h2>
            Penser juste,
            <br />
            <em>agir fort.</em>
          </h2>
          <p>
            Nous ne faisons pas seulement de belles campagnes. Nous construisons
            une direction claire, une identité cohérente et un déploiement
            capable de produire un impact réel sur le terrain.
          </p>
        </div>

        <div className="studio-stats">
          <div className="studio-stat">
            <strong>Conseil</strong>
            <span>Comprendre le marché, les publics et les objectifs</span>
          </div>
          <div className="studio-stat">
            <strong>Création</strong>
            <span>Donner au message une forme claire et mémorable</span>
          </div>
          <div className="studio-stat">
            <strong>Terrain</strong>
            <span>Déployer les idées là où elles rencontrent leur public</span>
          </div>
        </div>
      </div>
    </section>
  );
}
