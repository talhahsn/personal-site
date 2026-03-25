import Link from "next/link";
import { Container } from "../ui/Container";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">Talha Hassan</span>

          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/experience" className="hover:text-black dark:hover:text-white transition-colors">
              Experience
            </Link>
            <Link href="/projects" className="hover:text-black dark:hover:text-white transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </nav>
  );
}
