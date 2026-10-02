import { profile } from "@/data/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          &copy; {year} {profile.name}
        </p>
        <p>Built with React, Tailwind and TypeScript. No cookies or tracking.</p>
      </div>
    </footer>
  );
}
