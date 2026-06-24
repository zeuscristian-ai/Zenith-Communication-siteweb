import { clientLogos } from "../data/content";

export default function LogoMarquee() {
  const logos = [...clientLogos, ...clientLogos];

  return (
    <section className="logo-marquee" aria-label="Références">
      <div className="logo-track">
        {logos.map((logo, index) => (
          <div className="logo-item" key={`${logo.image}-${index}`}>
            <img src={logo.image} alt={logo.name} />
          </div>
        ))}
      </div>
    </section>
  );
}
