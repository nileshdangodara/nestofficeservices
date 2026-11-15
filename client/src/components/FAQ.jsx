import { useState } from "react";
import "./FAQ.css";

const FAQS = [
  {
    q: "What types of properties do you serve?",
    a: "We focus on corporate offices and commercial workspaces. Please submit an enquiry with your property details so our team can confirm coverage for your location and facility type.",
  },
  {
    q: "Which maintenance services are available?",
    a: "We offer six service categories: Cleaning Services, Electrical Services, Plumbing Services, AC & HVAC Services, Civil & Carpentry Services (including all types of furniture and fixture work), and Pest Control.",
  },
  {
    q: "How does the quotation process work?",
    a: "Once you submit an enquiry through our contact form, our team reviews your requirements, contacts you for a requirement discussion, and arranges a site assessment where applicable before sharing a quotation.",
  },
  {
    q: "How is maintenance work scheduled?",
    a: "After you review and approve the scope and quotation, we coordinate with your facility representative to schedule the service at an agreed time that suits your workplace operations.",
  },
  {
    q: "Can we request multiple maintenance services together?",
    a: "Yes. You can select the primary service category in the contact form and describe any additional maintenance needs in the message field so we can coordinate them together.",
  },
  {
    q: "How are payment terms and ongoing maintenance support arranged?",
    a: "Payment terms and ongoing maintenance arrangements depend on the specific scope of work required. These details are discussed and confirmed directly during the quotation stage.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className="faq-section section" aria-labelledby="faq-heading">
      <div className="container faq-container">
        <div className="faq-header">
          <div className="section-eyebrow-wrap">
            <span className="section-eyebrow">FAQs</span>
          </div>
          <h2 id="faq-heading" className="type-headline faq-title">
            Frequently asked questions
          </h2>
          <p className="type-body faq-sub">
            Common pre-enquiry questions regarding service categories, quotations, and scheduling.
          </p>
        </div>

        <dl className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = openIdx === i;
            const id = `faq-answer-${i}`;
            return (
              <div key={item.q} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
                <dt>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    id={`faq-btn-${i}`}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </dt>
                <dd
                  id={id}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  hidden={!isOpen}
                >
                  <p className="type-body">{item.a}</p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
