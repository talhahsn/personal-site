import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.headers.get("x-api-key") !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const to = process.env.WHATSAPP_TO_NUMBER;

  // Show what values are loaded (masked)
  const debug = {
    phoneNumberId: phoneNumberId ? `${phoneNumberId.slice(0, 4)}...${phoneNumberId.slice(-4)}` : "MISSING",
    token: token ? `${token.slice(0, 6)}...${token.slice(-4)}` : "MISSING",
    to: to ?? "MISSING",
  };

  const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: "Test message from blog bot 🤖" },
    }),
  });

  const data = await res.json();
  return NextResponse.json({ debug, status: res.status, response: data });
}
