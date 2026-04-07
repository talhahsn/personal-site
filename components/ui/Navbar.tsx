"use client";

import Link from "next/link";
import { Container } from "../ui/Container";
import { ThemeToggle } from "../ui/ThemeToggle";
import { NAV_LINKS } from "../ui/NavLinks";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col justify-center items-center w-5 h-5 gap-1.5">
      <span
        className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${
          open ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${
          open ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </span>
  );
}

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 30));

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-gray-950/85 backdrop-blur-md shadow-sm border-b border-gray-200/60 dark:border-gray-800/60"
          : "bg-white/60 dark:bg-gray-950/60 backdrop-blur border-b border-transparent"
      }`}
    >
      {/* Gradient top accent line */}
      <div className="h-0.5 bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500" />

      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setMenuOpen(false)}>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold tracking-wide shrink-0 group-hover:bg-sky-700 dark:group-hover:bg-sky-300 transition-colors">
              TH
            </span>
            <span className="text-base font-light text-slate-500 dark:text-gray-400 tracking-wide">
              Talha{" "}
              <span className="font-bold text-slate-900 dark:text-gray-100">Hassan</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            {NAV_LINKS.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative pb-0.5 transition-colors hover:text-black dark:hover:text-white ${
                    active
                      ? "text-black dark:text-white font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-sky-700 dark:after:bg-sky-400"
                      : ""
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3 text-gray-600 dark:text-gray-400">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="p-1 text-slate-700 dark:text-gray-300"
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-gray-200/60 dark:border-gray-800/60 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md"
          >
            <Container>
              <div className="flex flex-col py-4 gap-1">
                {NAV_LINKS.map(({ href, label }) => {
                  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={`px-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? "text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40"
                          : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div
        className="h-0.5 bg-sky-500 dark:bg-sky-400 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </nav>
  );
}
