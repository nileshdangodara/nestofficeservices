import { useState, useEffect, useRef } from "react";
import { submitEnquiry } from "../services/contactApi.js";
import "./ContactForm.css";

const SERVICE_OPTIONS = [
  { value: "", label: "Select a service category…" },
  { value: "office-search", label: "Office Search & Leasing" },
  { value: "interior-fitout", label: "Turnkey Interior Fit-Outs" },
  { value: "civil-interior", label: "Civil & Interior Maintenance" },
  { value: "electrical", label: "Electrical & Power Infrastructure" },
  { value: "hvac", label: "Heating, Ventilation & Air Conditioning (HVAC)" },
  { value: "plumbing", label: "Plumbing & Water Management" },
  { value: "it-networking", label: "IT & Networking Maintenance" },
  { value: "office-furniture", label: "Office Furniture & Workstations" },
  { value: "hygiene", label: "Pest Control & Facility Hygiene" },
  { value: "other", label: "Other Services (Custom / Not Listed Above)" },
];

const INITIAL_FORM = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  consent: false,
  _hp: "",
};

function validate(fields) {
  const errs = {};
  if (!fields.fullName.trim()) errs.fullName = "Full name is required.";
  else if (fields.fullName.trim().length > 100) errs.fullName = "Full name must not exceed 100 characters.";

  if (fields.companyName.trim().length > 150) {
    errs.companyName = "Company name must not exceed 150 characters.";
  }

  if (!fields.email.trim()) errs.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errs.email = "Please enter a valid email address.";

  if (!fields.phone.trim()) errs.phone = "Phone number is required.";
  else if (!/^[+\d][\d\s\-().]{5,19}$/.test(fields.phone.trim())) errs.phone = "Please enter a valid phone number.";

  if (!fields.service) errs.service = "Please select a service.";

  if (!fields.message.trim()) errs.message = "Message is required.";
  else if (fields.message.trim().length < 10) errs.message = "Message must be at least 10 characters.";
  else if (fields.message.trim().length > 2000) errs.message = "Message must not exceed 2000 characters.";

  return errs;
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMsg, setServerMsg] = useState("");
  const submitting = useRef(false);

  useEffect(() => {
    const handler = (e) => {
      setForm((prev) => ({ ...prev, service: e.detail }));
    };
    window.addEventListener("preselectService", handler);
    return () => window.removeEventListener("preselectService", handler);
  }, []);

  const set = (field) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting.current) return;

    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstField = Object.keys(errs)[0];
      document.getElementById(`field-${firstField}`)?.focus();
      return;
    }

    submitting.current = true;
    setStatus("loading");
    setErrors({});

    try {
      const result = await submitEnquiry(form);
      if (result.success) {
        setStatus("success");
        setServerMsg(
          result.message || "Thank you for contacting us. Your enquiry has been submitted successfully."
        );
        setForm(INITIAL_FORM);
      } else {
        setStatus("error");
        setServerMsg(result.message || "Please correct the highlighted fields.");
        if (result.errors) setErrors(result.errors);
      }
    } catch {
      setStatus("error");
      setServerMsg("Unable to reach the server. Please check your connection and try again.");
    } finally {
      submitting.current = false;
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="contact-section section" aria-labelledby="contact-heading">
        <div className="container contact-container">
          <div className="contact-success-card" role="alert" aria-live="polite">
            <div className="contact-success-icon" aria-hidden="true">✓</div>
            <h2 id="contact-heading" className="type-headline">Enquiry Received</h2>
            <p className="type-body-large">{serverMsg}</p>
            <p className="type-body contact-success-sub">
              Our team will review your maintenance requirements and contact you to discuss the next steps.
            </p>
            <button className="btn btn--secondary" onClick={() => setStatus("idle")}>
              Submit Another Enquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact-section section" aria-labelledby="contact-heading">
      <div className="container contact-container">
        {/* Left Information Column */}
        <div className="contact-info">
          <div className="section-eyebrow-wrap">
            <span className="section-eyebrow">Contact Us</span>
          </div>
          <h2 id="contact-heading" className="type-headline contact-title">
            Request a callback or quotation
          </h2>
          <p className="type-body contact-desc">
            Share your contact details and maintenance requirements using the form. Our team will
            review your request and get in touch to discuss scope and scheduling.
          </p>

          <div className="contact-channels">
            <div className="contact-channel-item">
              <span className="contact-channel-label">Email</span>
              <a href="mailto:business@example.com" className="contact-channel-val">
                business@example.com
              </a>
            </div>
            <div className="contact-channel-item">
              <span className="contact-channel-label">Phone</span>
              <a href="tel:+919876543210" className="contact-channel-val">
                +91 98765 43210
              </a>
            </div>
            <div className="contact-channel-item">
              <span className="contact-channel-label">Service Categories</span>
              <span className="contact-channel-val">
                401, Patel Commercial, Above HDFC Bank,
                Opp T Series Building, New Link Road,
                Andheri West, Mumbai
              </span>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <form className="contact-form-card" onSubmit={handleSubmit} noValidate>
          {/* Honeypot */}
          <div className="visually-hidden" aria-hidden="true">
            <label htmlFor="field-hp">Do not fill this field</label>
            <input
              id="field-hp"
              name="_hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form._hp}
              onChange={set("_hp")}
            />
          </div>

          {status === "error" && (
            <div className="contact-error-banner" role="alert">
              {serverMsg}
            </div>
          )}

          <div className="contact-form-row">
            <div className="form-group contact-form-col">
              <label htmlFor="field-fullName" className="form-label">
                Full Name <span className="text-blue">*</span>
              </label>
              <input
                id="field-fullName"
                name="fullName"
                type="text"
                className={`form-input ${errors.fullName ? "form-input--error" : ""}`}
                value={form.fullName}
                onChange={set("fullName")}
                placeholder="Aarav Mehta"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "err-fullName" : undefined}
                disabled={status === "loading"}
              />
              {errors.fullName && (
                <p id="err-fullName" className="form-helper form-helper--error">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="form-group contact-form-col">
              <label htmlFor="field-companyName" className="form-label">Company Name</label>
              <input
                id="field-companyName"
                name="companyName"
                type="text"
                className={`form-input ${errors.companyName ? "form-input--error" : ""}`}
                value={form.companyName}
                onChange={set("companyName")}
                placeholder="Example Pvt. Ltd."
                aria-invalid={Boolean(errors.companyName)}
                aria-describedby={errors.companyName ? "err-companyName" : undefined}
                disabled={status === "loading"}
              />
              {errors.companyName && (
                <p id="err-companyName" className="form-helper form-helper--error">
                  {errors.companyName}
                </p>
              )}
            </div>
          </div>

          <div className="contact-form-row">
            <div className="form-group contact-form-col">
              <label htmlFor="field-email" className="form-label">
                Email Address <span className="text-blue">*</span>
              </label>
              <input
                id="field-email"
                name="email"
                type="email"
                className={`form-input ${errors.email ? "form-input--error" : ""}`}
                value={form.email}
                onChange={set("email")}
                placeholder="aarav@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "err-email" : undefined}
                disabled={status === "loading"}
              />
              {errors.email && (
                <p id="err-email" className="form-helper form-helper--error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-group contact-form-col">
              <label htmlFor="field-phone" className="form-label">
                Phone Number <span className="text-blue">*</span>
              </label>
              <input
                id="field-phone"
                name="phone"
                type="tel"
                className={`form-input ${errors.phone ? "form-input--error" : ""}`}
                value={form.phone}
                onChange={set("phone")}
                placeholder="+91 98765 43210"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "err-phone" : undefined}
                disabled={status === "loading"}
              />
              {errors.phone && (
                <p id="err-phone" className="form-helper form-helper--error">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="field-service" className="form-label">
              Service Required <span className="text-blue">*</span>
            </label>
            <select
              id="field-service"
              name="service"
              className={`form-select ${errors.service ? "form-select--error" : ""}`}
              value={form.service}
              onChange={set("service")}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "err-service" : undefined}
              disabled={status === "loading"}
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.service && (
              <p id="err-service" className="form-helper form-helper--error">
                {errors.service}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="field-message" className="form-label">
              Message / Requirement Details <span className="text-blue">*</span>
            </label>
            <textarea
              id="field-message"
              name="message"
              className={`form-textarea ${errors.message ? "form-textarea--error" : ""}`}
              value={form.message}
              onChange={set("message")}
              placeholder="We need maintenance support for our office..."
              rows={4}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "err-message" : undefined}
              disabled={status === "loading"}
            />
            {errors.message && (
              <p id="err-message" className="form-helper form-helper--error">
                {errors.message}
              </p>
            )}
          </div>

          <div className="form-group contact-consent-group">
            <label className="contact-checkbox-label">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={set("consent")}
                className="contact-checkbox"
                disabled={status === "loading"}
              />
              <span>
                I consent to being contacted regarding this maintenance enquiry.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--lg contact-submit-btn"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting Enquiry..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}
