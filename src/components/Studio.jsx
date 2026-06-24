import Reveal from "./Reveal";

export default function Studio() {
  return (
    <section className="studio paper-section" id="agence">
      <div className="shell studio-grid">
        <Reveal>
          <span className="eyebrow">Groupe Zenith</span>
          <h2>
            Le terrain,
            <br />
            <em>amplifié.</em>
          </h2>
          <p>
            Une agence dynamique et créative qui accompagne les marques au Togo
            et dans la sous-région, de la réflexion stratégique jusqu’à
            l’exécution.
          </p>
        </Reveal>

        <Reveal className="studio-stats" delay={100}>
          <div>
            <strong>2009</strong>
            <span>Présents sur le marché togolais</span>
          </div>
          <div>
            <strong>360°</strong>
            <span>Une communication pensée de bout en bout</span>
          </div>
          <div>
            <strong>01</strong>
            <span>Un partenaire pour tous vos points de contact</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
