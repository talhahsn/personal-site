"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Globe, EyeOff } from "lucide-react";

interface AdminPostActionsProps {
  slug: string;
  published: boolean;
}

export function AdminPostActions({ slug, published }: AdminPostActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function togglePublish() {
    setLoading("publish");
    await fetch(`/api/blog/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_TOKEN ?? "",
      },
      body: JSON.stringify({ published: !published }),
    });
    router.refresh();
    setLoading(null);
  }

  async function deletePost() {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setLoading("delete");
    await fetch(`/api/blog/${slug}`, {
      method: "DELETE",
      headers: { "x-api-key": process.env.NEXT_PUBLIC_ADMIN_TOKEN ?? "" },
    });
    router.refresh();
    setLoading(null);
  }

  return (
    <div className="flex items-center gap-1 shrink-0">
      <Link
        href={`/admin/blog/${slug}/edit`}
        className="p-2 rounded-lg text-gray-400 hover:text-slate-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        title="Edit"
      >
        <Pencil size={14} />
      </Link>

      <button
        onClick={togglePublish}
        disabled={loading === "publish"}
        className="p-2 rounded-lg text-gray-400 hover:text-sky-700 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950 transition-colors disabled:opacity-50"
        title={published ? "Unpublish" : "Publish"}
      >
        {loading === "publish" ? (
          <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : published ? (
          <EyeOff size={14} />
        ) : (
          <Globe size={14} />
        )}
      </button>

      <button
        onClick={deletePost}
        disabled={loading === "delete"}
        className="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors disabled:opacity-50"
        title="Delete"
      >
        {loading === "delete" ? (
          <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <Trash2 size={14} />
        )}
      </button>
    </div>
  );
}
