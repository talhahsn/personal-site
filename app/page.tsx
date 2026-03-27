"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import { ProjectModal } from "./projects/ProjectModal";
import Link from "next/link";
import Image from "next/image";
import { Download, MapPin, ArrowRight, BadgeCheck } from "lucide-react";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const skills = [
  "React", "Next.js", "TypeScript", "Node.js",
  "NestJS", "GraphQL", "PostgreSQL", "Angular", "Docker", "CI/CD",
];

export default function Home() {
  const previewExp = experience.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="pt-12 pb-16 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container>
          <motion.div
            className="flex flex-col items-center text-center"
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
              {profile.role}
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
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
                >
                  {skill}
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors"
              >
                <Download size={15} />
                Download Resume
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
                { value: "8+", label: "Years" },
                { value: "5+", label: "Companies" },
                { value: "10+", label: "Products" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-gray-100">
                    {value}
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
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <Container>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100">
                Featured Projects
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
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
      <section className="py-12 bg-white dark:bg-gray-950">
        <Container>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100">
                Experience
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
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
            className="flex flex-col gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {previewExp.map((item) => (
              <motion.div key={item.company + item.role} variants={fadeUp}>
                <div className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
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

      {/* SKILLS */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <Container>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100">
              Skills & Stack
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Technologies I work with daily
            </p>
          </div>
          <motion.div
            className="flex flex-wrap gap-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              "React", "Next.js", "TypeScript", "JavaScript",
              "Node.js", "NestJS", "Express",
              "GraphQL", "REST APIs", "Apollo",
              "PostgreSQL", "MongoDB", "Redis",
              "Angular", "AngularJS",
              "Docker", "CI/CD", "GitHub Actions",
              "Tailwind CSS", "Framer Motion",
              "Kong API Gateway", "Vercel",
            ].map((skill) => (
              <motion.span
                key={skill}
                variants={fadeUp}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:border-sky-400 dark:hover:border-sky-600 hover:text-sky-700 dark:hover:text-sky-300 transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
