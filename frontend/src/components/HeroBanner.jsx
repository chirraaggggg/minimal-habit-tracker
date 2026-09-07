export default function HeroBanner() {
  return (
    <section className="hero-banner-cozy" aria-label="Sanctuary motivation">
      <div className="hero-banner-tree-icon" aria-hidden="true">
        🌲
      </div>

      <div className="hero-banner-center">
        <h2 className="hero-banner-title">Welcome to your daily sanctuary</h2>
        <p className="hero-banner-subtitle">Small consistent steps create deep, quiet momentum.</p>
      </div>

      <div className="hero-banner-quote" aria-label="Motivational quote">
        <p className="hero-banner-quote-text">
          "Nature does not hurry,<br />
          yet everything is<br />
          accomplished."
        </p>
      </div>
    </section>
  );
}
