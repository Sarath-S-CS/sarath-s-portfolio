import { useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { profile } from "@/data/content";

// Contact form wrapped in an animated BorderBeam. The site is static (GitHub
// Pages has no backend), so submitting opens the visitor's email client with
// the message pre-filled, addressed to Sarath. The address is also shown as
// selectable text with a copy button as a fallback.
export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio enquiry from ${form.name || "a visitor"}`;
    const body = `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked; leave the address visible for manual copy.
    }
  };

  const fieldClass =
    "w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary";

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Contact
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Get in touch
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Looking for hands-on cloud security, identity or vulnerability
          management roles in Ireland: on-site, hybrid or remote.
        </p>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* Direct links, in case someone would rather not use the form. */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="text-lg font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="flex gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>

        <BorderBeam size="md" colorVariant="colorful">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm text-muted-foreground">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={update("message")}
                placeholder="What would you like to talk about?"
                className={`${fieldClass} resize-y`}
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.02] hover:bg-primary/90"
            >
              Send message
            </button>
            <p className="text-xs text-muted-foreground/80">
              Opens your email app with the message ready to send.
            </p>
          </form>
        </BorderBeam>
      </div>
    </section>
  );
}
