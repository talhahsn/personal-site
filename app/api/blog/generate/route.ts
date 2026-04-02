import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { generateBlogPost } from "@/lib/groq";
import { sendWhatsAppMessage, buildReviewMessage } from "@/lib/whatsapp";
import { fetchCoverImage } from "@/lib/unsplash";

export async function POST(req: NextRequest) {
  if (req.headers.get("x-api-key") !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const topic: string | undefined = body.topic;

  // Generate post via Gemini
  let generated;
  try {
    generated = await generateBlogPost(topic);
  } catch (err) {
    console.error("[generate] Gemini error:", err);
    return NextResponse.json({ error: "Generation failed", detail: String(err) }, { status: 500 });
  }

  // Fetch cover image from Unsplash using tags
  const imageQuery = generated.tags.slice(0, 2).join(" ") || generated.category;
  const cover_image = await fetchCoverImage(imageQuery);

  // Save as draft to Supabase
  const { data, error } = await supabaseAdmin
    .from("posts")
    .insert({
      title: generated.title,
      slug: generated.slug,
      excerpt: generated.excerpt,
      content: generated.content,
      category: generated.category,
      tags: generated.tags,
      read_time: generated.read_time,
      cover_image,
      published: false,
      published_at: null,
    })
    .select()
    .single();

  if (error) {
    console.error("[generate] Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Notify via WhatsApp
  try {
    const msg = buildReviewMessage(data.title, data.excerpt, data.slug);
    await sendWhatsAppMessage(msg);
  } catch (err) {
    // Don't fail the request if WhatsApp fails — post is already saved
    console.error("[generate] WhatsApp notify error:", err);
  }

  return NextResponse.json({ post: data }, { status: 201 });
}
