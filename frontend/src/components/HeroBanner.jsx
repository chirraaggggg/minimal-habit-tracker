import { BunnyHero } from './Illustrations';

export default function HeroBanner() {
  return (
    <section className="hero-banner" aria-label="Motivation banner">
      <div className="hero-banner-illustration" aria-hidden="true">
        <BunnyHero />
      </div>

      <div className="hero-banner-center">
        <h2 className="hero-banner-title">You're doing great!</h2>
        <p className="hero-banner-subtitle">Keep showing up for yourself.</p>
      </div>

      <div className="hero-banner-quote" aria-label="Motivational quote">
        <p className="hero-banner-quote-text">
          "A little progress<br />
          each day adds up<br />
          to big results."
        </p>
        <div className="hero-banner-heart" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 13.5L2.8 8.6C1.4 7.2 1.4 4.8 2.8 3.4C4.2 2 6.5 2 7.9 3.4L8 3.5L8.1 3.4C9.5 2 11.8 2 13.2 3.4C14.6 4.8 14.6 7.2 13.2 8.6L8 13.5Z" fill="#F58B96" />
          </svg>
        </div>
      </div>
    </section>
  );
}

