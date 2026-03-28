"use client";

import { Modal } from "@/components/ui/Modal";
import { Card } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";

type Project = {
  title: string;
  company: string;
  description: string;
  problem: string;
  details: string;
  stack: string[];
  impact: string;
  link?: string;
};

function CaseStudySection({
  step,
  label,
  color,
  children,
}: {
  step: string;
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center shrink-0">
        <span
          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${color}`}
        >
          {step}
        </span>
        <div className="w-px flex-1 bg-gray-100 dark:bg-gray-800 mt-2" />
      </div>
      <div className="pb-6 flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5">
          {label}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  );
}

export function ProjectModal({ project }: { project: Project }) {
  return (
    <Modal
      title={project.title}
      trigger={
        <Card className="cursor-pointer group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-900">
              {project.company}
            </span>
            <ArrowRight
              size={14}
              className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
            />
          </div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-gray-100 leading-snug">
            {project.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="text-xs text-gray-400 dark:text-gray-500 px-2 py-0.5">
                +{project.stack.length - 3} more
              </span>
            )}
          </div>
        </Card>
      }
    >
      {/* Header meta */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-900">
          {project.company}
        </span>
        <div className="flex flex-wrap gap-1.5 justify-end">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
        {project.description}
      </p>

      {/* Case study narrative */}
      <div>
        <CaseStudySection
          step="1"
          label="The Problem"
          color="bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400"
        >
          {project.problem}
        </CaseStudySection>

        <CaseStudySection
          step="2"
          label="The Approach"
          color="bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-400"
        >
          {project.details}
        </CaseStudySection>

        {/* Last section — no vertical line */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center shrink-0">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400">
              3
            </span>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5">
              The Outcome
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.impact}
            </p>
          </div>
        </div>
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          className="inline-flex items-center gap-1.5 mt-6 text-sm text-sky-700 dark:text-sky-400 hover:underline"
        >
          View Project <ArrowRight size={13} />
        </a>
      )}
    </Modal>
  );
}
