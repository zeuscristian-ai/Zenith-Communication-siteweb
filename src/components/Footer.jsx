export default function Footer() {
  return (
    <footer className="footer dark-section" id="contact">
      <div className="footer-cta shell">
        <p>Vous avez un projet en tête ?</p>
        <a href="tel:+22890897744">
          Parlons-en
          <span className="footer-cta-button" aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="footer-marquee" aria-hidden="true">
        <div>
          Stratégie <i>·</i> Création <i>·</i> Régie <i>·</i> Événementiel <i>·</i>
          Stratégie <i>·</i> Création <i>·</i> Régie <i>·</i> Événementiel <i>·</i>
        </div>
      </div>

      <div className="footer-grid shell">
        <div>
          <img
            className="footer-logo"
            src="/images/brand/zenith-logo-transparent.png"
            alt="Groupe Zenith"
          />
          <p>
            Boulevard Eyadema, face Garage Central, Immeuble GZ
            <br />
            Lomé, Togo
          </p>
        </div>
        <nav aria-label="Plan du site">
          <small>Plan du site</small>
          <a href="#top">Accueil</a>
          <a href="#projets">Réalisations</a>
          <a href="#services">Services</a>
          <a href="#agence">L’agence</a>
        </nav>
        <nav aria-label="Contact">
          <small>Contact</small>
          <a href="tel:+22890897744">+228 90 89 77 44</a>
          <a href="tel:+22898594540">+228 98 59 45 40</a>
          <a href="https://groupezenith.net">groupezenith.net</a>
        </nav>
        <nav aria-label="Réseaux sociaux">
          <small>Réseaux</small>
          <a href="#contact">Facebook</a>
          <a href="#contact">X / Twitter</a>
          <a href="#contact">WhatsApp</a>
        </nav>
      </div>

      <div className="footer-bottom shell">
        <span>© 2026 Groupe Zenith. Tous droits réservés.</span>
        <span>Lomé, Togo</span>
      </div>
    </footer>
  );
}
