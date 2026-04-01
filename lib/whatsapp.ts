const WHATSAPP_API_URL = `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

export async function sendWhatsAppMessage(text: string): Promise<void> {
  const to = process.env.WHATSAPP_TO_NUMBER;
  if (!to) throw new Error("WHATSAPP_TO_NUMBER not set");

  const res = await fetch(WHATSAPP_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`WhatsApp send failed: ${JSON.stringify(err)}`);
  }
}

export function buildReviewMessage(title: string, excerpt: string, slug: string): string {
  return (
    `📝 *New draft ready for review*\n\n` +
    `*${title}*\n\n` +
    `${excerpt}\n\n` +
    `🔗 Preview: https://talhahsn.vercel.app/blog/${slug}\n\n` +
    `Reply with:\n` +
    `• *publish* — go live now\n` +
    `• *discard* — delete this draft\n` +
    `• Anything else — I'll edit the post accordingly`
  );
}
