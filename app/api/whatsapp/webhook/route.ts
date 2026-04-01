import { NextRequest, NextResponse } from "next/server";

// GET — Meta webhook verification handshake
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// POST — incoming WhatsApp messages
export async function POST(req: NextRequest) {
  const body = await req.json();

  // Acknowledge receipt immediately (Meta requires < 5s response)
  const entry = body?.entry?.[0];
  const change = entry?.changes?.[0];
  const message = change?.value?.messages?.[0];

  if (!message) {
    return NextResponse.json({ status: "no_message" });
  }

  const from = message.from; // sender's WhatsApp number
  const text = message.type === "text" ? message.text?.body?.trim() : null;

  if (!text) {
    return NextResponse.json({ status: "ignored" });
  }

  console.log(`[WhatsApp] Message from ${from}: ${text}`);

  // Message handling will be wired in here once the full agent is built
  return NextResponse.json({ status: "ok" });
}
