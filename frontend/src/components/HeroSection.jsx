import { useEffect, useRef, useState } from 'react';
import { PixelNatureScene, IconPlus } from './Illustrations';

export default function HeroSection({ onAddHabit, onExploreClick }) {
  const heroRef = useRef(null);
  const [scrolledPast, setScrolledPast] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);
      if (currentY > 120) {
        setScrolledPast(true);
      } else {
        setScrolledPast(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax offset computation
  const parallaxOffset = Math.min(scrollY * 0.2, 60);
  const heroOpacity = Math.max(1 - scrollY / 320, 0);

  return (
    <section
      ref={heroRef}
      className={`hero-section-sanctuary ${scrolledPast ? 'scrolled-recede' : ''}`}
      style={{ opacity: heroOpacity }}
    >
      {/* Background Pixel Nature Scene with Parallax */}
      <div
        className="hero-landscape-viewport"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <PixelNatureScene />
      </div>

      {/* Floating Hero Content Overlay */}
      <div className="hero-content-box">
        <div className="hero-badge-pill">
          <span className="hero-badge-dot" />
          <span>QUIET DIGITAL SANCTUARY</span>
        </div>

        <h1 className="hero-main-title">
          Cultivate stillness,<br />
          <span className="hero-title-accent">one habit at a time.</span>
        </h1>

        <p className="hero-description">
          A cozy, minimal space for mindful daily consistency. Check off your goals, feel the warmth of momentum, and watch your daily retreat flourish.
        </p>

        <div className="hero-actions-row">
          <button
            type="button"
            className="btn-pill-coral"
            onClick={onAddHabit}
          >
            <IconPlus />
            <span>Plant a Habit</span>
          </button>

          <button
            type="button"
            className="btn-pill-secondary"
            onClick={() => {
              if (onExploreClick) {
                onExploreClick();
              } else {
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }
            }}
          >
            <span>Scroll to Sanctuary</span>
          </button>
        </div>
      </div>
    </section>
  );
}
