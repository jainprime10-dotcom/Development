# Event Experiences Platform — Foundation

This is the foundation overlay for the new private repository.

1. Scaffold the Next.js application first.
2. Copy the files from this kit into the matching paths in the project.
3. Merge `.gitignore.append` into `.gitignore` (do not replace existing Next.js entries).
4. Install Prisma 7 dependencies and run `npx prisma generate`.
5. Add local Supabase connection strings to `.env`; never commit it.
6. Review `AGENTS.md`, `CLAUDE.md` and the documents in `docs/`.

Important: Prisma 7 requires a PostgreSQL driver adapter and generated client output. `DATABASE_URL` is for runtime; `DIRECT_URL` is for Prisma CLI migrations.
