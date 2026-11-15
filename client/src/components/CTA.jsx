import "./CTA.css";

const scrollTo = (href) => (e) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    const h = document.querySelector(".header")?.offsetHeight || 72;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - h,
      behavior: "smooth",
    });
  }
};

export default function CTA() {
  return (
    <section className="cta-overlap-section" aria-labelledby="cta-heading">
      <div className="container cta-overlap-container">
        <div className="cta-overlap-card">
          {/* Subtle decorative watermark strokes */}
          <svg
            className="cta-overlap-watermark"
            viewBox="0 0 800 320"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M110 -40 C190 90, 140 240, 260 360"
              stroke="currentColor"
              strokeWidth="36"
              strokeLinecap="round"
            />
            <path
              d="M230 -60 C290 70, 390 120, 520 80 C640 40, 690 190, 620 360"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
            />
          </svg>

          <div className="cta-overlap-content">
            <h2 id="cta-heading" className="cta-overlap-heading">
              Start Streamlining Your
              <br />
              Workplace Maintenance Today
            </h2>

            <p className="cta-overlap-sub">
              Coordinate cleaning, electrical, plumbing, AC &amp; HVAC, civil &amp;
              carpentry, and pest control — all through one dependable partner.
            </p>

            <div className="cta-overlap-actions">
              <a
                href="#contact"
                className="cta-overlap-btn"
                onClick={scrollTo("#contact")}
              >
                Request a Consultation Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
