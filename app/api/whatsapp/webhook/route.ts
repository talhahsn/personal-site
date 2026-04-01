import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { editBlogPost } from "@/lib/groq";
import { sendWhatsAppMessage } from "@/lib/whatsapp";
import { slugify, autoExcerpt } from "@/lib/blog";

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

  const entry = body?.entry?.[0];
  const change = entry?.changes?.[0];
  const message = change?.value?.messages?.[0];

  if (!message) return NextResponse.json({ status: "no_message" });

  const text = message.type === "text" ? message.text?.body?.trim() : null;
  if (!text) return NextResponse.json({ status: "ignored" });

  console.log(`[WhatsApp] Incoming: "${text}"`);

  // Find the most recent draft (the one pending review)
  const { data: draft, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("published", false)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !draft) {
    await sendWhatsAppMessage("No draft found to act on. Generate a new post first.");
    return NextResponse.json({ status: "no_draft" });
  }

  const cmd = text.toLowerCase();

  // PUBLISH
  if (cmd === "publish") {
    const { error: pubErr } = await supabaseAdmin
      .from("posts")
      .update({ published: true, published_at: new Date().toISOString() })
      .eq("id", draft.id);

    if (pubErr) {
      await sendWhatsAppMessage(`Failed to publish: ${pubErr.message}`);
    } else {
      await sendWhatsAppMessage(
        `🚀 *Published!*\n\n*${draft.title}*\n\nhttps://talhahsn.vercel.app/blog/${draft.slug}`
      );
    }
    return NextResponse.json({ status: "published" });
  }

  // DISCARD
  if (cmd === "discard") {
    const { error: delErr } = await supabaseAdmin
      .from("posts")
      .delete()
      .eq("id", draft.id);

    if (delErr) {
      await sendWhatsAppMessage(`Failed to delete: ${delErr.message}`);
    } else {
      await sendWhatsAppMessage(`🗑️ Draft discarded: "${draft.title}"`);
    }
    return NextResponse.json({ status: "discarded" });
  }

  // EDIT REQUEST — pass to Gemini
  try {
    await sendWhatsAppMessage(`✏️ On it — editing "${draft.title}"...`);

    const updatedContent = await editBlogPost(draft.content, text);

    // Extract updated title from first H1 in content, fall back to existing title
    const titleMatch = updatedContent.match(/^#\s+(.+)$/m);
    const updatedTitle = titleMatch ? titleMatch[1].trim() : draft.title;
    const updatedExcerpt = autoExcerpt(updatedContent);
    const updatedSlug = updatedTitle !== draft.title ? slugify(updatedTitle) : draft.slug;

    const { error: updateErr } = await supabaseAdmin
      .from("posts")
      .update({ content: updatedContent, title: updatedTitle, excerpt: updatedExcerpt, slug: updatedSlug })
      .eq("id", draft.id);

    if (updateErr) {
      await sendWhatsAppMessage(`Edit saved but DB update failed: ${updateErr.message}`);
    } else {
      await sendWhatsAppMessage(
        `✅ Done! Post updated.\n\nPreview: https://talhahsn.vercel.app/blog/${updatedSlug}\n\nReply *publish* to go live or keep chatting to refine.`
      );
    }
  } catch (err) {
    console.error("[webhook] edit error:", err);
    await sendWhatsAppMessage(`Something went wrong while editing: ${String(err)}`);
  }

  return NextResponse.json({ status: "ok" });
}
