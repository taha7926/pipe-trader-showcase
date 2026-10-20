// Single source of truth for business contact details used across the site.

export const BUSINESS_NAME = "Mufaddal Traders";
export const SINCE_YEAR = 2009;

export const PHONE_DISPLAY = "0335-2906212";
export const PHONE_TEL = "tel:03352906212";

/** International format without "+" — used for wa.me links. */
export const WHATSAPP_NUMBER = "923352906212";

export const EMAIL = "mufaddaltraders553@gmail.com";
export const MAPS_URL = "https://maps.app.goo.gl/fa9XVhYD4XTLCNLA7";
export const ADDRESS = "Gulbahar No. 2, Karachi";
export const HOURS = "Mon–Sat: 9AM–6PM";

/** Build a WhatsApp chat link with an optional pre-filled message. */
export const whatsappLink = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Assalam o Alaikum, I would like a quote for pipes/fittings.";

export const RATE_LIST_MESSAGE =
  "Assalam o Alaikum, please share today's rate list for pipes and fittings.";
