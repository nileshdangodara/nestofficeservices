import "./About.css";

/**
 * Add or replace your company logo image paths here.
 * Place your logo files in `client/public/logos/` (e.g. "/logos/company1.png")
 * or import them from `client/src/assets/`.
 */
const COMPANY_LOGOS = [
  { name: "Company 1", src: "/logos/client_1.webp" },
  { name: "Company 2", src: "/logos/client_2.webp" },
  { name: "Company 3", src: "/logos/client_3.webp" },
  { name: "Company 4", src: "/logos/client_4.webp" },
  { name: "Company 5", src: "/logos/client_5.webp" },
  { name: "Company 6", src: "/logos/client_6.webp" },
  { name: "Company 7", src: "/logos/client_7.webp" },
  { name: "Company 8", src: "/logos/client_8.webp" },
  { name: "Company 9", src: "/logos/client_9.webp" },
  { name: "Company 10", src: "/logos/client_10.webp" },
  { name: "Company 12", src: "/logos/client_12.webp" },
  { name: "Company 13", src: "/logos/client_13.webp" },
  { name: "Company 14", src: "/logos/client_14.webp" },
  { name: "Company 15", src: "/logos/client_15.webp" },
];

export default function About() {
  const handleScrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      const headerH = document.querySelector(".header")?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="about-section section" aria-labelledby="about-title">
      <div className="container about-split-grid">
        {/* ── Left Column: Featured Interior Image ── */}
        <div className="about-col-left">
          <div className="about-media-card">
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85"
              alt="corporate office interior built and managed by NestOffice"
              className="about-media-img"
              width="760"
              height="480"
              loading="lazy"
            />
          </div>
        </div>

        {/* ── Right Column: Soft Rounded Content Card ── */}
        <div className="about-col-right">
          <div className="about-content-top">
            <span className="about-badge-pill">About NestOffice Services</span>

            <h2 id="about-title" className="about-heading">
              Complete Office Space Solution
            </h2>

            <p className="about-paragraph">
              Setting up a corporate workplace shouldn't mean juggling real estate brokers,
              interior designers, and moving teams. NestOffice provides a
              unified,Customise ecosystem: we locate prime commercial properties, deliver
              bespoke architectural fit-outs, IT systems, manage physical
              move-ins, and provide 24/7 facility care. You step into a ready-to-run office
              you are proud to call your own.
            </p>
          </div>

          <div className="about-cta-wrap">
            <button
              type="button"
              className="about-connected-btn"
              onClick={() => handleScrollTo("#services")}
            >
              <span className="about-connected-btn__pill">Explore Services</span>
              <span className="about-connected-btn__bridge" aria-hidden="true" />
              <span className="about-connected-btn__circle" aria-hidden="true">
                ↗
              </span>
            </button>
          </div>
        </div>

        {/* ── Bottom Row: ReactVibe Brand Loop (Company Logos Marquee) ── */}
        <div className="about-stats-row">
          <div className="about-brand-loop" aria-label="Partner and client company logos">
            <div className="about-brand-loop__fade about-brand-loop__fade--left" aria-hidden="true" />
            <div className="about-brand-loop__fade about-brand-loop__fade--right" aria-hidden="true" />

            <div className="about-brand-loop__track">
              {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, idx) => (
                <div key={`${logo.name}-${idx}`} className="about-brand-loop__item">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="about-brand-loop__img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
