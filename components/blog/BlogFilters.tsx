"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, X } from "lucide-react";
import { CATEGORIES } from "@/types/blog";

interface BlogFiltersProps {
  isAdmin?: boolean;
}

export function BlogFilters({ isAdmin = false }: BlogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const status = searchParams.get("status") ?? "published";

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />
        <input
          type="text"
          placeholder="Search posts..."
          defaultValue={search}
          onChange={(e) => {
            const val = e.target.value;
            clearTimeout((window as unknown as Record<string, ReturnType<typeof setTimeout>>).__blogSearchTimer);
            (window as unknown as Record<string, ReturnType<typeof setTimeout>>).__blogSearchTimer = setTimeout(
              () => update("search", val),
              350
            );
          }}
          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-slate-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-400 dark:focus:border-sky-600 transition"
        />
        {search && (
          <button
            onClick={() => update("search", "")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={14} />
          </button>
        )}
        {isPending && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {/* Category pills + status toggle */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Categories */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => update("category", "")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              !category
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                : "text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-100"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => update("category", category === cat ? "" : cat)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status toggle — admin only */}
        {isAdmin && (
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {(["published", "draft", "all"] as const).map((s) => (
              <button
                key={s}
                onClick={() => update("status", s === "published" ? "" : s)}
                className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                  status === s || (s === "published" && !searchParams.get("status"))
                    ? "bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
