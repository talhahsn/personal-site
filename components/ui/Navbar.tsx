import Link from "next/link";
import { Container } from "../ui/Container";
import { ThemeToggle } from "../ui/ThemeToggle";
import { NavLinks } from "../ui/NavLinks";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold tracking-wide shrink-0 group-hover:bg-sky-700 dark:group-hover:bg-sky-300 transition-colors">
              TH
            </span>
            <span className="text-base font-light text-slate-500 dark:text-gray-400 tracking-wide">
              Talha{" "}
              <span className="font-bold text-slate-900 dark:text-gray-100">Hassan</span>
            </span>
          </Link>

          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <NavLinks />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </nav>
  );
}
