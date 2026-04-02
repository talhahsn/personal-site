import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { formatDate } from "@/lib/blog";
import type { Post } from "@/types/blog";

interface BlogCardProps {
  post: Pick<
    Post,
    | "title"
    | "slug"
    | "excerpt"
    | "category"
    | "published"
    | "published_at"
    | "created_at"
    | "read_time"
    | "tags"
    | "cover_image"
  >;
  featured?: boolean;
  showStatus?: boolean;
}

export function BlogCard({ post, featured = false, showStatus = false }: BlogCardProps) {
  const date = post.published_at ?? post.created_at;

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:border-sky-300 dark:hover:border-sky-800 hover:shadow-lg transition-all duration-300">
          {post.cover_image && (
            <div className="h-52 w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-8">
          {/* Top row */}
          <div className="flex items-center justify-between mb-4">
            <CategoryBadge category={post.category} />
            <div className="flex items-center gap-4">
              {showStatus && (
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    post.published
                      ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                      : "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                <Clock size={12} />
                {post.read_time} min read
              </span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-gray-100 leading-tight group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="mt-3 text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 text-base">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500">
              <Calendar size={13} />
              {formatDate(date)}
            </span>
            <span className="text-sm font-medium text-sky-700 dark:text-sky-400 group-hover:underline">
              Read more →
            </span>
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="h-full flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:border-sky-300 dark:hover:border-sky-800 hover:shadow-md transition-all duration-300">
        {post.cover_image && (
          <div className="h-40 w-full overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex flex-col flex-1 p-6">
        {/* Top row */}
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={post.category} />
          <div className="flex items-center gap-2">
            {showStatus && (
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  post.published
                    ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                    : "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
              <Clock size={11} />
              {post.read_time} min
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-slate-900 dark:text-gray-100 leading-snug group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Calendar size={11} />
            {formatDate(date)}
          </span>
          <span className="text-xs font-medium text-sky-700 dark:text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
            Read →
          </span>
        </div>
        </div>
      </article>
    </Link>
  );
}
