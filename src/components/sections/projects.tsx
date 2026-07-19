import { projects } from "@/lib/data";
import { ProjectList } from "@/components/project-list";
import { SectionHeading } from "@/components/section-heading";

export function Projects() {
  return (
    <section id="work" className="scroll-mt-24">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <SectionHeading
          label="Selected Work"
          description="A mix of production tools and things I build to learn. Hover any project to preview it."
        />
        <div className="mt-8">
          <ProjectList projects={projects} />
        </div>
      </div>
    </section>
  );
}
