import { projects } from "../data/content";
import Reveal from "./Reveal";

export default function Works() {
  return (
    <section className="works paper-section" id="projets">
      <div className="shell">
        <Reveal className="section-heading">
          <h2>Projets sélectionnés</h2>
          <p>Communication 360°</p>
        </Reveal>

        <div className="works-grid">
          {projects.map((project, index) => (
            <Reveal
              className={`project-card project-${(index % 4) + 1}`}
              delay={(index % 2) * 90}
              key={project.title}
            >
              <a href="#contact">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <small>{project.category}</small>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </a>
            </Reveal>
          ))}
        </div>

        <a className="text-link all-projects" href="#contact">
          Voir toutes les réalisations <span>→</span>
        </a>
      </div>
    </section>
  );
}
