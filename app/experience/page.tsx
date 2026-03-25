import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Timeline } from "@/components/ui/Timeline";
import { experience } from "@/data/experience";

export default function ExperiencePage() {
  const years = new Date().getFullYear() - 2018;

  return (
    <Container>
      <Section title="Experience">
        <div className="mb-10">
          <p className="text-3xl font-semibold text-slate-900">
            {years}+ Years of Experience
          </p>
          <p className="text-gray-500">
            Building enterprise software across telecom, healthcare, insurance,
            and SaaS.
          </p>
        </div>
        <Timeline items={experience} />
      </Section>
    </Container>
  );
}
