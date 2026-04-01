import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { PostEditor } from "../../PostEditor";
import type { Post } from "@/types/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  // Next.js auto-decodes params, but be explicit for safety
  const slug = decodeURIComponent(rawSlug);

  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[EditPostPage] Supabase error:", error.message);
    notFound();
  }
  if (!data) notFound();

  return <PostEditor post={data as Post} mode="edit" />;
}
