import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { featuredProjects } from "@/data/projects";
import { ProjectModal } from "./projects/ProjectModal";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="py-10 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-1 items-center gap-16">
            {/* Left */}
            <FadeIn>
              <div>
                <div className="flex items-center gap-3">
                  <Image
                    src="/talha.png"
                    alt="Talha Hassan"
                    width={80}
                    height={80}
                    className="relative rounded-full shadow-xl"
                  />
                  <h1 className="text-6xl font-bold tracking-tight text-slate-900">
                    {profile.name}
                  </h1>

                  <a href={profile.linkedin} target="_blank">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white translate-y-1">
                      <BadgeCheck className="w-4 h-4" />
                    </span>
                  </a>
                </div>
                {/* </FadeIn> */}

                {/* <FadeIn> */}
                <p className="mt-4 text-2xl text-slate-600">{profile.role}</p>
                {/* </FadeIn> */}

                {/* <FadeIn> */}
                <p className="mt-6 max-w-6xl text-lg leading-relaxed text-slate-700">
                  {profile.summary}
                </p>
                {/* </FadeIn> */}

                <div className="mt-10 flex gap-4">
                  <Link href="/contact">
                    <Button>Get in touch</Button>
                  </Link>

                  <Link href="/projects">
                    <Button variant="outline">View Projects</Button>
                  </Link>
                </div>

                <p className="mt-6 text-sm text-slate-400">
                  Based in Karachi • Open to remote opportunities
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-gray-50 py-10">
        <FadeIn>
          <Container>
            <Section title="Featured Projects">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProjects.map((project, i) => (
                  <FadeIn key={project.title} delay={i * 0.1}>
                    <ProjectModal key={project.title} project={project} />
                  </FadeIn>
                ))}
              </div>
            </Section>
          </Container>
        </FadeIn>
      </section>
    </div>
  );
}
