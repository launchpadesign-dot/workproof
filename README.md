# WorkProof

WorkProof is being designed as a fair, shared job-record system for service businesses, workers and customers.

## Files in this repository

- **index.html** — public marketing landing page.
- **app.html** — interactive product/UI prototype using fictional sample data. Role switching, job examples and admin moderation actions are demonstrations only.
- **PRODUCT_AND_ADMIN_PLAN.md** — product requirements, role permissions, Job Passport workflows, admin console plan, security requirements, data model outline and release roadmap.

## Important prototype limitations

This repository is not yet a production SaaS application. The prototype does not provide real user authentication, server-enforced permissions, persistent database storage, real invitations, secure uploads, notifications, payment processing or real admin controls. Demo changes are temporary browser state and should not be treated as job evidence or real approvals.

Do not enter real customer information into the prototype. Before public launch, implement a secure backend, database row-level security, verified authentication, private file storage, audit logging, backups, privacy workflows, and testing.

## Suggested implementation order

1. Review PRODUCT_AND_ADMIN_PLAN.md and confirm the first-release scope.
2. Build the database schema and server-side access policies.
3. Implement sign-up/sign-in, role memberships and secure invitations.
4. Implement quotes, explicit decisions, append-only job timeline and change requests.
5. Add private attachments, completion reviews, concerns and notifications.
6. Build the real admin console with MFA, reason-required actions, audit log and appeals.
7. Run cross-account authorization/security tests and backup/restore tests.
8. Deploy only after the production security, privacy and support checklist is complete.
