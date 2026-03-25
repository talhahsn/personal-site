import { profile } from "@/data/profile";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Top */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Left */}
          <div>
            <h3 className="font-semibold text-lg">
              Talha Hassan
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-sm">
              Senior software engineer building scalable enterprise
              applications across telecom, healthcare, and SaaS.
            </p>

            <p className="mt-4 text-sm text-gray-400 dark:text-gray-600">
              Based in Karachi • Open to remote and relocation roles
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col md:items-end gap-4">

            <div className="flex gap-6 text-sm">
              <Link href={profile.linkedin} target="_blank" className="hover:text-primary">
                LinkedIn
              </Link>

              <Link href={profile.github} target="_blank" className="hover:text-primary">
                GitHub
              </Link>

              <Link href={profile.email} className="hover:text-primary">
                Email
              </Link>
            </div>

            <div className="text-xs text-gray-400">
              Built with Next.js, Tailwind, and TypeScript
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-400 dark:text-gray-600 flex flex-col md:flex-row justify-between gap-3">
          <p>© {new Date().getFullYear()} Talha Hassan</p>
          <p>All rights reserved</p>
        </div>

      </div>
    </footer>
  );
}
