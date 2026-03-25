import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Timeline } from "@/components/ui/Timeline";
import { experience } from "@/data/experience";
import { Download } from "lucide-react";

export default function ExperiencePage() {
  const years = new Date().getFullYear() - 2018;

  return (
    <Container>
      <Section title="Experience">
        <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-3xl font-semibold text-slate-900 dark:text-gray-100">
              {years}+ Years of Experience
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Building enterprise software across telecom, healthcare, insurance,
              and SaaS.
            </p>
          </div>

          <a
            href="/resume/M.Talha Hassan Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100 transition-colors"
          >
            <Download size={15} />
            Download Resume
          </a>
        </div>
        <Timeline items={experience} />
      </Section>
    </Container>
  );
}
