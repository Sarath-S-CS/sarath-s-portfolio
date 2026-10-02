import { about, skills } from "@/data/content";

// Section heading used across About, Skills, Projects and Contact.
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

// About + skills. Skills are labelled cards in a responsive grid; each card
// lifts slightly on hover.
export function About() {
  return (
    <>
      <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading eyebrow="About" title="Who I am" />
        <div className="grid max-w-3xl gap-5 text-lg leading-relaxed text-muted-foreground">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading eyebrow="Skills" title="What I work with" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div
              key={group.group}
              className="rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.35)]"
            >
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-muted/40 px-2.5 py-1 text-sm text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
