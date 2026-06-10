export function generateWhatsAppOrderUrl(
  productName: string,
  phoneNumber?: string
): string {
  const phone = phoneNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const message = encodeURIComponent(
    `Hello ScienceMines,\nI want to order:\n${productName}`
  );
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${message}`;
}

export function generateWhatsAppContactUrl(message?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const text = encodeURIComponent(
    message || "Hello ScienceMines, I would like to get in touch."
  );
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${text}`;
}
