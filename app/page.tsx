"use client";

import { motion, type Variants, useMotionValue, useTransform, useInView, animate } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import { ProjectModal } from "./projects/ProjectModal";
import Link from "next/link";
import Image from "next/image";
import { Download, MapPin, ArrowRight, BadgeCheck } from "lucide-react";
import { skills, SKILL_CATEGORIES, CATEGORY_META } from "@/data/skills";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const ROLES = [
  "Senior Software Engineer",
  "Full-Stack Engineer",
  "Technical Lead",
];

function Typewriter() {
  const [displayed, setDisplayed] = useState("");
  const state = useRef({ roleIdx: 0, deleting: false, pauseTicks: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      const s = state.current;
      const current = ROLES[s.roleIdx];

      if (s.pauseTicks > 0) {
        s.pauseTicks--;
        return;
      }

      if (!s.deleting) {
        setDisplayed((prev) => {
          const next = current.slice(0, prev.length + 1);
          if (next === current) {
            s.pauseTicks = 32;
            s.deleting = true;
          }
          return next;
        });
      } else {
        setDisplayed((prev) => {
          const next = prev.slice(0, -1);
          if (next === "") {
            s.deleting = false;
            s.roleIdx = (s.roleIdx + 1) % ROLES.length;
          }
          return next;
        });
      }
    }, 50);

    return () => clearInterval(id);
  }, []);

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-sky-500">|</span>
    </span>
  );
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


export default function Home() {
  const previewExp = experience.slice(0, 3);

  const cursorX = useMotionValue(-999);
  const cursorY = useMotionValue(-999);
  const spotlightBg = useTransform(
    [cursorX, cursorY],
    ([x, y]: number[]) =>
      `radial-gradient(circle 300px at ${x}px ${y}px, rgba(251,191,36,0.22) 0%, transparent 70%)`
  );

  return (
    <div>
      {/* HERO */}
      <section
        className="relative pt-12 pb-16 overflow-hidden"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          cursorX.set(e.clientX - rect.left);
          cursorY.set(e.clientY - rect.top);
        }}
        onMouseLeave={() => {
          cursorX.set(-999);
          cursorY.set(-999);
        }}
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950" />

        {/* Dot grid — light */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.45) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Dot grid — dark */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(51,65,85,0.7) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Mouse spotlight glow — follows cursor, no mask needed */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: spotlightBg }}
        />

        {/* Color blob — top right */}
        <div className="absolute -top-24 -right-24 w-120 h-120 rounded-full bg-sky-300 dark:bg-sky-900 blur-3xl opacity-20 dark:opacity-20" />
        {/* Color blob — bottom left */}
        <div className="absolute -bottom-16 -left-16 w-96 h-96 rounded-full bg-indigo-300 dark:bg-indigo-900 blur-3xl opacity-15 dark:opacity-15" />

        {/* Content */}
        <Container>
          <motion.div
            className="relative z-10 flex flex-col items-center text-center"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Avatar with availability dot */}
            <motion.div variants={fadeUp} className="mb-4 relative inline-block">
              <Image
                src="/talha.png"
                alt="Talha Hassan"
                width={96}
                height={96}
                loading="eager"
                priority
                className="rounded-full shadow-xl ring-4 ring-white dark:ring-gray-800"
              />
              {profile.available && (
                <div className="absolute bottom-1 right-1 group">
                  <span className="relative flex w-4 h-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" />
                  </span>
                  <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1 rounded-md bg-green-600 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {profile.availableNote}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-green-600" />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Name + verified badge */}
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-gray-100">
                {profile.name}
              </h1>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="shrink-0 translate-y-1">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors">
                  <BadgeCheck className="w-4 h-4" />
                </span>
              </a>
            </motion.div>

            {/* Role */}
            <p className="mt-3 text-xl font-medium text-slate-600 dark:text-gray-400">
              <Typewriter />
            </p>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-gray-400"
            >
              {profile.summary}
            </motion.p>

            {/* Skill pills */}
            <motion.div
              variants={fadeUp}
              className="mt-4 flex flex-wrap justify-center gap-2"
            >
              {skills.filter((s) => s.level === "Expert").slice(0, 8).map((s) => (
                <span
                  key={s.name}
                  className="px-3 py-1 text-xs rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium"
                >
                  {s.name}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex gap-4 flex-wrap justify-center"
            >
              <a
                href="/resume/M.Talha Hassan Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors shadow-sm"
              >
                <Download size={15} />
                Download Resume
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800 transition-colors backdrop-blur-sm"
              >
                Get in touch
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex gap-12 flex-wrap justify-center"
            >
              {[
                { to: 8, suffix: "+", label: "Years" },
                { to: 5, suffix: "+", label: "Companies" },
                { to: 10, suffix: "+", label: "Products" },
              ].map(({ to, suffix, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-gray-100">
                    <Counter to={to} suffix={suffix} />
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Location */}
            <motion.p
              variants={fadeUp}
              className="mt-5 text-sm text-gray-400 dark:text-gray-600 flex items-center gap-1.5"
            >
              <MapPin size={13} />
              {profile.location} · Open to remote & relocation opportunities
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <Container>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100 pl-3 border-l-2 border-sky-500">
                Featured Projects
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm pl-3">
                Selected enterprise work across domains
              </p>
            </div>
            <Link
              href="/projects"
              className="text-sm font-medium text-sky-700 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {featuredProjects.map((project) => (
              <motion.div key={project.title} variants={fadeUp}>
                <ProjectModal project={project} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* EXPERIENCE PREVIEW */}
      <section className="py-12 bg-slate-50 dark:bg-gray-900">
        <Container>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100 pl-3 border-l-2 border-sky-500">
                Experience
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm pl-3">
                Where I&apos;ve built and shipped
              </p>
            </div>
            <Link
              href="/experience"
              className="text-sm font-medium text-sky-700 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <motion.div
            className="flex flex-col gap-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {previewExp.map((item) => (
              <motion.div key={item.company + item.role} variants={fadeUp}>
                <div className="flex items-center gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-sky-200 dark:hover:border-sky-900 hover:shadow-sm transition-all">
                  {item.logo && (
                    <Image
                      src={item.logo}
                      alt={item.company}
                      width={44}
                      height={44}
                      className="rounded-lg object-contain shrink-0 bg-white p-1 border border-gray-100"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900 dark:text-gray-100 text-sm">
                        {item.role}
                      </span>
                      {item.senior && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900">
                          Senior
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.company} · {item.period}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1.5 line-clamp-1">
                      {item.points[0]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* SKILLS PREVIEW */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <Container>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-manrope text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-gray-100 leading-[0.95]">
                Skills <span className="text-gray-300 dark:text-gray-700">&amp;</span> Stack<span className="text-sky-500">.</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                {skills.filter((s) => s.level === "Expert").length} expert-level · {skills.length} total across {SKILL_CATEGORIES.length} domains
              </p>
            </div>
            <Link
              href="/skills"
              className="text-sm font-medium text-sky-700 dark:text-sky-400 hover:underline flex items-center gap-1 shrink-0"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 items-stretch"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {(["Frontend", "Backend", "CSS & UI", "State Management", "DevOps"] as const).map((cat) => {
              const meta = CATEGORY_META[cat];
              const catSkills = skills.filter((s) => s.category === cat);
              const expertCount = catSkills.filter((s) => s.level === "Expert").length;
              const topSkills = catSkills.slice(0, 3);
              const remaining = catSkills.length - 3;
              return (
                <motion.div key={cat} variants={fadeUp} className="h-full">
                  <Link
                    href="/skills"
                    className={`flex flex-col h-full p-4 rounded-xl border ${meta.bg} ${meta.border} hover:shadow-sm transition-all group`}
                  >
                    <span className={`text-xs font-semibold ${meta.color}`}>{cat}</span>
                    <p className="text-2xl font-bold text-slate-900 dark:text-gray-100 mt-1.5">
                      {catSkills.length}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 mb-3">
                      {expertCount} expert
                    </p>
                    <div className="mt-auto flex flex-col gap-1">
                      {topSkills.map((s) => (
                        <span
                          key={s.name}
                          className={`text-xs px-1.5 py-0.5 rounded ${meta.bg} ${meta.color} border ${meta.border} truncate`}
                        >
                          {s.name}
                        </span>
                      ))}
                      {remaining > 0 && (
                        <span className="text-xs text-gray-400 dark:text-gray-500 px-1.5 py-0.5">
                          +{remaining} more
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
