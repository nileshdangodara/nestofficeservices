import "./Footer.css";
import { SERVICES } from "./servicesData.js";

const CURRENT_YEAR = new Date().getFullYear();

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

export default function Footer() {
  return (
    <footer className="footer-shell" role="contentinfo">
      <div className="footer-card">
        <div className="container">
          <div className="footer-card__grid">
            {/* Column 1: Brand, Description & Action Icons */}
            <div className="footer-card__brand">
              <a
                href="#home"
                className="footer-card__logo"
                onClick={scrollTo("#home")}
                aria-label="NestOffice — Home"
              >
                <img
                  src="/logo-white.webp"
                  alt="NestOffice Services"
                  className="footer-card__logo-img"
                  width="28"
                  height="28"
                />
                <span className="footer-card__logo-text">NestOffice Services</span>
              </a>

              <p className="footer-card__desc">
                A dedicated corporate facility maintenance partner that combines
                six essential building trades, structured scope assessments, and
                coordinated scheduling to help workplaces run smoothly.
              </p>

              {/* Circular Contact / Quick Action Icons */}
              <div className="footer-card__socials" aria-label="Direct contact channels">
                <a
                  href="mailto:support@nestofficeservices.com"
                  className="footer-card__social-btn"
                  aria-label="Email NestOffice Services"
                  title="Email Us"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
                <a
                  href="tel:+919326654908"
                  className="footer-card__social-btn"
                  aria-label="Call NestOffice Services"
                  title="Call Us"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="footer-card__social-btn"
                  onClick={scrollTo("#contact")}
                  aria-label="Go to enquiry form"
                  title="Submit Enquiry"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <nav aria-label="Footer navigation — pages">
              <h3 className="footer-card__heading">Navigation</h3>
              <ul className="footer-card__list">
                {[
                  ["Home", "#home"],
                  ["About Us", "#about"],
                  ["Services", "#services"],
                  ["How It Works", "#how-it-works"],
                  ["Testimonials", "#testimonials"],

                ].map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="footer-card__link"
                      onClick={scrollTo(href)}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 3: Six Service Categories */}
            <nav aria-label="Footer navigation — services">
              <h3 className="footer-card__heading">Services</h3>
              <ul className="footer-card__list">
                {SERVICES.map((svc) => (
                  <li key={svc.id}>
                    <a
                      href="#services"
                      className="footer-card__link"
                      onClick={scrollTo("#services")}
                    >
                      {svc.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 4: Contact & Details */}
            <div className="footer-card__contact">
              <h3 className="footer-card__heading">Contact</h3>
              <ul className="footer-card__list">
                <li>
                  <a href="mailto:support@nestofficeservices.com" className="footer-card__link">
                    support@nestofficeservices.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919326654908" className="footer-card__link">
                    +91 93266 54908
                  </a>
                </li>
                <li>
                  <span className="footer-card__link footer-card__link--static">

                    401, Patel commercial, Above HDFC bank, Opp T series building, New Link Road, Andheri West - Mumbai
                  </span>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="footer-card__link footer-card__link--accent"
                    onClick={scrollTo("#contact")}
                  >
                    Request a Quotation →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="footer-card__bottom">
            <p className="footer-card__copy">
              &copy; {CURRENT_YEAR} NestOffice Services. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
