"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Save, Globe, EyeOff, ArrowLeft, Loader2, ImageIcon, X } from "lucide-react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { CATEGORIES } from "@/types/blog";
import { slugify } from "@/lib/blog";
import type { Post } from "@/types/blog";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <div className="h-96 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
      <Loader2 size={20} className="animate-spin text-gray-400" />
    </div>
  ),
});

interface PostEditorProps {
  post?: Post;
  mode: "new" | "edit";
}

type FormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  published: boolean;
};

type UploadedImage = { name: string; url: string };

export function PostEditor({ post, mode }: PostEditorProps) {
  const router = useRouter();
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const [error, setError] = useState("");
  const [slugLocked, setSlugLocked] = useState(mode === "edit");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const editorWrapperRef = useRef<HTMLDivElement>(null);

  function getEditorTextarea(): HTMLTextAreaElement | null {
    return editorWrapperRef.current?.querySelector<HTMLTextAreaElement>(".w-md-editor-text-input") ?? null;
  }

  const {
    register,
    control,
    setValue,
    getValues,
    reset,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      excerpt: post?.excerpt ?? "",
      content: post?.content ?? "",
      category: post?.category ?? "Engineering",
      tags: post?.tags?.join(", ") ?? "",
      published: post?.published ?? false,
    },
  });

  const titleValue = useWatch({ control, name: "title" });
  const publishedValue = useWatch({ control, name: "published" });
  const contentValue = useWatch({ control, name: "content" });
  const adminToken = process.env.NEXT_PUBLIC_ADMIN_TOKEN ?? "";

  // Insert markdown at cursor position inside the MDEditor textarea
  function insertAtCursor(text: string) {
    const ta = getEditorTextarea();
    const current = getValues("content");
    if (!ta) {
      setValue("content", current + "\n" + text, { shouldDirty: true });
      return;
    }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const next = current.slice(0, start) + text + current.slice(end);
    setValue("content", next, { shouldDirty: true });
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = start + text.length;
      ta.focus();
    });
  }

  // Upload a File to Supabase Storage via the API, insert markdown, add to strip
  const uploadImage = useCallback(
    async (file: File) => {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/blog/upload", {
        method: "POST",
        headers: { "x-api-key": adminToken },
        body: formData,
      });
      setUploading(false);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Image upload failed.");
        return;
      }
      const { url } = await res.json();
      const name = file.name.replace(/\.[^/.]+$/, ""); // strip extension for alt text
      insertAtCursor(`![${name}](${url})`);
      setUploadedImages((prev) => [...prev, { name, url }]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [adminToken]
  );

  // Paste handler — only intercepts when clipboard contains an image
  async function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    const imageItem = Array.from(e.clipboardData.items).find((item) =>
      item.type.startsWith("image/")
    );
    if (!imageItem) return;
    e.preventDefault();
    const file = imageItem.getAsFile();
    if (file) await uploadImage(file);
  }

  // Drop handler — only intercepts image files
  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (!files.length) return;
    e.preventDefault();
    for (const file of files) await uploadImage(file);
  }

  async function save(publishOverride?: boolean) {
    setError("");
    const values = getValues();
    const isPublishing = publishOverride ?? values.published;
    setSaving(isPublishing ? "publish" : "draft");

    const safeSlug = slugify(values.slug || values.title);

    const body = {
      title: values.title,
      slug: safeSlug,
      excerpt: values.excerpt,
      content: values.content,
      category: values.category,
      tags: values.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      published: isPublishing,
    };

    const url =
      mode === "edit"
        ? `/api/blog/${encodeURIComponent(post!.slug)}`
        : "/api/blog";

    const res = await fetch(url, {
      method: mode === "edit" ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json", "x-api-key": adminToken },
      body: JSON.stringify(body),
    });

    setSaving(null);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save.");
      return;
    }

    const { post: saved } = await res.json();

    reset({
      title: saved.title,
      slug: saved.slug,
      excerpt: saved.excerpt ?? "",
      content: saved.content,
      category: saved.category,
      tags: (saved.tags ?? []).join(", "),
      published: saved.published,
    });

    if (mode === "new" || saved.slug !== post?.slug) {
      router.push(`/admin/blog/${encodeURIComponent(saved.slug)}/edit`);
    } else {
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
      {/* Topbar */}
      <div className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin/blog")}
              className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1"
            >
              <ArrowLeft size={14} />
              Posts
            </button>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <span className="text-sm text-slate-700 dark:text-gray-300 font-medium truncate max-w-xs">
              {titleValue || "New post"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {error && (
              <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
            )}

            {/* Publish toggle */}
            <button
              type="button"
              onClick={() => save(!publishedValue)}
              disabled={!!saving}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
                publishedValue
                  ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {saving === "publish" ? (
                <Loader2 size={12} className="animate-spin" />
              ) : publishedValue ? (
                <Globe size={12} />
              ) : (
                <EyeOff size={12} />
              )}
              {publishedValue ? "Published" : "Draft"}
            </button>

            {/* Save */}
            <button
              type="button"
              onClick={() => save()}
              disabled={!!saving || !titleValue || !contentValue || !isDirty}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium hover:bg-slate-700 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving === "draft" ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Save size={12} />
              )}
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-5">
        {/* Title */}
        <input
          type="text"
          {...register("title", {
            onChange: (e) => {
              if (!slugLocked) setValue("slug", slugify(e.target.value), { shouldDirty: true });
            },
          })}
          placeholder="Post title"
          className="w-full text-3xl font-bold bg-transparent text-slate-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-700 border-none outline-none"
        />

        {/* Meta row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Slug */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Slug
            </label>
            <Controller
              control={control}
              name="slug"
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/ /g, "-"));
                    setSlugLocked(true);
                  }}
                  onBlur={() => {
                    field.onChange(slugify(field.value));
                    field.onBlur();
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-slate-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-400 transition font-mono"
                />
              )}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-slate-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-400 transition"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Tags <span className="font-normal text-gray-400">(comma separated)</span>
            </label>
            <input
              type="text"
              {...register("tags")}
              placeholder="react, typescript, ..."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-slate-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-400 transition"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Excerpt{" "}
            <span className="font-normal text-gray-400">(auto-generated if empty)</span>
          </label>
          <textarea
            {...register("excerpt")}
            rows={2}
            placeholder="A short summary of the post..."
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-slate-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-400 transition resize-none"
          />
        </div>

        {/* Markdown editor with paste/drop support */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
              Content
            </label>
            <span className="text-xs text-gray-400 dark:text-gray-600 flex items-center gap-1">
              {uploading ? (
                <>
                  <Loader2 size={11} className="animate-spin" /> Uploading image…
                </>
              ) : (
                <>
                  <ImageIcon size={11} /> Paste or drop images directly
                </>
              )}
            </span>
          </div>

          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <div
                ref={editorWrapperRef}
                onPaste={handlePaste}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="relative"
              >
                <div data-color-mode="light" className="dark:hidden">
                  <MDEditor
                    value={field.value}
                    onChange={(val) => field.onChange(val ?? "")}
                    height={520}
                    preview="live"
                  />
                </div>
                <div data-color-mode="dark" className="hidden dark:block">
                  <MDEditor
                    value={field.value}
                    onChange={(val) => field.onChange(val ?? "")}
                    height={520}
                    preview="live"
                  />
                </div>
              </div>
            )}
          />
        </div>

        {/* Uploaded images strip */}
        {uploadedImages.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Uploaded this session — click to re-insert
            </p>
            <div className="flex flex-wrap gap-2">
              {uploadedImages.map((img, i) => (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => insertAtCursor(`![${img.name}](${img.url})`)}
                  onKeyDown={(e) => e.key === "Enter" && insertAtCursor(`![${img.name}](${img.url})`)}
                  className="group relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-sky-400 transition cursor-pointer"
                  title={img.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-20 h-16 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                    <span className="text-white text-xs opacity-0 group-hover:opacity-100 font-medium px-1 text-center leading-tight">
                      Insert
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedImages((prev) => prev.filter((_, idx) => idx !== i));
                    }}
                    className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition text-white"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isDirty && (
          <p className="text-xs text-gray-400 text-center">No unsaved changes</p>
        )}
      </div>
    </div>
  );
}
