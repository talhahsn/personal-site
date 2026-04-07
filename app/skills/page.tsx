"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import {
  skills,
  type SkillCategory,
} from "@/data/skills";

const FILTER_CATEGORIES: SkillCategory[] = [
  "Frontend",
  "Backend",
  "CSS & UI",
  "State Management",
  "Testing",
  "Database",
  "Build & Tooling",
  "DevOps",
  "AI & ML",
  "Quality",
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const SUMMARY_STATS: { label: SkillCategory; short: string }[] = [
  { label: "Frontend", short: "Frontend" },
  { label: "Backend", short: "Backend" },
  { label: "CSS & UI", short: "CSS & UI" },
  { label: "AI & ML", short: "AI & ML" },
  { label: "DevOps", short: "DevOps" },
];

export default function SkillsPage() {
  const [active, setActive] = useState<SkillCategory>("Frontend");

  const filtered = skills.filter((s) => s.category === active);

  const expertCount = skills.filter((s) => s.level === "Expert").length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-32">

        {/* ── Hero ── */}
        <header className="mb-20 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-manrope text-5xl md:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-gray-100 mb-8 leading-[0.9]"
          >
            Skills{" "}
            <span className="text-gray-300 dark:text-gray-700">&amp;</span>
            <br />
            Stack
            <span className="text-sky-500">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed font-light"
          >
            Technologies and practices I&apos;ve used across production systems.{" "}
            <span className="text-slate-900 dark:text-gray-100 font-medium">
              {expertCount} expert-level domains
            </span>{" "}
            across{" "}
            <span className="text-slate-900 dark:text-gray-100 font-medium">
              {skills.length} total proficiencies
            </span>
            .
          </motion.p>
        </header>

        {/* ── Summary metrics ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-24"
        >
          {SUMMARY_STATS.map(({ label, short }) => {
            const count = skills.filter((s) => s.category === label).length;
            return (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={`text-left border-l-2 pl-6 py-2 transition-colors ${
                  active === label
                    ? "border-sky-500"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1 block">
                  {short}
                </span>
                <span className="font-manrope text-3xl font-bold text-slate-900 dark:text-gray-100">
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </motion.section>

        {/* ── Filter bar ── */}
        <section className="mb-16 pb-12 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 shrink-0">
              Category
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium">
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative pb-1 transition-colors ${
                    active === cat
                      ? "text-slate-900 dark:text-gray-100 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-slate-900 dark:after:bg-gray-100"
                      : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Skills grid ── */}
        <AnimatePresence mode="wait">
          <motion.section
            key={active}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                variants={cardVariant}
                className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6 flex flex-col justify-between min-h-40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.3)]"
              >
                <div>
                  <div className="mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2 py-0.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded">
                      {skill.category}
                    </span>
                  </div>
                  <h3 className="font-manrope text-lg font-bold text-slate-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                    {skill.name}
                  </h3>
                  {skill.description && (
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 font-light mt-1.5 leading-relaxed">
                      {skill.description}
                    </p>
                  )}
                </div>
                {skill.tags && skill.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded border border-gray-100 dark:border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.section>
        </AnimatePresence>

        {/* ── CTA ── */}
        <section className="mt-32">
          <div className="bg-slate-900 dark:bg-gray-900 rounded-3xl p-10 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -ml-32 -mb-32" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-manrope text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                Interested in working together?
              </h2>
              <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-10">
                I&apos;m open to full-stack engineering roles and high-impact projects.
                Let&apos;s build something exceptional.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white text-sm font-manrope font-bold tracking-wide transition-colors rounded-xl shadow-lg shadow-sky-500/20"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/projects"
                  className="text-gray-400 hover:text-white text-sm font-manrope font-bold tracking-wide transition-colors flex items-center gap-2"
                >
                  View Projects →
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
