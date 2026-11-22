import { useState, useEffect } from "react";
import "./Header.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerH = document.querySelector(".header")?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`header morph-nav ${scrolled ? "morph-nav--scrolled" : ""}`}
      role="banner"
    >
      <div className="morph-nav__shell">
        <div className="morph-nav__pill">
          {/* Brand Logo */}
          <a
            href="#home"
            className="morph-nav__logo"
            onClick={(e) => handleNavClick(e, "#home")}
            aria-label="NestOffice — Home"
          >
            <img
              src="/logo.webp"
              alt="NestOffice"
              className="morph-nav__logo-img"
              width="28"
              height="28"
            />
            <span className="morph-nav__logo-title">Nest Office Services</span>
          </a>

          {/* Center Navigation Links */}
          <nav className="morph-nav__nav" aria-label="Main navigation">
            <ul className="morph-nav__list" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="morph-nav__link"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action Button: Iridescent Gradient Pill */}
          <div className="morph-nav__actions">
            <a
              href="#contact"
              className="morph-nav__cta"
              onClick={(e) => handleNavClick(e, "#contact")}
            >
              <span className="morph-nav__cta-inner">Get a Quote</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={`morph-nav__hamburger ${menuOpen ? "morph-nav__hamburger--open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <nav
          className={`morph-nav__mobile-drawer ${menuOpen ? "morph-nav__mobile-drawer--open" : ""}`}
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          <ul className="morph-nav__mobile-list" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="morph-nav__mobile-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="morph-nav__mobile-cta-wrap">
              <a
                href="#contact"
                className="morph-nav__cta morph-nav__mobile-cta"
                onClick={(e) => handleNavClick(e, "#contact")}
              >
                <span className="morph-nav__cta-inner">Get a Quote</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
