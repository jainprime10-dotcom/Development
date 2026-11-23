# Claude Code Instructions

Start by reading `AGENTS.md` and the three documents in `docs/`.

Treat `AGENTS.md` as mandatory shared engineering policy. Do not contradict it.

Before coding:
1. Summarize the requested outcome.
2. Inspect relevant files and existing patterns.
3. Propose a short implementation plan for multi-file or architectural changes.
4. Identify any required secrets, external setup, or schema changes.

While coding:
- Follow the approved Figma frames and design tokens.
- Prefer accessible, reusable components over one-off markup.
- Keep server-only code separate from client components.
- Do not guess brand identity, business claims, package prices, or legal policies.
- Ask before destructive database operations or major dependency/architecture changes.

After coding:
- Run lint, typecheck, and relevant tests.
- Review the diff for secrets, dead code, accessibility and responsive regressions.
- Summarize files changed, checks run, and remaining manual steps.
