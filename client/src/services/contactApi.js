/**
 * contactApi.js — submit enquiry to the Express backend
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/**
 * @param {Object} formData
 * @returns {Promise<{ success: boolean, message: string, data?: object, errors?: object }>}
 */
export async function submitEnquiry(formData) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const json = await res.json();
  return json;
}

