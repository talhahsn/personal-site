"use client";

import { Modal } from "@/components/ui/Modal";
import { Card } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";

type Project = {
  title: string;
  company: string;
  description: string;
  details: string;
  stack: string[];
  impact: string;
  link?: string;
};

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
            <ArrowRight size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
          </div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-gray-100 leading-snug">
            {project.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.stack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">
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
      {/* Company */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {project.company}
      </p>

      {/* Details */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        {project.details}
      </p>

      {/* Stack */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Tech Stack
        </h4>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="
                text-xs
                bg-gray-100 dark:bg-gray-800
                px-3 py-1
                rounded-full
                text-gray-700 dark:text-gray-300
              "
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Impact */}
      <div className="border-t dark:border-gray-700 pt-4">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Impact
        </h4>

        <p className="text-gray-700 dark:text-gray-300">
          {project.impact}
        </p>
      </div>

      {/* Optional link */}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          className="inline-block mt-6 text-primary hover:underline"
        >
          View Project →
        </a>
      )}
    </Modal>
  );
}
