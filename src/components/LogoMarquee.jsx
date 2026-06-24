import { clientLogos } from "../data/content";

export default function LogoMarquee() {
  const logos = [...clientLogos, ...clientLogos];

  return (
    <section className="logo-marquee" aria-label="Références">
      <div className="logo-track">
        {logos.map((logo, index) => (
          <div className="logo-item" key={`${logo}-${index}`}>
            <img src={logo} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
}
