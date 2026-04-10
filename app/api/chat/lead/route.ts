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
    name: string;
    company?: string;
    email: string;
    note?: string;
    transcript: { role: string; content: string }[];
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { sessionId, name, company, email, note, transcript } = body;

  if (!name || !email || !sessionId) {
    return NextResponse.json({ error: "name, email, and sessionId are required." }, { status: 400 });
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // Save lead to Supabase
  const { error: dbError } = await supabaseAdmin.from("leads").insert({
    session_id: sessionId,
    name,
    company: company ?? null,
    email,
    note: note ?? null,
  });

  if (dbError) {
    console.error("Failed to save lead:", dbError.message);
    // Don't fail the request — still send the email
  }

  // Mark session as lead captured
  await supabaseAdmin
    .from("chat_sessions")
    .update({ lead_captured: true })
    .eq("id", sessionId);

  // Build transcript HTML for the email
  const transcriptHtml = transcript
    .map(
      (m) =>
        `<div style="margin-bottom:12px;">
          <strong style="color:${m.role === "user" ? "#0ea5e9" : "#475569"}">${
          m.role === "user" ? name : "Assistant"
        }:</strong>
          <p style="margin:4px 0 0;color:#1e293b;white-space:pre-wrap;">${m.content}</p>
        </div>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
      <h2 style="color:#0f172a;margin-bottom:4px;">New Lead from Portfolio Chat</h2>
      <p style="color:#64748b;margin-top:0;margin-bottom:24px;">Someone reached out via your portfolio chatbot.</p>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:8px 0;color:#64748b;width:100px;">Name</td><td style="padding:8px 0;font-weight:600;color:#0f172a;">${name}</td></tr>
        ${company ? `<tr><td style="padding:8px 0;color:#64748b;">Company</td><td style="padding:8px 0;font-weight:600;color:#0f172a;">${company}</td></tr>` : ""}
        <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#0ea5e9;">${email}</a></td></tr>
        ${note ? `<tr><td style="padding:8px 0;color:#64748b;vertical-align:top;">Note</td><td style="padding:8px 0;color:#0f172a;">${note}</td></tr>` : ""}
      </table>

      <h3 style="color:#0f172a;border-top:1px solid #e2e8f0;padding-top:16px;">Conversation Transcript</h3>
      <div style="background:#f8fafc;border-radius:8px;padding:16px;">
        ${transcriptHtml || "<p style='color:#94a3b8;'>No messages recorded.</p>"}
      </div>

      <p style="margin-top:24px;color:#94a3b8;font-size:12px;">Sent from your portfolio chatbot · talhahsn.com</p>
    </div>
  `;

  const { error: emailError } = await resend.emails.send({
    from: "Portfolio Chat <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    subject: `New lead: ${name}${company ? ` from ${company}` : ""}`,
    html,
  });

  if (emailError) {
    console.error("Failed to send lead email:", emailError);
    return NextResponse.json({ error: "Lead saved but email failed." }, { status: 500 });
  }

  // WhatsApp notification
  try {
    const wa =
      `🎯 *New lead from portfolio chat*\n\n` +
      `*Name:* ${name}\n` +
      (company ? `*Company:* ${company}\n` : "") +
      `*Email:* ${email}\n\n` +
      `Reply to their email to follow up.`;
    await sendWhatsAppMessage(wa);
  } catch (err) {
    console.error("[WhatsApp] Lead notification failed:", err);
  }

  return NextResponse.json({ success: true });
}
