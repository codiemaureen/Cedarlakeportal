# Cedar Lake Forms — Phase 1

Mobile-first employee portal for Cedar Lake Carpentry.

## Included
- Individual email/password employee sign-in (no public signup)
- Supabase SSR session refresh and protected dashboard
- Active employee profile check with row-level security
- Mobile-friendly home screen with PO, VPO and history placeholders

**Not yet implemented:** PO/VPO data-entry forms, PDF generation, automated email, submission history, and admin tools.

## Setup
1. Install Node.js 22+ and run `npm install`. Commit the generated `package-lock.json` after validation.
2. Copy `.env.example` to `.env.local`. Fill in Supabase Project URL and **publishable key** from your Supabase project. Never commit your secret or service-role key.
3. Review and execute `supabase/phase1.sql` in the Supabase SQL Editor.
4. Create employee accounts in Supabase Authentication > Users with email/password, then insert matching user UUIDs and names into `public.profiles`. Do not expose user creation on the client.
5. Run `npm run dev` and open http://localhost:3000.
6. Validate with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Security
- Employee accounts are provisioned by the office; public signup is not offered.
- Server dashboard requires valid identity and active employee profile.
- RLS restricts each employee to their own profile.
- Always authorize future submission actions server-side; do not rely on protected UI alone.

Use Node.js 22 for current development. Set the same public environment variables on Vercel before deployment.
