import Enquiry from "../models/Enquiry.js";
import { validateEnquiry } from "../utils/validation.js";
import { sendEnquiryEmail } from "../services/emailService.js";
import crypto from "crypto";

/**
 * POST /api/contact
 * Submit a new enquiry.
 */
export async function submitEnquiry(req, res, next) {
  try {
    // Honeypot: reject if the hidden field is populated
    if (req.body._hp) {
      // Silently accept but discard
      return res.status(201).json({
        success: true,
        message: "Your enquiry has been received successfully.",
        data: { id: "honeypot", emailStatus: "sent" },
      });
    }

    const { valid, errors, sanitised } = validateEnquiry(req.body);

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Please correct the highlighted fields.",
        errors,
      });
    }

    // Optional: hash the IP for abuse correlation
    const rawIp =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "";
    const ipHash = rawIp
      ? crypto.createHash("sha256").update(rawIp).digest("hex")
      : "";

    const consent = req.body.consent === true || req.body.consent === "true";

    // Persist the enquiry
    const enquiry = await Enquiry.create({
      ...sanitised,
      consent,
      ipHash,
      emailStatus: "pending",
    });

    // Attempt email notification — failure must not discard the saved enquiry
    let emailStatus = "sent";
    try {
      await sendEnquiryEmail(enquiry);
    } catch (mailErr) {
      emailStatus = "failed";
      // Log sanitised error — never expose credentials
      const safeError = mailErr?.message
        ? mailErr.message.replace(/(pass|secret|token|key)=\S+/gi, "[redacted]")
        : "Unknown mail error";
      console.error(`[email] Delivery failed for enquiry ${enquiry._id}: ${safeError}`);
      await Enquiry.findByIdAndUpdate(enquiry._id, {
        emailStatus: "failed",
        emailError: safeError.slice(0, 300),
      });
    }

    if (emailStatus === "sent") {
      await Enquiry.findByIdAndUpdate(enquiry._id, { emailStatus: "sent" });
    }

    const responseMessage =
      emailStatus === "sent"
        ? "Your enquiry has been received successfully."
        : "Your enquiry has been received. Our team will review it shortly.";

    return res.status(201).json({
      success: true,
      message: responseMessage,
      data: { id: enquiry._id, emailStatus },
    });
  } catch (err) {
    next(err);
  }
}

