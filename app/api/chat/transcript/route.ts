import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";
import { sendWhatsAppMessage } from "@/lib/whatsapp";
import { isSameOrigin } from "@/lib/same-origin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: {
    sessionId: string;
    messages: { role: string; content: string }[];
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { sessionId, messages } = body;

  if (!sessionId || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "sessionId and messages are required." }, { status: 400 });
  }

  // Mark session as ended
  await supabaseAdmin
    .from("chat_sessions")
    .update({ ended_at: new Date().toISOString(), messages })
    .eq("id", sessionId);

  // Only email if there were at least 2 messages (one exchange)
  if (messages.length < 2) {
    return NextResponse.json({ success: true });
  }

  const transcriptHtml = messages
    .map(
      (m) =>
        `<div style="margin-bottom:12px;">
          <strong style="color:${m.role === "user" ? "#0ea5e9" : "#475569"}">${
          m.role === "user" ? "Visitor" : "Assistant"
        }:</strong>
          <p style="margin:4px 0 0;color:#1e293b;white-space:pre-wrap;">${m.content}</p>
        </div>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
      <h2 style="color:#0f172a;margin-bottom:4px;">Chat Session Ended</h2>
      <p style="color:#64748b;margin-top:0;margin-bottom:24px;">A visitor just finished a conversation on your portfolio. ${messages.length} messages exchanged.</p>

      <h3 style="color:#0f172a;">Transcript</h3>
      <div style="background:#f8fafc;border-radius:8px;padding:16px;">
        ${transcriptHtml}
      </div>

      <p style="margin-top:24px;color:#94a3b8;font-size:12px;">Session ID: ${sessionId} · talhahsn.com</p>
    </div>
  `;

  await resend.emails.send({
    from: "Portfolio Chat <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    subject: `Chat transcript — ${messages.length} messages`,
    html,
  });

  // WhatsApp notification for substantive conversations (4+ messages = 2 exchanges)
  if (messages.length >= 4) {
    try {
      const preview = messages
        .slice(0, 4)
        .map((m) => {
          const icon = m.role === "user" ? "👤" : "🤖";
          const text = m.content.length > 80 ? m.content.slice(0, 80) + "…" : m.content;
          return `${icon} ${text}`;
        })
        .join("\n");

      const wa =
        `💬 *Chat session ended — ${messages.length} messages*\n\n` +
        `${preview}\n\n` +
        `Full transcript sent to your email.`;
      await sendWhatsAppMessage(wa);
    } catch (err) {
      console.error("[WhatsApp] Transcript notification failed:", err);
    }
  }

  return NextResponse.json({ success: true });
}
