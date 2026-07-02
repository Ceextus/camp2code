// Build a wa.me deep link. `number` must be digits only (international format).
export function buildWhatsAppUrl(number, message = "") {
  const digits = String(number).replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
