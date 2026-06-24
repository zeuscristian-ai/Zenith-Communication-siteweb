import { industries } from "../data/content";
import Reveal from "./Reveal";

export default function Industries() {
  return (
    <section className="industries dark-section">
      <div className="shell industries-layout">
        <Reveal className="industries-intro">
          <span className="eyebrow">Secteurs accompagnés</span>
          <h2>
            Tous les
            <br />
            secteurs.
            <br />
            <em>Une seule exigence.</em>
          </h2>
          <p>
            Nous adaptons les idées, les formats et les canaux aux réalités de
            chaque marché.
          </p>
          <div className="industry-tags" aria-label="Types d’organisations">
            <span>Institutions</span>
            <span>Entreprises</span>
            <span>Marques</span>
            <span>PME</span>
            <span>Projets</span>
          </div>
        </Reveal>

        <div className="industry-list">
          {industries.map((industry, index) => (
            <Reveal delay={index * 35} key={industry}>
              <a href="#contact">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{industry}</strong>
                <i aria-hidden="true">→</i>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
