import { useState, useEffect, useRef, useCallback } from "react";
import "./Hero.css";

const HERO_SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
    badge: "Prime Location Search",
    title: "Commercial Office Towers",
    alt: "Prime commercial corporate office towers delivered by NestOffice",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    badge: "Site Search & Fit-Out",
    title: "Bespoke Interior Architecture",
    alt: "Bespoke commercial interior fit-out and office architecture",
  },
  {
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    badge: "MEP & HVAC Setup",
    title: "Smart Facility Infrastructure",
    alt: "MEP, central HVAC and smart workplace infrastructure setup",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80",
    badge: "Move-In & Care",
    title: "Customise Ready Handover",
    alt: "Move-in ready Customise workplace and facility management",
  },
];

export default function Hero() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const nextSlide = useCallback(() => {
    setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setSlideIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-advance slides every 3.5 seconds on tablet/mobile
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 3500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const handleScrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      const headerH = document.querySelector(".header")?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero-section" aria-label="Hero">
      <div className="container hero-showcase-grid">
        {/* ── Column 1: Left Content, Figure-8 Pill CTA, Rating & Bottom Info Cards ── */}
        <div className="hero-col-left">
          <div className="hero-copy-block">
            <h1 className="hero-main-heading">
              Complete Office Space Solution
            </h1>

            <p className="hero-description">
              From scouting prime commercial locations to bespoke customise interior fit-outs,
              smart IT setups, seamless relocation, and ongoing facility management —
              we handle the entire journey so you can simply step in and call it your own.
            </p>

            {/* Connected Figure-8 Pill CTA Button */}
            <div className="hero-cta-row">
              <button
                type="button"
                className="hero-connected-btn"
                onClick={() => handleScrollTo("#contact")}
              >
                <span className="hero-connected-btn__pill">Start Your Office Search</span>
                <span className="hero-connected-btn__bridge" aria-hidden="true" />
                <span className="hero-connected-btn__circle" aria-hidden="true">
                  ↗
                </span>
              </button>
            </div>
          </div>

          {/* Bottom 2 Info Cards */}
          <div className="hero-meta-grid">
            <div className="hero-meta-card">
              <div className="hero-meta-pill">
                <span className="hero-meta-icon" aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                </span>
                <span className="hero-meta-tag-text">Journey Scope</span>
              </div>
              <div className="hero-meta-value">Search to Move-In</div>
            </div>

            <div className="hero-meta-card">
              <div className="hero-meta-pill">
                <span className="hero-meta-icon" aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                </span>
                <span className="hero-meta-tag-text">Delivery Model</span>
              </div>
              <div className="hero-meta-value">100% Customised Handover</div>
            </div>
          </div>
        </div>

        {/* ── Column 2: Center Tall Portrait Architectural Image (Desktop Only) ── */}
        <div className="hero-col-center">
          <div className="hero-portrait-card">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85"
              alt="Prime commercial corporate office towers delivered by NestOffice"
              className="hero-portrait-img"
              width="680"
              height="860"
            />
          </div>
        </div>

        {/* ── Column 3: Right Bento Card (Desktop Only) ── */}
        <div className="hero-col-right">
          <div className="hero-bento-header">
            <h2 className="hero-bento-title">
              Complete Workspace Solutions
              <br />
              Under One Roof
            </h2>
            <button
              type="button"
              className="hero-bento-arrow"
              onClick={() => handleScrollTo("#services")}
              aria-label="Explore all services"
            >
              ↗
            </button>
          </div>

          {/* Top Large Bento Image */}
          <div
            className="hero-bento-media hero-bento-media--large"
            onClick={() => handleScrollTo("#services")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleScrollTo("#services");
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80"
              alt="Bespoke commercial interior fit-out and office architecture"
              loading="eager"
            />
            <span className="hero-bento-badge">Site Search &amp; Fit-Out</span>
          </div>

          {/* Bottom Two Square Bento Images */}
          <div className="hero-bento-subgrid">
            <div
              className="hero-bento-media hero-bento-media--small"
              onClick={() => handleScrollTo("#services")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleScrollTo("#services");
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80"
                alt="MEP, central HVAC and smart workplace infrastructure setup"
                loading="eager"
              />
              <span className="hero-bento-badge">MEP &amp; HVAC Setup</span>
            </div>

            <div
              className="hero-bento-media hero-bento-media--small"
              onClick={() => handleScrollTo("#services")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleScrollTo("#services");
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80"
                alt="Move-in ready Customise workplace and facility management"
                loading="eager"
              />
              <span className="hero-bento-badge">Move-In &amp; Care</span>
            </div>
          </div>
        </div>

        {/* ── Tablet & Mobile Carousel: Replaces Center & Bento to Minimize Size ── */}
        <div
          className="hero-mobile-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={(e) => {
            setIsPaused(true);
            handleTouchStart(e);
          }}
          onTouchEnd={(e) => {
            setIsPaused(false);
            handleTouchEnd(e);
          }}
          aria-roledescription="carousel"
          aria-label="Workspace showcase carousel"
        >
          <div className="hero-carousel-viewport">
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.badge}
                className={`hero-carousel-slide ${idx === slideIdx ? "hero-carousel-slide--active" : ""}`}
                aria-hidden={idx !== slideIdx}
                onClick={() => handleScrollTo("#services")}
                role="button"
                tabIndex={idx === slideIdx ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleScrollTo("#services");
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="hero-carousel-img"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
                <div className="hero-carousel-overlay" aria-hidden="true" />
                <div className="hero-carousel-caption">
                  <span className="hero-carousel-badge">{slide.badge}</span>
                  <span className="hero-carousel-title">{slide.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls: Arrows + Dots */}
          <div className="hero-carousel-controls">
            <button
              type="button"
              className="hero-carousel-arrow hero-carousel-arrow--prev"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              ←
            </button>

            <div className="hero-carousel-dots" role="tablist" aria-label="Slide indicators">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`hero-carousel-dot ${idx === slideIdx ? "hero-carousel-dot--active" : ""}`}
                  onClick={() => setSlideIdx(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-selected={idx === slideIdx}
                  role="tab"
                />
              ))}
            </div>

            <button
              type="button"
              className="hero-carousel-arrow hero-carousel-arrow--next"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
