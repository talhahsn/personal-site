import { Resend } from "resend";
import { isSameOrigin } from "@/lib/same-origin";

const resend = new Resend(process.env.RESEND_API_KEY!);

/**
 * Simple in-memory rate limiter.
 * Good enough for portfolio traffic.
 */
const RATE_LIMIT = 5; // requests
const WINDOW = 60 * 1000; // 1 min

const ipStore = new Map<string, { count: number; time: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry) {
    ipStore.set(ip, { count: 1, time: now });
    return true;
  }

  if (now - entry.time > WINDOW) {
    ipStore.set(ip, { count: 1, time: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!rateLimit(ip)) {
      return Response.json(
        { error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, message, company } = body;

    /**
     * Honeypot spam protection
     * Bots fill hidden fields, humans don't
     */
    if (company) {
      return Response.json({ success: true });
    }

    /**
     * Validation
     */
    if (!name || !email || !message) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return Response.json(
        { error: "Invalid email." },
        { status: 400 }
      );
    }

    /**
     * Send email
     */
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: system-ui; max-width:600px; margin:auto;">
          <h2>New Contact Form Message</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>

          <div style="
            margin-top:20px;
            padding:16px;
            background:#f5f5f5;
            border-radius:8px;
          ">
            ${message.replace(/\n/g, "<br/>")}
          </div>

          <p style="margin-top:20px; color:#888; font-size:12px;">
            Sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    return Response.json({ success: true });

  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
