import "./WhyChooseUs.css";

const REASONS = [
  {
    title: "Multiple Services Through One Provider",
    desc: "Access cleaning, electrical, plumbing, AC & HVAC, civil & carpentry, and pest control through a single maintenance partner.",
    tag: "Consolidated",
  },
  {
    title: "Coordinated Service Support",
    desc: "Streamline scheduling and follow-ups across multiple maintenance categories without juggling disconnected vendors.",
    tag: "Coordination",
  },
  {
    title: "Focus on Quality & Workmanship",
    desc: "Careful attention to detail across both routine preventive maintenance and targeted workplace repair tasks.",
    tag: "Workmanship",
  },
  {
    title: "Professional Communication",
    desc: "Clear updates from initial enquiry and scope assessment through to scheduled service execution and completion.",
    tag: "Communication",
  },
  {
    title: "Tailored Maintenance Requirements",
    desc: "Service scopes and schedules adapted to suit your office layout, operational hours, and specific facility priorities.",
    tag: "Custom Scope",
  },
  {
    title: "Built for Corporate Workplaces",
    desc: "Practical maintenance coverage aligned with the day-to-day operational needs of corporate offices and commercial properties.",
    tag: "Workplace Fit",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="why-section section" aria-labelledby="why-title">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow-wrap">
            <span className="section-eyebrow">Why Choose Us</span>
          </div>
          <h2 id="why-title" className="type-headline">
            A practical partner for workplace upkeep
          </h2>
          <p className="type-body section-sub">
            Key service differentiators designed to make facility maintenance straightforward and dependable.
          </p>
        </div>

        <div className="why-grid" role="list">
          {REASONS.map((r) => (
            <div key={r.title} className="why-card" role="listitem">
              <span className="why-tag">{r.tag}</span>
              <h3 className="type-subhead why-card-title">{r.title}</h3>
              <p className="type-body-small why-card-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
