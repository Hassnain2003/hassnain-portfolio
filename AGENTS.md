# Working instructions for this portfolio repo

## Environment
- Working directory: `/home/xaidi/Desktop/my Portfolio`
- Node v22.22.1, npm
- Only Chrome available locally (CDP `:9222`); Firefox/WebKit headless unusable
- Remote repo: `https://github.com/Hassnain2003/hassnain-portfolio` (origin, public, MIT)
- Second remote: `https://github.com/Hassnain2003/hassnain-portfolioz` (Vercel-linked)
- Vercel production URL: `https://hassnain-portfolioz.vercel.app/` (HTTP 200)
- `GEMINI_API_KEY` set on Vercel production; NOT committed to repo

## Stack
- Next.js 15.5.29, React 18.3.1, TypeScript, Tailwind CSS v4 (`@tailwindcss/postcss`), ESLint 8.57.0
- Self-hosted fonts vendored to `public/fonts/`; `@font-face` in `src/app/globals.css`; `next/font` removed
- Server mode (not static export); bundle budget relaxed to 450 KB gzipped

## Key files
- `src/app/page.tsx` — home page (hero, projects terminal file browser, system map, experience, skills, about, contact)
- `src/components/project-card.tsx` — `TerminalFileBrowser` (retro `ls -la` style project table; click to cat details)
- `src/app/globals.css` — terminal aesthetic tokens, typewriter blink animation
- `src/data/facts.ts` — single source of truth for bio, projects, experience, leadership, skills, links
- `src/data/case-studies.ts` — real case study data
- `tests/e2e/smoke.spec.ts` — home smoke tests (target `#projects` getByText, dock `getByRole("link", ...)`)
- `tests/e2e/replay.spec.ts` — replay listing page (no traces), missing trace 404
- `tests/e2e/home.spec.ts` — home static HTML smoke
- `scripts/guard-todos.mjs` — TODO guard (fails on real TODOs; 5 legitimate markers expected)
- `scripts/check-bundle-size.mjs` — bundle guard (needs dev server on `:3000`)
- `playwright.config.ts` — Chromium CDP `:9222`

## Commands (run from repo root)
```
npm run lint            # ESLint
npx tsc --noEmit        # TypeScript check
npm test                # Vitest unit tests (9/9)
rm -rf .next && npm run build   # Production build + postbuild guards (todos, bundle, telemetry, sample-trace)
npm run dev             # Start dev server on :3000 (needed for bundle check + e2e)
npx playwright test --timeout 30000 --workers=1   # E2E (9 tests; Chromium CDP :9222)
```

## Bundle check requirements
- `npm run check:bundle-size` fetches chunks from `http://localhost:3000/` — dev server must be running first
- Budget: 450 KB gzipped first-view JS

## Git workflow (always do both)
1. `git add -A`
2. `git commit -m "..."`
3. `git push origin main`
4. `git push hassnain-portfolioz main`

## Vercel deployment
1. Push to `main` on both remotes
2. `npx vercel@latest deploy --prod --yes` (from repo root)
3. Verify: `curl -s -o /dev/null -w "%{http_code}" https://hassnain-portfolioz.vercel.app/` → expect `200`
4. Do NOT use `vercel prod` (unknown command in CLI v65); use `deploy --prod`

## E2E notes
- Dev server must be running on `:3000` before `npx playwright test`
- If port stuck, `fuser -k 3000/tcp` then restart `npm run dev`
- Tests use `__skip_boot=true` query param to skip boot animation
- Dock nav items: `getByRole("link", { name: "projects" })` (section has `aria-label="Projects terminal file browser"` causing strict-mode if using `getByLabel`)
- Projects rendered as terminal table rows (`getByText("AgentDine")`), not headings

## Conventions
- No `agent.os` / `AGENT.OS` / `Agent OS` references anywhere (removed)
- All project data lives in `src/data/facts.ts`; keep `facts.md` in sync
- TODO guard expects exactly 5 legitimate markers; real TODOs fail the build
- No comments added to code unless asked
- Never commit secrets; `GEMINI_API_KEY` only on Vercel