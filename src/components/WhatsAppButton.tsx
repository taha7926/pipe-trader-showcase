import { MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/config/contact";

/** Floating WhatsApp chat button, shown on every public page. */
export const WhatsAppButton = () => (
  <a
    href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white font-semibold shadow-lg hover:bg-[#1ebe5a] hover:shadow-xl transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
  >
    <MessageCircle className="h-6 w-6" aria-hidden="true" />
    <span className="hidden sm:inline">WhatsApp</span>
  </a>
);
