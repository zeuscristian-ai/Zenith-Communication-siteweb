import { services } from "../data/content";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section className="services paper-section" id="services">
      <div className="shell">
        <Reveal className="services-heading">
          <div>
            <span className="eyebrow">Notre savoir-faire</span>
            <h2>Expertises</h2>
          </div>
          <a className="text-link" href="#contact">Tous les services</a>
        </Reveal>

        <div className="service-list">
          {services.map((service, index) => (
            <Reveal delay={index * 45} key={service.title}>
              <a className="service-row" href="#contact">
                <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-arrow">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
