import mongoose from "mongoose";

export const SERVICE_OPTIONS = [
  "office-search",
  "interior-fitout",
  "civil-interior",
  "electrical",
  "hvac",
  "plumbing",
  "it-networking",
  "office-furniture",
  "hygiene",
  "other",
  // Legacy values
  "cleaning",
  "ac-hvac",
  "civil-carpentry",
  "pest-control",
];

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
      maxlength: [100, "Full name must not exceed 100 characters."],
    },
    companyName: {
      type: String,
      trim: true,
      maxlength: [150, "Company name must not exceed 150 characters."],
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email address is required."],
      trim: true,
      lowercase: true,
      maxlength: [254, "Email must not exceed 254 characters."],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
      maxlength: [20, "Phone number must not exceed 20 characters."],
    },
    service: {
      type: String,
      required: [true, "Please select a service."],
      enum: {
        values: SERVICE_OPTIONS,
        message: "Please select a valid service.",
      },
    },
    message: {
      type: String,
      required: [true, "Message is required."],
      trim: true,
      minlength: [10, "Message must be at least 10 characters."],
      maxlength: [2000, "Message must not exceed 2000 characters."],
    },
    consent: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "closed"],
      default: "new",
    },
    emailStatus: {
      type: String,
      enum: ["sent", "failed", "pending"],
      default: "pending",
    },
    emailError: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "website",
    },
    ipHash: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;

