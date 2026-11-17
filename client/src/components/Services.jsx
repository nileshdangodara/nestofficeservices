import { useState, useEffect, useId, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "./servicesData.js";
import "./Services.css";

const ICONS = {
  "office-search": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  "interior-fitout": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  "civil-interior": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  "mep-it": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  "electrical": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  "Electrical": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  "hvac": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a4 4 0 0 1 4 4c0 3-4 6-4 6s-4-3-4-6a4 4 0 0 1 4-4z" />
      <path d="M22 12a4 4 0 0 1-4 4c-3 0-6-4-6-4s3-4 6-4a4 4 0 0 1 4 4z" />
      <path d="M12 22a4 4 0 0 1-4-4c0-3 4-6 4-6s4 3 4 6a4 4 0 0 1-4 4z" />
      <path d="M2 12a4 4 0 0 1 4-4c3 0 6 4 6 4s-3 4-6 4a4 4 0 0 1-4-4z" />
    </svg>
  ),
  "HVAC": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a4 4 0 0 1 4 4c0 3-4 6-4 6s-4-3-4-6a4 4 0 0 1 4-4z" />
      <path d="M22 12a4 4 0 0 1-4 4c-3 0-6-4-6-4s3-4 6-4a4 4 0 0 1 4 4z" />
      <path d="M12 22a4 4 0 0 1-4-4c0-3 4-6 4-6s4 3 4 6a4 4 0 0 1-4 4z" />
      <path d="M2 12a4 4 0 0 1 4-4c3 0 6 4 6 4s-3 4-6 4a4 4 0 0 1-4-4z" />
    </svg>
  ),
  "plumbing": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  "it-networking": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  "IT & Networking": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  "office-furniture": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
      <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
      <path d="M5 18v2" />
      <path d="M19 18v2" />
    </svg>
  ),
  "Office Furniture": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
      <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
      <path d="M5 18v2" />
      <path d="M19 18v2" />
    </svg>
  ),
  "hygiene": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  "Hygiene": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  "pest-hygiene": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
};

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 290,
  damping: 28,
  mass: 0.9,
};

// Triple array for seamless infinite bidirectional looping: [cloneBefore, middleOriginal, cloneAfter]
const TOTAL = SERVICES.length;
const LOOP_ITEMS = [
  ...SERVICES.map((s, i) => ({ ...s, _loopKey: `pre-${s.id}`, _origIdx: i, _setIdx: 0 })),
  ...SERVICES.map((s, i) => ({ ...s, _loopKey: `mid-${s.id}`, _origIdx: i, _setIdx: 1 })),
  ...SERVICES.map((s, i) => ({ ...s, _loopKey: `post-${s.id}`, _origIdx: i, _setIdx: 2 })),
];

export default function Services() {
  // activeSelection holds { svc, loopKey } so Framer Motion layoutId matches the exact clicked card instance
  const [activeSelection, setActiveSelection] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const trackRef = useRef(null);
  const isJumpingRef = useRef(false);
  const uid = useId();

  const activeService = activeSelection?.svc || null;
  const activeLoopKey = activeSelection?.loopKey || null;

  // Measure single card step width (card width + 24px gap)
  const getStepWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 360;
    const cardEl = el.querySelector(".modal-card");
    return cardEl ? cardEl.offsetWidth + 24 : 360;
  }, []);

  // Position scroll at the start of the middle (original) set on mount & resize
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const initPosition = () => {
      const step = getStepWidth();
      el.scrollLeft = TOTAL * step;
    };
    initPosition();
    window.addEventListener("resize", initPosition);
    return () => window.removeEventListener("resize", initPosition);
  }, [getStepWidth]);

  // Lock body scroll & Escape listener when a modal card is open
  useEffect(() => {
    if (!activeService) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveSelection(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeService]);

  // Handle infinite loop wrap-around & active dot calculation
  const handleTrackScroll = () => {
    const el = trackRef.current;
    if (!el || isJumpingRef.current) return;

    const step = getStepWidth();
    const singleSetWidth = TOTAL * step;
    const rawIndex = Math.round(el.scrollLeft / step);
    const normalizedIdx = ((rawIndex % TOTAL) + TOTAL) % TOTAL;
    setCurrentIdx(normalizedIdx);

    // If scrolled into the first clone set or third clone set, silently jump back to middle set
    if (el.scrollLeft <= step * 0.5) {
      isJumpingRef.current = true;
      el.style.scrollBehavior = "auto";
      el.scrollLeft += singleSetWidth;
      requestAnimationFrame(() => {
        el.style.scrollBehavior = "";
        isJumpingRef.current = false;
      });
    } else if (el.scrollLeft >= singleSetWidth * 2 - step * 0.5) {
      isJumpingRef.current = true;
      el.style.scrollBehavior = "auto";
      el.scrollLeft -= singleSetWidth;
      requestAnimationFrame(() => {
        el.style.scrollBehavior = "";
        isJumpingRef.current = false;
      });
    }
  };

  // Scroll forward or backward by 1 card (infinite)
  const scrollBySlide = useCallback(
    (dir) => {
      const el = trackRef.current;
      if (!el) return;
      const step = getStepWidth();
      el.scrollBy({ left: dir * step, behavior: "smooth" });
    },
    [getStepWidth]
  );

  // Jump smoothly to a specific slide in the middle set
  const scrollToSlide = (targetIdx) => {
    const el = trackRef.current;
    if (!el) return;
    const step = getStepWidth();
    el.scrollTo({ left: (TOTAL + targetIdx) * step, behavior: "smooth" });
  };

  // Auto-scroll every 3 seconds when not hovering and no modal card is opened
  useEffect(() => {
    if (isHovered || activeService) return;
    const timer = setInterval(() => {
      scrollBySlide(1);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, activeService, scrollBySlide]);

  const handleEnquire = (serviceId) => {
    setActiveSelection(null);
    const target = document.querySelector("#contact");
    if (target) {
      const headerH = document.querySelector(".header")?.offsetHeight || 72;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - headerH,
        behavior: "smooth",
      });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("preselectService", { detail: serviceId }));
      }, 300);
    }
  };

  return (
    <section
      id="services"
      className="services-section section"
      aria-labelledby="services-title"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container">
        {/* Section Header + Carousel Arrow Controls */}
        <div className="services-header-row">
          <div>
            <div className="section-eyebrow-wrap">
              <span className="section-eyebrow">Customize Solutions</span>
            </div>
            <h2 id="services-title" className="type-headline services-title">
              End-to-End Workspace Solutions
            </h2>
            <p className="type-body section-sub">
              From discovering prime office locations to bespoke fit-outs, corporate move-in, and ongoing facility management — explore our complete Customise services.
            </p>
          </div>

          <div className="services-header-controls">
            <div className="services-carousel-nav" role="group" aria-label="Services carousel controls">
              <button
                type="button"
                className="services-carousel-btn"
                onClick={() => scrollBySlide(-1)}
                aria-label="Previous service"
              >
                ←
              </button>
              <button
                type="button"
                className="services-carousel-btn"
                onClick={() => scrollBySlide(1)}
                aria-label="Next service"
              >
                →
              </button>
            </div>

            <a
              href="#contact"
              className="services-header-link"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Request a quotation →
            </a>
          </div>
        </div>

        {/* Infinite Carousel Viewport & Track */}
        <div className="services-carousel-viewport">
          <div
            ref={trackRef}
            className="services-carousel-track"
            onScroll={handleTrackScroll}
            role="region"
            aria-label="Service categories infinite carousel"
            tabIndex={0}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                scrollBySlide(-1);
              } else if (e.key === "ArrowRight") {
                e.preventDefault();
                scrollBySlide(1);
              }
            }}
          >
            {LOOP_ITEMS.map((svc) => (
              <motion.article
                key={svc._loopKey}
                layoutId={`modal-card-${svc._loopKey}-${uid}`}
                transition={SPRING_TRANSITION}
                className="modal-card"
                onClick={() => setActiveSelection({ svc, loopKey: svc._loopKey })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveSelection({ svc, loopKey: svc._loopKey });
                  }
                }}
                tabIndex={svc._setIdx === 1 ? 0 : -1}
                aria-label={`${svc.name} — Click to view full service details`}
              >
                {/* Card Media Preview */}
                <motion.div
                  layoutId={`modal-image-wrap-${svc._loopKey}-${uid}`}
                  transition={SPRING_TRANSITION}
                  className="modal-card__media"
                >
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="modal-card__img"
                    loading="lazy"
                  />
                  <div className="modal-card__media-overlay" aria-hidden="true" />

                  <span className="modal-card__num-pill">{svc.num}</span>

                  <span className="modal-card__expand-btn" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </span>
                </motion.div>

                {/* Card Content */}
                <div className="modal-card__body">
                  <motion.div
                    layoutId={`modal-tag-${svc._loopKey}-${uid}`}
                    transition={SPRING_TRANSITION}
                    className="modal-card__tag-row"
                  >
                    <span className="modal-card__icon" aria-hidden="true">
                      {ICONS[svc.id] || ICONS["office-search"]}
                    </span>
                    <span className="modal-card__tag">{svc.tag}</span>
                  </motion.div>

                  <motion.h3
                    layoutId={`modal-title-${svc._loopKey}-${uid}`}
                    transition={SPRING_TRANSITION}
                    className="modal-card__title"
                  >
                    {svc.name}
                  </motion.h3>

                  <p className="modal-card__excerpt">{svc.description}</p>

                  <div className="modal-card__footer">
                    <span className="modal-card__feature-chip">
                      {svc.features[0]}
                    </span>
                    <span className="modal-card__action-text">
                      View details ↗
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Carousel Pagination Dots & Progress Indicator */}
          <div className="services-carousel-footer">
            <div className="services-carousel-dots" role="tablist" aria-label="Select service slide">
              {SERVICES.map((svc, idx) => (
                <button
                  key={svc.id}
                  type="button"
                  role="tab"
                  aria-selected={currentIdx === idx}
                  aria-label={`Slide ${idx + 1}: ${svc.name}`}
                  className={`services-carousel-dot ${currentIdx === idx ? "services-carousel-dot--active" : ""
                    }`}
                  onClick={() => scrollToSlide(idx)}
                />
              ))}
            </div>

            <span className="services-carousel-counter" aria-live="polite">
              0{currentIdx + 1} / 0{SERVICES.length}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Modal Overlay & Shared-Layout Card */}
      <AnimatePresence>
        {activeService && activeLoopKey && (
          <div
            className="modal-card-portal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`expanded-title-${activeService.id}`}
          >
            {/* Backdrop */}
            <motion.div
              className="modal-card-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setActiveSelection(null)}
            />

            {/* Expanded Card */}
            <div className="modal-card-stage" onClick={() => setActiveSelection(null)}>
              <motion.div
                layoutId={`modal-card-${activeLoopKey}-${uid}`}
                transition={SPRING_TRANSITION}
                className="modal-card-expanded"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Static Close Button (pinned to top-right of modal card) */}
                <button
                  type="button"
                  className="modal-card-expanded__close"
                  onClick={() => setActiveSelection(null)}
                  aria-label="Close service modal"
                >
                  ✕
                </button>

                <div className="modal-card-expanded__scroll">
                  {/* Expanded Hero Image */}
                  <motion.div
                    layoutId={`modal-image-wrap-${activeLoopKey}-${uid}`}
                    transition={SPRING_TRANSITION}
                    className="modal-card-expanded__media"
                  >
                    <img
                      src={activeService.image}
                      alt={activeService.name}
                      className="modal-card-expanded__img"
                    />
                    <div className="modal-card-expanded__media-gradient" aria-hidden="true" />
                    <span className="modal-card__num-pill modal-card__num-pill--lg">
                      {activeService.num}
                    </span>
                  </motion.div>

                  {/* Expanded Body */}
                  <div className="modal-card-expanded__body">
                    <motion.div
                      layoutId={`modal-tag-${activeLoopKey}-${uid}`}
                      transition={SPRING_TRANSITION}
                      className="modal-card__tag-row"
                    >
                      <span className="modal-card__icon" aria-hidden="true">
                        {ICONS[activeService.id] || ICONS["office-search"]}
                      </span>
                      <span className="modal-card__tag">{activeService.tag}</span>
                    </motion.div>

                    <motion.h3
                      id={`expanded-title-${activeService.id}`}
                      layoutId={`modal-title-${activeLoopKey}-${uid}`}
                      transition={SPRING_TRANSITION}
                      className="modal-card-expanded__title"
                    >
                      {activeService.name}
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ delay: 0.08, duration: 0.22 }}
                      className="modal-card-expanded__details"
                    >
                      <p className="modal-card-expanded__desc">
                        {activeService.description}
                      </p>

                      <div className="modal-card-expanded__features-box">
                        <span className="modal-card-expanded__features-label">
                          Included Scope &amp; Capabilities
                        </span>
                        <ul className="modal-card-expanded__features-list">
                          {activeService.features.map((feat) => (
                            <li key={feat} className="modal-card-expanded__feature-item">
                              <span className="modal-card-expanded__check" aria-hidden="true">
                                ✓
                              </span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="modal-card-expanded__actions">
                        <button
                          type="button"
                          className="modal-card-expanded__cta"
                          onClick={() => handleEnquire(activeService.id)}
                        >
                          <span className="modal-card-expanded__cta-pill">
                            Enquire About {activeService.name}
                          </span>
                          <span className="modal-card-expanded__cta-bridge" aria-hidden="true" />
                          <span className="modal-card-expanded__cta-circle" aria-hidden="true">
                            ↗
                          </span>
                        </button>

                        <button
                          type="button"
                          className="btn btn--secondary"
                          onClick={() => setActiveSelection(null)}
                        >
                          Close Preview
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
