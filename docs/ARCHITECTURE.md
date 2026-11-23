# Architecture

## Application
A modular monolithic Next.js 16 application using the App Router. Do not split services into microservices at launch.

## Stack
- Next.js 16, React, TypeScript
- Tailwind CSS v4, shadcn/ui
- Supabase PostgreSQL
- Supabase Auth and Storage when required
- Prisma ORM 7 with PostgreSQL driver adapter
- Vercel for hosting after deployment setup
- Playwright for browser testing

## Data access
- Prisma is the default server-side data access layer.
- Supabase Auth is the identity provider.
- Never expose database connection strings or service-role keys in client code.
- Use Supabase RLS for tables accessed through Supabase client APIs.
- Define and test tenant/ownership authorization before adding multi-customer data.

## Environments
- Local development
- Preview/staging
- Production

Use separate Supabase projects for production and non-production when the application begins storing real customer data. Never run development migrations against production.

## Database connection conventions
- `DATABASE_URL`: application runtime connection. Use Supabase transaction pooler for serverless runtime where appropriate.
- `DIRECT_URL`: migration/administrative connection. Use Supabase session pooler or direct connection as supported by the deployment network.
- Confirm the pooler mode and ports in the Supabase Connect panel; do not guess or paste credentials into chat.

## Route organization (target)
- `src/app/(marketing)/...` public pages
- `src/app/(auth)/...` authentication flows (later sprint)
- `src/app/(dashboard)/...` customer/admin surfaces (later sprint)
- `src/components/` shared UI
- `src/features/` business domains
- `src/lib/` integrations, database, validation
- `prisma/` schema and migrations
- `docs/` product and engineering documentation
- `tests/` browser and integration tests

## Security baseline
- Server-side authorization for every protected operation.
- Input validation at API/server-action boundaries.
- Rate-limit public enquiry endpoints before production.
- Add spam protection and privacy notice before collecting personal information.
- Do not store payment card data.
