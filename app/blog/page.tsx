import { Suspense } from "react";
import { cookies } from "next/headers";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { Container } from "@/components/ui/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { PenLine } from "lucide-react";
import Link from "next/link";
import type { Post } from "@/types/blog";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    status?: string;
    page?: string;
  }>;
}

async function getPosts(
  isAdmin: boolean,
  search: string,
  category: string,
  status: string
): Promise<Post[]> {
  const client = isAdmin ? supabaseAdmin : supabase;

  let query = client
    .from("posts")
    .select(
      "id, title, slug, excerpt, category, tags, published, published_at, read_time, created_at, updated_at, content"
    )
    .order("created_at", { ascending: false });

  if (!isAdmin || status === "published") {
    query = query.eq("published", true);
  } else if (status === "draft") {
    query = query.eq("published", false);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
  }

  if (category) {
    query = query.eq("category", category);
  }

  const { data } = await query.limit(50);
  return (data ?? []) as Post[];
}

export default async function BlogPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const search = sp.search ?? "";
  const category = sp.category ?? "";

  const cookieStore = await cookies();
  const isAdmin =
    cookieStore.get("admin_token")?.value === process.env.ADMIN_TOKEN;

  // Admins default to seeing all posts; public only sees published
  const status = sp.status ?? (isAdmin ? "all" : "published");

  const posts = await getPosts(isAdmin, search, category, status);
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <Container>
          <div className="py-12 flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-gray-100 tracking-tight">
                Writing
              </h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-xl">
                Thoughts on engineering, architecture, and the craft of building
                software.
              </p>
            </div>
            {isAdmin && (
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors"
              >
                <PenLine size={15} />
                New Post
              </Link>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8 space-y-8">
          {/* Filters */}
          <Suspense>
            <BlogFilters isAdmin={isAdmin} />
          </Suspense>

          {/* Empty state */}
          {posts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 dark:text-gray-600 text-lg">
                {search || category
                  ? `No posts found${search ? ` for "${search}"` : ""}${category ? ` in ${category}` : ""}.`
                  : "No posts yet. Check back soon."}
              </p>
              {(search || category) && (
                <Link
                  href="/blog"
                  className="mt-4 inline-block text-sm text-sky-600 hover:underline"
                >
                  Clear filters
                </Link>
              )}
            </div>
          )}

          {/* Featured post */}
          {featured && (
            <BlogCard
              post={featured}
              featured
              showStatus={isAdmin}
            />
          )}

          {/* Post grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} showStatus={isAdmin} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
