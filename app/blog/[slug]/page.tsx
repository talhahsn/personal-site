import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, PenLine } from "lucide-react";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { Container } from "@/components/ui/Container";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { PostContent } from "@/components/blog/PostContent";
import { formatDate } from "@/lib/blog";
import type { Post } from "@/types/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { data } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) return {};
  return { title: `${data.title} | Talha Hassan`, description: data.excerpt };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const cookieStore = await cookies();
  const isAdmin =
    cookieStore.get("admin_token")?.value === process.env.ADMIN_TOKEN;

  const client = isAdmin ? supabaseAdmin : supabase;
  const { data: post } = await client
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) notFound();

  // Non-admins can't see drafts
  if (!isAdmin && !post.published) notFound();

  const typedPost = post as Post;
  const date = typedPost.published_at ?? typedPost.created_at;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Container>
        <div className="max-w-3xl mx-auto py-12">
          {/* Back + admin edit */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft size={15} />
              Back to Writing
            </Link>
            {isAdmin && (
              <Link
                href={`/admin/blog/${slug}/edit`}
                className="inline-flex items-center gap-1.5 text-sm text-sky-600 dark:text-sky-400 hover:underline"
              >
                <PenLine size={13} />
                Edit post
              </Link>
            )}
          </div>

          {/* Draft banner */}
          {!typedPost.published && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 text-yellow-800 dark:text-yellow-300 text-sm font-medium">
              This post is a draft — only visible to admins.
            </div>
          )}

          {/* Article header */}
          <article>
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <CategoryBadge category={typedPost.category} />
                {typedPost.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-400 dark:text-gray-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-gray-100 leading-tight">
                {typedPost.title}
              </h1>

              <p className="mt-3 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                {typedPost.excerpt}
              </p>

              <div className="mt-5 flex items-center gap-5 text-sm text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800 pb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {typedPost.read_time} min read
                </span>
                {/* Author */}
                <span className="ml-auto flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold flex items-center justify-center">
                    TH
                  </span>
                  <span className="text-slate-600 dark:text-gray-400">
                    Talha Hassan
                  </span>
                </span>
              </div>
            </header>

            {/* Content */}
            <PostContent content={typedPost.content} />
          </article>

          {/* Footer nav */}
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-sky-600 dark:text-sky-400 hover:underline"
            >
              <ArrowLeft size={14} />
              All posts
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
