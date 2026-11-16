import { useState } from "react";
import "./HowItWorks.css";

const STEPS = [
  {
    step: "01",
    title: "Submit an Enquiry",
    desc: "Share your workplace details and maintenance needs through our online enquiry form or direct call desk.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Site Inspection",
    desc: "Our experienced facility engineers visit your premises to assess scope, equipment status, and maintenance priorities.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Custom Quotation",
    desc: "Receive an itemized, transparent quotation with customized SLAs, scheduled milestones, and competitive corporate rates.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="8" y1="9" x2="16" y2="9" />
        <line x1="8" y1="13" x2="14" y2="13" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Scheduled Execution",
    desc: "Our certified technicians execute HVAC, MEP, cleaning, or carpentry work smoothly around your operational hours.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    step: "05",
    title: "Completion & Handover",
    desc: "Work sign-off is verified on-site with your facility manager, backed by ongoing quality audits and feedback.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  // Default Step 02 active on desktop to match showcase layout
  const [activeIdx, setActiveIdx] = useState(1);

  const handleCardInteraction = (idx) => {
    // Disable hover/click active switching on tablet and mobile (<= 980px)
    if (typeof window !== "undefined" && window.innerWidth <= 980) return;
    setActiveIdx(idx);
  };

  return (
    <section id="how-it-works" className="hiw-section section" aria-labelledby="hiw-title">
      <div className="container">
        {/* Centered Header with Corner-Bracket Eyebrow */}
        <div className="hiw-header">
          <div className="hiw-eyebrow-wrap">
            <span className="hiw-eyebrow">How It Works</span>
          </div>

          <h2 id="hiw-title" className="hiw-heading">
            From Location Search to Move-In — Simplified
          </h2>

          <p className="hiw-subtitle">
            Our end-to-end process guides you from commercial property discovery and turnkey interior fit-outs to moving in and calling your workspace your own.
          </p>
        </div>

        {/* Interactive 5-Card Showcase Row */}
        <div className="hiw-showcase-grid" role="list">
          {STEPS.map((item, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={item.step}
                role="listitem"
                tabIndex={0}
                className={`hiw-step-card ${isActive ? "hiw-step-card--active" : ""}`}
                onMouseEnter={() => handleCardInteraction(idx)}
                onFocus={() => handleCardInteraction(idx)}
                onClick={() => handleCardInteraction(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardInteraction(idx);
                  }
                }}
              >
                {/* Top Zone: Image is always visible on all cards (grayed out when inactive, full color on active/hover) */}
                <div className="hiw-step-card__top">
                  <div className="hiw-step-card__media">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="hiw-step-card__img"
                      loading="lazy"
                    />
                    <div className="hiw-step-card__img-fade" aria-hidden="true" />
                    <span className="hiw-step-card__step-badge" aria-hidden="true">
                      {item.step}
                    </span>
                  </div>
                </div>

                {/* Bottom Zone: Icon Box, Title, and Smoothly Expanding Description */}
                <div className="hiw-step-card__body">
                  <div className="hiw-step-card__icon-box" aria-hidden="true">
                    {item.icon}
                  </div>

                  <h3 className="hiw-step-card__title">{item.title}</h3>

                  <div className="hiw-step-card__desc-wrap">
                    <div className="hiw-step-card__desc-inner">
                      <p className="hiw-step-card__desc">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
