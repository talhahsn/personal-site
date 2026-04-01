import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { calcReadTime } from "@/lib/blog";

function isAdmin(req: NextRequest) {
  return req.headers.get("x-api-key") === process.env.ADMIN_TOKEN;
}

type RouteCtx = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, { params }: RouteCtx) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const admin = isAdmin(req);
  const client = admin ? supabaseAdmin : supabase;

  const { data, error } = await client
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ post: data });
}

export async function PATCH(req: NextRequest, { params }: RouteCtx) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const body = await req.json();

  const updates: Record<string, unknown> = { ...body };

  if (body.content) {
    updates.read_time = calcReadTime(body.content);
  }
  if (body.published === true) {
    updates.published_at = new Date().toISOString();
  }
  if (body.published === false) {
    updates.published_at = null;
  }

  const { data, error } = await supabaseAdmin
    .from("posts")
    .update(updates)
    .eq("slug", slug)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data });
}

export async function DELETE(req: NextRequest, { params }: RouteCtx) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const { error } = await supabaseAdmin
    .from("posts")
    .delete()
    .eq("slug", slug);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return new NextResponse(null, { status: 204 });
}
