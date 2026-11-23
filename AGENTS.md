# AI Engineering Instructions

## Product
Build a premium event experiences company for India first, with international expansion later. Initial products are the public brand website, wedding and corporate event enquiries, and digital invitation services. Do not invent a final brand name; use `BRAND_NAME_PENDING` until approved.

## Source of truth
- Read `docs/PRODUCT_BRIEF.md`, `docs/ARCHITECTURE.md`, and `docs/SPRINT_01.md` before making material changes.
- `AGENTS.md` is the shared engineering contract for Codex and other coding agents.
- `CLAUDE.md` adds Claude-specific operating instructions and points back here.
- Figma is the design source of truth. Do not invent a new visual direction if an approved Figma frame exists.

## Stack
- Next.js 16 App Router, React, TypeScript
- Tailwind CSS v4 and shadcn/ui
- Supabase PostgreSQL and Supabase Auth
- Prisma ORM 7 with `@prisma/adapter-pg`
- npm as the package manager
- Vercel deployment (when configured)

## Design system
- Warm luxury: ivory, champagne, charcoal.
- Editorial typography, generous whitespace, restrained motion.
- Accessible contrast, keyboard support, responsive layouts.
- Avoid generic SaaS dashboard styling on customer-facing pages.
- Use semantic HTML and mobile-first layouts.
- Use real licensed/original event photography; never imply stock images are our own portfolio.

## Engineering rules
1. Inspect the existing code before editing.
2. Make the smallest coherent change that satisfies the task.
3. Use Server Components by default. Add `use client` only for genuine interactivity.
4. Validate all external input at the server boundary.
5. Never expose service-role keys, database credentials, or private environment variables to the browser.
6. Never bypass authorization checks. Authentication is not authorization.
7. Keep database access server-side through Prisma unless a feature explicitly requires Supabase client APIs.
8. Use migrations for schema changes. Never reset, drop, or truncate a database without explicit approval.
9. Do not put secrets in source control, screenshots, logs, test fixtures, or prompts.
10. Do not add dependencies without explaining why and checking whether an existing dependency solves the problem.
11. Add loading, empty, error, and success states to user-facing workflows.
12. Use accessible labels, focus states, and clear validation messages.
13. Do not add fake testimonials, fake clients, fabricated awards, or unverified claims.
14. Keep SEO metadata, Open Graph metadata, sitemap and robots configuration in scope for public pages.
15. Avoid premature microservices. Keep the first release a modular Next.js application.

## Required checks
Before declaring a task complete, run:
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build` when practical
- Relevant Playwright tests when browser flows change

Report commands run, results, changed files, known limitations, and any manual setup required.

## Git workflow
- Work on a feature branch, not directly on `main`.
- Use focused commits with conventional prefixes (`feat:`, `fix:`, `chore:`, `docs:`).
- Never force-push or rewrite shared history without explicit approval.
- Do not commit `.env`, `.env.local`, credentials, generated build output, or local database files.
- Review diffs before committing.

## Product scope guardrails
- Sprint 01 is brand foundation, design system, responsive marketing website skeleton, and repository/CI setup.
- Do not implement customer authentication, payments, booking engine, guest management, or admin CRM until their requirements are approved in a later sprint.
- Use `BRAND_NAME_PENDING` and neutral copy placeholders until the name and trademark/domain checks are approved.
