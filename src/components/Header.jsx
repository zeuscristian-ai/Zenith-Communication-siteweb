import { useEffect, useState } from "react";
import { menuServices } from "../data/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header ${compact ? "is-compact" : ""} ${servicesOpen ? "has-mega-menu" : ""}`}
      onMouseLeave={() => setServicesOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setServicesOpen(false);
        }
      }}
    >
      <a className="wordmark" href="#top" aria-label="Groupe Zenith, accueil">
        <img
          className="wordmark-logo"
          src="/images/brand/zenith-logo-transparent.png"
          alt="Groupe Zenith, le centre de la créativité"
        />
      </a>

      <nav className={`desktop-nav ${open ? "is-open" : ""}`} aria-label="Navigation principale">
        <a href="#projets" onClick={() => setOpen(false)}>Réalisations</a>
        <a
          className="services-trigger"
          href="#services"
          aria-expanded={servicesOpen}
          onMouseEnter={() => setServicesOpen(true)}
          onFocus={() => setServicesOpen(true)}
          onClick={(event) => {
            if (window.matchMedia("(min-width: 901px)").matches) {
              event.preventDefault();
              setServicesOpen((value) => !value);
              return;
            }
            setOpen(false);
          }}
        >
          Services
          <span className="services-caret" aria-hidden="true" />
        </a>
        <a href="#agence" onClick={() => setOpen(false)}>Qui sommes-nous ?</a>
        <a href="#contact" onClick={() => setOpen(false)}>Nous Contacter</a>
      </nav>

      <button
        className={`menu-button ${open ? "is-open" : ""}`}
        type="button"
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`services-mega-menu ${servicesOpen ? "is-open" : ""}`}
        aria-hidden={!servicesOpen}
        onMouseEnter={() => setServicesOpen(true)}
      >
        <div className="mega-menu-grid">
          {menuServices.map((service, index) => (
            <a
              className="mega-service"
              href="#services"
              key={service.title}
              tabIndex={servicesOpen ? 0 : -1}
              onClick={() => setServicesOpen(false)}
            >
              <div className="mega-service-image">
                <img src={service.image} alt="" />
              </div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </a>
          ))}
        </div>

        <div className="mega-menu-footer">
          <span>{menuServices.length} expertises principales</span>
          <a
            href="#services"
            tabIndex={servicesOpen ? 0 : -1}
            onClick={() => setServicesOpen(false)}
          >
            Toutes les expertises <i>→</i>
          </a>
        </div>
      </div>
    </header>
  );
}
