import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function WhatsAppSupport() {
  const href = buildWhatsAppUrl(
    siteConfig.whatsappNumber,
    siteConfig.whatsappMessage
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Camp2Code on WhatsApp"
      className="fixed bottom-md right-md rounded-full w-16 h-16 flex items-center justify-center z-50 bg-primary text-on-primary shadow-md hover:scale-110 transition-transform duration-300 group"
    >
      <span
        className="material-symbols-outlined text-3xl"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        chat
      </span>
      {/* Tooltip */}
      <div className="absolute right-full mr-4 bg-surface-container-lowest text-on-surface px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-label-mono text-[12px] flex flex-col border border-outline-variant/20">
        <span className="font-bold text-indigo-dark">WhatsApp Support</span>
        <span className="text-on-surface-variant">Message Now</span>
      </div>
    </a>
  );
}
