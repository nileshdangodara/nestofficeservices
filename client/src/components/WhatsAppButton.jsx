import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  // Primary office contact: Mumbai facility desk (+91 98920 25125)
  const rawPhone = "919326654908";
  const displayPhone = "+91 9326654908";
  const callUrl = `tel:+${rawPhone}`;
  const whatsappMsg = encodeURIComponent(
    "Hello NestOffice Services, I would like to inquire about your services."
  );
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${whatsappMsg}`;

  return (
    <aside className="floating-actions-wrap" aria-label="Quick contact actions">
      {/* Quick Phone Call Action */}
      <a
        href={callUrl}
        className="floating-action-btn floating-call-btn"
        aria-label={`Call NestOffice Services at ${displayPhone}`}
      >
        <span className="floating-action-tooltip">Call {displayPhone}</span>
        <svg
          className="floating-action-icon"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>

      {/* Quick WhatsApp Action */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-action-btn floating-whatsapp-btn"
        aria-label="Chat with NestOffice Services on WhatsApp"
      >
        <span className="floating-action-tooltip">Chat on WhatsApp</span>
        <svg
          className="floating-action-icon floating-action-icon--wa"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.01 2.01C8.28 2.01 2 8.29 2 16.02c0 2.68.75 5.27 2.18 7.52L2 30l6.67-2.14c2.18 1.34 4.69 2.05 7.34 2.05 7.73 0 14.01-6.28 14.01-14.01 0-3.75-1.46-7.27-4.11-9.91-2.65-2.65-6.16-2.98-9.9-2.98zm0 25.64c-2.34 0-4.63-.63-6.63-1.83l-.47-.28-4.42 1.42 1.44-4.3-.31-.49c-1.33-2.1-2.03-4.54-2.03-7.05 0-6.42 5.22-11.64 11.64-11.64 3.11 0 6.03 1.21 8.23 3.41 2.2 2.2 3.41 5.12 3.41 8.23 0 6.42-5.22 11.46-11.64 11.46zm6.39-8.73c-.35-.18-2.07-1.02-2.39-1.14-.32-.12-.55-.18-.78.18-.23.35-.9 1.14-1.1 1.37-.2.23-.41.26-.76.09-.35-.18-1.48-.55-2.82-1.74-1.04-.93-1.75-2.08-1.95-2.43-.2-.35-.02-.54.15-.71.16-.16.35-.41.53-.61.18-.2.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.18-.78-1.89-1.07-2.58-.28-.68-.57-.59-.78-.6-.2-.01-.44-.01-.67-.01-.23 0-.61.09-.93.44-.32.35-1.22 1.2-1.22 2.92 0 1.72 1.25 3.38 1.43 3.61.18.23 2.47 3.77 5.98 5.29.83.36 1.48.58 1.99.74.84.27 1.61.23 2.21.14.68-.1 2.07-.85 2.36-1.67.29-.82.29-1.52.2-1.67-.08-.14-.31-.23-.66-.41z" />
        </svg>
      </a>
    </aside>
  );
}
