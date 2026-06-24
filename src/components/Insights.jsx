import { insights } from "../data/content";
import Reveal from "./Reveal";

export default function Insights() {
  return (
    <section className="insights paper-section">
      <div className="shell">
        <Reveal className="section-heading insights-title">
          <h2>Points de vue</h2>
        </Reveal>
        <div className="insight-grid">
          {insights.map((insight, index) => (
            <Reveal delay={index * 70} key={insight.title}>
              <article className="insight-card">
                <img src={insight.image} alt="" />
                <small>{insight.date}</small>
                <h3>{insight.title}</h3>
                <p>{insight.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
