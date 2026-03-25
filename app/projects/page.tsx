import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProjectModal } from "./ProjectModal";

export default function ProjectsPage() {
  return (
    <Container>
      <Section title="Projects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.1}>
              <ProjectModal key={project.title} project={project} />
            </FadeIn>
          ))}
        </div>
      </Section>
    </Container>
  );
}
