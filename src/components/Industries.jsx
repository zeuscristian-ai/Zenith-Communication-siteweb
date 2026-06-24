import { industries } from "../data/content";
import Reveal from "./Reveal";

export default function Industries() {
  return (
    <section className="industries dark-section">
      <div className="shell">
        <Reveal className="industries-intro">
          <span className="eyebrow">Secteurs accompagnés</span>
          <h2>Tous les secteurs. Une seule exigence.</h2>
          <p>
            Nous adaptons les idées, les formats et les canaux aux réalités de
            chaque marché.
          </p>
        </Reveal>

        <div className="industry-list">
          {industries.map((industry, index) => (
            <Reveal delay={index * 35} key={industry}>
              <a href="#contact">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{industry}</strong>
                <i>→</i>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
