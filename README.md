# Sarath Surendran: portfolio (React edition)

A single-page portfolio built with **React, TypeScript, Tailwind CSS and the
shadcn project structure**, in a dark-navy / electric-blue theme. The hero uses
an animated canvas wave background; the project cards and contact form use
travelling "border beam" lights. No cookies, analytics or third-party runtime
requests (fonts are self-hosted).

Live target: **https://sarath-s-cs.github.io/sarath-s-portfolio/**

## Run it locally

Needs Node.js 20 or newer.

```bash
npm install
npm run dev      # http://localhost:5173/sarath-s-portfolio/
```

Other scripts:

```bash
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

## Where things live

| Path | What it holds |
|---|---|
| `src/data/content.ts` | **All of the site's text**: profile, bio, skills, projects, nav. |
| `src/components/sections/` | Page sections: `Navbar`, `Hero`, `About` (+ skills), `Projects`, `Contact`, `Footer`. |
| `src/components/ui/` | Reusable shadcn-style components (see below). |
| `src/index.css` | Theme tokens (dark navy + electric blue) and base styles. |
| `tailwind.config.ts` | Tailwind theme, mapping tokens to colour names. |
| `vite.config.ts` | Build config, including the GitHub Pages `base` path. |
| `public/Sarath_Surendran_CV.pdf` | The resume behind the Resume link. |

## The shadcn setup and the `/components/ui` folder

This project already has the shadcn structure wired up: `components.json`, the
`@/*` path alias (to `src/`), `src/lib/utils.ts` (the `cn` helper) and Tailwind.
Components live in **`src/components/ui`** — the default shadcn location. Keeping
third-party UI primitives in one known folder is what lets the shadcn CLI (and
anyone reading the project) find, add and update them in a predictable place,
and keeps them separate from your own page-specific components.

The three provided components are there:

- `ui/wavy-background.tsx` — the animated canvas hero background.
- `ui/border-beam-panel.tsx` — the project cards' lit, orbiting border.
- `ui/border-beam.tsx` — the contact form's animated border. The original of
  this one was **not** included with the brief (only its usage was), so this is
  a compatible clean-room version offering the same
  `<BorderBeam size colorVariant>` API.

### Setting this up from scratch (for reference)

If you were starting a new, empty project rather than using this one:

```bash
npm create vite@latest my-portfolio -- --template react-ts
cd my-portfolio
npm install
npx shadcn@latest init        # choose the defaults; sets up Tailwind + components.json
```

Then install the component dependencies used here:

```bash
npm install simplex-noise clsx tailwind-merge
```

...and copy the files from `src/components/ui` into your own `components/ui`.

## Deploying free on GitHub Pages

Unlike a plain HTML site, this app needs a build step, so it's deployed with a
GitHub Actions workflow (already included at `.github/workflows/deploy.yml`).

1. Push this project to the `main` branch of a **public** GitHub repository.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push any commit to `main` (or run the workflow from the **Actions** tab). The
   workflow builds the app and publishes it. Progress shows under **Actions →
   "Deploy to GitHub Pages"**.
5. The site appears at `https://<username>.github.io/<repository>/`.

If your repository name is not `sarath-s-portfolio`, change the `base` value in
`vite.config.ts` to `/<your-repo-name>/` and commit, or set it to `/` for a
user/organisation page served at the domain root.

## Editing the text later

All copy is in `src/data/content.ts`. Edit it there, commit, and the workflow
redeploys. (Because this is a built app, the text can't be edited through
GitHub's web file editor the way a plain HTML file can — it needs the build.)

## Fonts

Inter and Space Grotesk, self-hosted via `@fontsource`, both under the SIL Open
Font License 1.1.
