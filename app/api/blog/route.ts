import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { slugify, calcReadTime, autoExcerpt } from "@/lib/blog";

function isAdmin(req: NextRequest) {
  return req.headers.get("x-api-key") === process.env.ADMIN_TOKEN;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const status = searchParams.get("status") ?? "published"; // published | draft | all
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "12"));

  const admin = isAdmin(req);
  const client = admin ? supabaseAdmin : supabase;

  let query = client
    .from("posts")
    .select(
      "id, title, slug, excerpt, category, tags, published, published_at, read_time, created_at"
    )
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (!admin || status === "published") {
    query = query.eq("published", true);
  } else if (status === "draft") {
    query = query.eq("published", false);
  }
  // status === "all" + admin: no published filter

  if (search) {
    query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
  }

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ posts: data ?? [] });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, category, tags, published } = body;

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json(
      { error: "title and content are required" },
      { status: 400 }
    );
  }

  const slug = body.slug?.trim() || slugify(title);
  const excerpt = body.excerpt?.trim() || autoExcerpt(content);

  const { data, error } = await supabaseAdmin
    .from("posts")
    .insert({
      title: title.trim(),
      slug,
      excerpt,
      content: content.trim(),
      category: category ?? "General",
      tags: tags ?? [],
      read_time: calcReadTime(content),
      published: published ?? false,
      published_at: published ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data }, { status: 201 });
}
