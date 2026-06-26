import { useEffect, useState } from "react";
import { heroSlides } from "../data/content";

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % heroSlides.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-media">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.image}
            className={index === active ? "is-active" : ""}
            src={slide.image}
            alt=""
          />
        ))}
        <div className="hero-shade" />
      </div>

      <div className="hero-content shell">
        <h1>
          <span>Agence</span> <span>pour les</span>
          <br />
          <em>marques</em> <span>qui avancent</span>
        </h1>
        <p>Stratégie, création et déploiement depuis 2009.</p>

        <div className="hero-controls">
          <div className="hero-dots" aria-label="Sélectionner une image">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                className={index === active ? "is-active" : ""}
                type="button"
                aria-label={`Afficher ${slide.title}`}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
          <div className="hero-slide-copy" key={heroSlides[active].title}>
            <small>{heroSlides[active].label}</small>
            <strong>{heroSlides[active].title}</strong>
          </div>
          <a className="ghost-button" href="#contact">
            Démarrer un projet <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
