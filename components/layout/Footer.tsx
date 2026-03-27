import { profile } from "@/data/profile";
import Link from "next/link";
import { Mail } from "lucide-react";

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400 dark:text-gray-600">
          © {new Date().getFullYear()} Talha Hassan · Built with Next.js &amp; Tailwind
        </p>
        <div className="flex items-center gap-5">
          <Link
            href={profile.linkedin}
            target="_blank"
            className="text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <LinkedInIcon size={18} />
          </Link>
          <Link
            href={profile.github}
            target="_blank"
            className="text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <GitHubIcon size={18} />
          </Link>
          <Link
            href={`mailto:${profile.email}`}
            className="text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <Mail size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
