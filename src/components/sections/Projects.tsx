import { BorderBeamPanel } from "@/components/ui/border-beam-panel";
import { projects } from "@/data/content";

// Three project cards in a grid. Each card is a BorderBeamPanel: a dark panel
// with a light that travels its border and speeds up on hover/focus.
export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Projects
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          What I've built and done
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <BorderBeamPanel
            key={project.title}
            beams={2}
            thickness={2}
            radius={18}
            glow
            colors={["#1f8fff", "#22d3ee"]}
            className="!bg-card p-0"
          >
            <div className="flex h-full flex-col p-6">
              <h3 className="font-display text-xl font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {project.cta}
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path
                    d="M5 2.5h6.5V9M11 3L3 11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </BorderBeamPanel>
        ))}
      </div>
    </section>
  );
}
