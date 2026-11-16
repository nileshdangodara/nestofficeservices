import "./Testimonials.css";

const ALL_TESTIMONIALS = [
  {
    id: "t1",
    name: "Surabaya",
    role: "Head of Workplace & Real Estate",
    company: "FinTech Scale-up, Bandra",
    avatar: "SU",
    badge: "Full Turnkey Setup",
    rating: 5,
    quote:
      "We were looking for the right office location and NestOffice Services made the search much more efficient. They understood our budget, requirements and timeline perfectly.",
  },
  {
    id: "t2",
    name: "Ankit Jain",
    role: "Chief Operating Officer",
    company: "Digital Media Group, Andheri",
    avatar: "AJ",
    badge: "Search to Move-In",
    rating: 5,
    quote:
      "What stood out was their understanding of the market and our specific requirments. NestOffice Services made finding the right property much easier than we expeted.",
  },
  {
    id: "t3",
    name: "Ayesha Mehta",
    role: "Managing Director",
    company: "Global Advisory Partners, BKC",
    avatar: "VM",
    badge: "Turnkey & Facility Care",
    rating: 5,
    quote:
      "From property options to negotiations, the team handled everything with great attention to detail. we found a space that works perfecty for our business.",
  },
  {
    id: "t4",
    name: "Pooja Agarwal",
    role: "VP People & Culture",
    company: "Apex Tech Labs, Powai",
    avatar: "PA",
    badge: "Interior Architecture",
    rating: 5,
    quote:
      "Our workspace feels completely transformed. NestOffice Service managed to balance aesthetics, functionality and our brand identity really well.",
  },
  {
    id: "t5",
    name: "Kunal Verma",
    role: "Founder & CEO",
    company: "Velocity Ventures, Lower Parel",
    avatar: "KV",
    badge: "Commercial Leasing",
    rating: 5,
    quote:
      "Finding commercial space in Mumbai with clear zoning and favorable lease terms used to be a nightmare. NestOffice's property discovery team closed our lease in under 3 weeks.",
  },
  {
    id: "t6",
    name: "Sneha Kulkarni",
    role: "Director of Infrastructure",
    company: "CloudScale Systems, Navi Mumbai",
    avatar: "SK",
    badge: "MEP, HVAC & IT Setup",
    rating: 5,
    quote:
      "Their engineering team handled our entire server room setup, structured cabling, biometric security, and precision air-conditioning with zero hiccups on day one.",
  },
  {
    id: "t7",
    name: "Rajesh Nair",
    role: "Head of Administration",
    company: "Sterling Logistics, Nariman Point",
    avatar: "RN",
    badge: "Zero-Downtime Move-In",
    rating: 5,
    quote:
      "Relocating 200 workstations and fragile server racks without disrupting our operational hours felt impossible until NestOffice took charge. Completely stress-free handover.",
  },
  {
    id: "t8",
    name: "Ananya Sen",
    role: "Facility Operations Lead",
    company: "BluePeak Capital, Worli",
    avatar: "AS",
    badge: "24/7 Facility Care",
    rating: 5,
    quote:
      "The ongoing facility care is world-class. From preventative electrical maintenance to daily corporate housekeeping and HVAC servicing, everything is handled proactively.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="testimonials-flow-section section"
      aria-labelledby="testimonials-flow-title"
    >
      <div className="container">
        {/* Section Header */}
        <div className="testimonials-flow-header">
          <div className="section-eyebrow-wrap">
            <span className="section-eyebrow">Client Success Stories</span>
          </div>
          <h2 id="testimonials-flow-title" className="testimonials-flow-heading">
            Trusted by Businesses Making Their Office Their Own
          </h2>
          <p className="testimonials-flow-sub">
            Real stories from corporate leaders who transformed empty commercial properties into thriving, move-in-ready headquarters with NestOffice.
          </p>
        </div>
      </div>

      {/* Infinite Flow Marquee (Single Continuous Row) */}
      <div className="testimonials-flow-container" aria-label="Client testimonials flow">
        {/* Left & Right Gradient Fade Edges */}
        <div className="testimonials-flow-fade testimonials-flow-fade--left" aria-hidden="true" />
        <div className="testimonials-flow-fade testimonials-flow-fade--right" aria-hidden="true" />

        {/* Single Flowing Row */}
        <div className="testimonials-flow-row" aria-hidden="false">
          <div className="testimonials-flow-track">
            {[...ALL_TESTIMONIALS, ...ALL_TESTIMONIALS].map((t, idx) => (
              <article key={`t-${t.id}-${idx}`} className="testimonial-flow-card">
                <div className="testimonial-flow-card__author">
                  <div className="testimonial-flow-card__avatar" aria-hidden="true">
                    {t.avatar}
                  </div>
                  <div className="testimonial-flow-card__meta">
                    <h3 className="testimonial-flow-card__name">{t.name}</h3>

                  </div>
                </div>

                <div className="testimonial-flow-card__stars" aria-label={`${t.rating} out of 5 stars`}>
                  {"★".repeat(t.rating)}
                </div>

                <p className="testimonial-flow-card__quote">&ldquo;{t.quote}&rdquo;</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
