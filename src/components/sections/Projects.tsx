import { BeamBorder } from "@/components/ui/border-beam";
import { projects } from "@/data/content";

// Project cards, each wrapped in an animated BeamBorder (a light that travels
// the card's border). Four cards sit in a two-column grid on larger screens.
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

      <div className="grid items-stretch gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <BeamBorder
            key={project.title}
            size="md"
            colorVariant="colorful"
            theme="dark"
            active
            strength={1}
            duration={6.3}
            beamWidth={1}
            backgroundColor="#0b1324"
            className="h-full"
          >
            <div className="flex h-full flex-col">
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

              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {project.cta ?? "View project"}
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
              )}
            </div>
          </BeamBorder>
        ))}
      </div>
    </section>
  );
}
