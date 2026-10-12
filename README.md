# WorkProof

WorkProof is being designed as a fair, shared job-record system for service businesses, workers and customers.

## Files in this repository

- **index.html** — public marketing landing page.
- **app.html** — interactive product/UI prototype using fictional sample data. Role switching and sample admin actions are demonstrations only.
- **workspace.html** — Supabase-backed beta workspace for accounts, jobs, Job Passports, timeline notes, invitations, quote approvals, change requests and concerns.
- **admin.html** — restricted platform-admin console for account suspension/restoration, concern review and the admin audit log. Access requires an explicitly provisioned platform-admin account.
- **supabase/functions/workproof-admin/index.ts** — source for the protected Supabase Edge Function used by the admin console.
- **PRODUCT_AND_ADMIN_PLAN.md** — product requirements, role permissions, Job Passport workflows, admin console plan, security requirements, data model outline and release roadmap.

## Important prototype limitations

This repository is still a beta, not a production-ready SaaS. `workspace.html` is wired to the WorkProof Supabase project, and the core schema/RLS policies and `workproof-admin` Edge Function have been applied. The browser app has not yet been tested end-to-end with multiple real accounts, and the Vercel deployment could not be verified. The original `app.html` remains a demo. Secure photo uploads, email delivery for invitations, notifications, formal appeals, data exports, payments and legal/privacy launch review are not complete.

Do not enter real customer information into the prototype. Before public launch, implement a secure backend, database row-level security, verified authentication, private file storage, audit logging, backups, privacy workflows, and testing.

## Suggested implementation order

1. Complete end-to-end tests with separate owner and customer accounts, including wrong-email/expired/reused invitations.
2. Provision the platform owner in `public.platform_admins` only after confirming the exact account email.
3. Test suspend/restore against existing sessions and verify the RLS suspension lock.
4. Add secure private photo uploads and email delivery for invitations.
5. Add formal appeals, data export/deletion requests, notifications and account recovery.
6. Enforce MFA for administrators and add a second-person review for severe moderation actions.
7. Resolve Vercel project access and verify the latest GitHub commit deploys successfully.
8. Complete POPIA/Consumer Protection Act review, backup/restore tests and cross-account authorization tests before public launch.
