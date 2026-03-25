"use client";

import { Modal } from "@/components/ui/Modal";
import { Card } from "@/components/ui/Card";

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
        <Card className="cursor-pointer">
          <h3 className="font-semibold text-lg">
            {project.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {project.description}
          </p>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
            {project.company}
          </p>
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
