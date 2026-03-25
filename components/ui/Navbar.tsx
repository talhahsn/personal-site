import Link from "next/link";
import { Container } from "../ui/Container";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-gray-200">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <span className="font-semibold text-lg">Talha Hassan</span>

          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <Link href="/experience" className="hover:text-black">
              Experience
            </Link>
            <Link href="/projects" className="hover:text-black">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-black">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}
