import nodemailer from "nodemailer";

/**
 * Escape HTML special characters for safe email rendering.
 */
function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const SERVICE_LABELS = {
  "office-search": "Office Search & Leasing",
  "interior-fitout": "Turnkey Interior Fit-Outs",
  "civil-interior": "Civil & Interior Maintenance",
  electrical: "Electrical & Power Infrastructure",
  hvac: "Heating, Ventilation & Air Conditioning (HVAC)",
  plumbing: "Plumbing & Water Management",
  "it-networking": "IT & Networking Maintenance",
  "office-furniture": "Office Furniture & Workstations",
  hygiene: "Pest Control & Facility Hygiene",
  other: "Other Services (Custom / Not Listed Above)",
  // Legacy
  cleaning: "Cleaning Services",
  "ac-hvac": "AC & HVAC Services",
  "civil-carpentry": "Civil & Carpentry Services",
  "pest-control": "Pest Control",
};

export async function sendEnquiryEmail(enquiry) {
  const transporter = buildTransporter();

  const serviceLabel = SERVICE_LABELS[enquiry.service] || enquiry.service;
  const submittedAt = new Date(enquiry.createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "short",
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; background: #fafafa; color: #09090b; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 32px auto; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; }
    .header { background: #09090b; padding: 24px 32px; border-bottom: 1px solid #27272a; }
    .header h1 { color: #ffffff; margin: 0; font-size: 18px; font-weight: 600; }
    .header span { color: #E85122; }
    .body { padding: 32px; }
    .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; margin-bottom: 4px; }
    .value { font-size: 15px; color: #09090b; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #e4e4e7; }
    .value:last-child { border-bottom: none; }
    .badge { display: inline-block; background: #fff3ef; color: #E85122; border: 1px solid #fbd0c2; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; }
    .footer { background: #fafafa; padding: 16px 32px; font-size: 12px; color: #71717a; border-top: 1px solid #e4e4e7; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>NestOffice <span>Services</span> — New Website Enquiry</h1>
    </div>
    <div class="body">
      <div class="label">Full Name</div>
      <div class="value">${esc(enquiry.fullName)}</div>

      ${
        enquiry.companyName
          ? `<div class="label">Company</div>
      <div class="value">${esc(enquiry.companyName)}</div>`
          : ""
      }

      <div class="label">Email</div>
      <div class="value">${esc(enquiry.email)}</div>

      <div class="label">Phone</div>
      <div class="value">${esc(enquiry.phone)}</div>

      <div class="label">Service Required</div>
      <div class="value"><span class="badge">${esc(serviceLabel)}</span></div>

      <div class="label">Message / Requirements</div>
      <div class="value" style="white-space: pre-wrap;">${esc(enquiry.message)}</div>

      <div class="label">Submitted At</div>
      <div class="value">${esc(submittedAt)}</div>

      <div class="label">Enquiry ID</div>
      <div class="value" style="font-size:12px; color:#71717a;">${esc(String(enquiry._id))}</div>
    </div>
    <div class="footer">
      Automated enquiry notification from NestOffice Services website.
      Reply directly to <a href="mailto:${esc(enquiry.email)}" style="color:#E85122;">${esc(enquiry.email)}</a>.
    </div>
  </div>
</body>
</html>`;

  await transporter.sendMail({
    from: `"NestOffice Services" <${process.env.MAIL_FROM}>`,
    to: process.env.MAIL_TO,
    replyTo: enquiry.email,
    subject: `Website Enquiry: ${serviceLabel} — ${enquiry.fullName}`,
    html,
  });
}
