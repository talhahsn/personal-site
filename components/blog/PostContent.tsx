"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function PostContent({ content }: { content: string }) {
  return (
    <div className="prose-blog">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      <style>{`
        .prose-blog { color: inherit; }
        .prose-blog h1 { font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem; line-height: 1.25; color: var(--tw-prose-headings, #0f172a); }
        .prose-blog h2 { font-size: 1.5rem; font-weight: 700; margin: 1.75rem 0 0.75rem; line-height: 1.3; color: var(--tw-prose-headings, #0f172a); }
        .prose-blog h3 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.5rem; }
        .prose-blog p { margin: 1rem 0; line-height: 1.8; color: #374151; }
        .prose-blog a { color: #0369a1; text-decoration: underline; }
        .prose-blog a:hover { color: #0284c7; }
        .prose-blog ul, .prose-blog ol { margin: 1rem 0; padding-left: 1.5rem; }
        .prose-blog li { margin: 0.375rem 0; line-height: 1.7; color: #374151; }
        .prose-blog ul li { list-style-type: disc; }
        .prose-blog ol li { list-style-type: decimal; }
        .prose-blog blockquote { border-left: 4px solid #e2e8f0; padding-left: 1rem; margin: 1.5rem 0; color: #64748b; font-style: italic; }
        .prose-blog code { background: #f1f5f9; padding: 0.2em 0.4em; border-radius: 4px; font-size: 0.875em; font-family: 'Fira Code', monospace; color: #0f172a; }
        .prose-blog pre { background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 0.75rem; overflow-x: auto; margin: 1.5rem 0; }
        .prose-blog pre code { background: transparent; padding: 0; color: inherit; font-size: 0.875rem; }
        .prose-blog hr { border: none; border-top: 1px solid #e2e8f0; margin: 2rem 0; }
        .prose-blog table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
        .prose-blog th { background: #f8fafc; padding: 0.75rem 1rem; text-align: left; font-weight: 600; border: 1px solid #e2e8f0; font-size: 0.875rem; }
        .prose-blog td { padding: 0.75rem 1rem; border: 1px solid #e2e8f0; font-size: 0.875rem; color: #374151; }
        .prose-blog tr:nth-child(even) td { background: #f8fafc; }
        .prose-blog img { max-width: 100%; border-radius: 0.75rem; margin: 1.5rem 0; }
        .prose-blog strong { font-weight: 600; color: #0f172a; }

        /* Dark mode */
        .dark .prose-blog p, .dark .prose-blog li { color: #d1d5db; }
        .dark .prose-blog h1, .dark .prose-blog h2, .dark .prose-blog h3, .dark .prose-blog strong { color: #f3f4f6; }
        .dark .prose-blog a { color: #38bdf8; }
        .dark .prose-blog blockquote { border-left-color: #374151; color: #9ca3af; }
        .dark .prose-blog code { background: #1e293b; color: #e2e8f0; }
        .dark .prose-blog pre { background: #0f172a; }
        .dark .prose-blog th { background: #1e293b; border-color: #374151; color: #e2e8f0; }
        .dark .prose-blog td { border-color: #374151; color: #d1d5db; }
        .dark .prose-blog tr:nth-child(even) td { background: #1e293b; }
        .dark .prose-blog hr { border-top-color: #374151; }
      `}</style>
    </div>
  );
}
