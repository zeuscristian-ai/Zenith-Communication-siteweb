import { milestones } from "../data/content";
import Reveal from "./Reveal";

export default function Milestones() {
  return (
    <section className="milestones paper-section">
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
          {milestones.map(([value, label], index) => (
            <Reveal className="milestone" delay={index * 70} key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </Reveal>
          ))}
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
