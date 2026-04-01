import { Suspense } from "react";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { Container } from "@/components/ui/Container";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { formatDate } from "@/lib/blog";
import { PenLine, Clock, ArrowLeft } from "lucide-react";
import type { Post } from "@/types/blog";
import { AdminPostActions } from "./AdminPostActions";
import { LogoutButton } from "./LogoutButton";

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminBlogPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const status = sp.status ?? "all";

  let query = supabaseAdmin
    .from("posts")
    .select(
      "id, title, slug, excerpt, category, published, published_at, read_time, created_at"
    )
    .order("created_at", { ascending: false });

  if (status === "published") query = query.eq("published", true);
  else if (status === "draft") query = query.eq("published", false);

  const { data: posts } = await query;
  const typedPosts = (posts ?? []) as Post[];

  const publishedCount = typedPosts.filter((p) => p.published).length;
  const draftCount = typedPosts.filter((p) => !p.published).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <Container>
          <div className="py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/blog"
                className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1"
              >
                <ArrowLeft size={14} />
                Blog
              </Link>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-gray-100">
                  Posts
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {publishedCount} published · {draftCount} draft
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LogoutButton />
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors"
              >
                <PenLine size={14} />
                New Post
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-6">
          {/* Status tabs */}
          <div className="flex items-center gap-1 mb-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1 w-fit">
            {(["all", "published", "draft"] as const).map((s) => (
              <Link
                key={s}
                href={s === "all" ? "/admin/blog" : `/admin/blog?status=${s}`}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                  status === s
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                    : "text-gray-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-gray-200"
                }`}
              >
                {s}
              </Link>
            ))}
          </div>

          {typedPosts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-400 dark:text-gray-600">No posts yet.</p>
              <Link
                href="/admin/blog/new"
                className="mt-3 inline-block text-sm text-sky-600 hover:underline"
              >
                Create your first post →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {typedPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-sky-200 dark:hover:border-sky-900 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CategoryBadge category={post.category} />
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          post.published
                            ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                            : "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <Link
                      href={`/admin/blog/${post.slug}/edit`}
                      className="font-semibold text-slate-900 dark:text-gray-100 hover:text-sky-700 dark:hover:text-sky-400 transition-colors text-sm line-clamp-1"
                    >
                      {post.title}
                    </Link>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 dark:text-gray-500">
                      <span>{formatDate(post.published_at ?? post.created_at)}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.read_time} min
                      </span>
                    </div>
                  </div>

                  <Suspense>
                    <AdminPostActions slug={post.slug} published={post.published} />
                  </Suspense>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
