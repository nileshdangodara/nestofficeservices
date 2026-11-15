import validator from "validator";
import { SERVICE_OPTIONS } from "../models/Enquiry.js";

/**
 * Validates all contact form fields.
 * Returns { valid: boolean, errors: Record<string, string> }
 */
export function validateEnquiry(body) {
  const errors = {};

  // Full name
  const fullName = (body.fullName || "").trim();
  if (!fullName) {
    errors.fullName = "Full name is required.";
  } else if (fullName.length > 100) {
    errors.fullName = "Full name must not exceed 100 characters.";
  }

  // Company name (optional)
  const companyName = (body.companyName || "").trim();
  if (companyName.length > 150) {
    errors.companyName = "Company name must not exceed 150 characters.";
  }

  // Email
  const email = (body.email || "").trim();
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!validator.isEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Phone — allow digits, spaces, +, -, (, )
  const phone = (body.phone || "").trim();
  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!/^[+\d][\d\s\-().]{5,19}$/.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  // Service
  const service = (body.service || "").trim();
  if (!service) {
    errors.service = "Please select a service.";
  } else if (!SERVICE_OPTIONS.includes(service)) {
    errors.service = "Please select a valid service.";
  }

  // Message
  const message = (body.message || "").trim();
  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 2000) {
    errors.message = "Message must not exceed 2000 characters.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitised: { fullName, companyName, email, phone, service, message },
  };
}

