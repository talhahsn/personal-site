"use client";

import Link from "next/link";
import { Container } from "../ui/Container";
import { ThemeToggle } from "../ui/ThemeToggle";
import { NavLinks } from "../ui/NavLinks";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 30));

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-gray-950/85 backdrop-blur-md shadow-sm border-b border-gray-200/60 dark:border-gray-800/60"
          : "bg-white/60 dark:bg-gray-950/60 backdrop-blur border-b border-transparent"
      }`}
    >
      {/* A: Gradient top accent line */}
      <div className="h-0.5 bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500" />

      <Container>
        <div className="flex h-14 items-center justify-between">
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

      {/* D: Scroll progress bar */}
      <motion.div
        className="h-0.5 bg-sky-500 dark:bg-sky-400 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </nav>
  );
}
