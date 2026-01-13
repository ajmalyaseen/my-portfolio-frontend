/**
 * Central configuration for environment variables.
 * Uses fallback values for local development if .env.local is missing.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dgie5t9uw";

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_EMAIL || "ajmalyaseen706@gmail.com";

export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;
