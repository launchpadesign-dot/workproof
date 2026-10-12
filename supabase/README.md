# WorkProof Supabase backend

**Connected project:** `jerovakpjfcvhxsdethg` (Workproof, EU North).  
**Current database status:** beta schema applied; no production customer data should be entered yet.

## Applied database migrations

The following migrations are recorded in the connected Supabase project's migration history:

- `20261011100016_workproof_core_schema`
- `20261012073912_workproof_participants_invites_and_security`
- `20261012073955_workproof_approval_decisions`
- `20261012074140_fix_approval_response_status_mapping`
- `20261012074306_workproof_admin_audit_and_concern_review`
- `20261012074454_enforce_workproof_account_suspensions`
- `20261012074557_workproof_admin_guard_and_indexes`
- `2026101207xxxx_tighten_invitation_guard_and_admin_indexes` (latest migration version is visible in Supabase migration history)

The live schema was applied through the authenticated Supabase integration. The SQL for these operations has not yet been consolidated into clean, local CLI-generated migration files, so **do not use this repository as a second-environment migration source yet**. Before staging/production environments are added, pull the live schema into formal migrations, review them, and test applying them to a fresh development branch.

## Tables

- `profiles` — user-facing profile fields; profile role is not an admin permission.
- `jobs` — job details and status, owned by one account.
- `job_participants` — membership for invited customers/workers.
- `job_invitations` — hashed, single-use invitation tokens; direct client access is denied.
- `job_updates` — append-only timeline notes and progress updates.
- `job_activity_events` — append-only system/job events.
- `job_approvals` and `job_approval_decisions` — approval request and decision records.
- `job_change_requests` — proposed scope/price/schedule changes.
- `job_evidence` — attachment metadata only; secure upload/storage is not enabled yet.
- `job_concerns` — participant-raised concerns and moderation status.
- `platform_admins` — private administrator allowlist, no direct client access.
- `admin_audit_log` — private record of moderation actions.
- `workproof_account_status` — private active/suspended state used by row-level security.
- `early_access_requests` — public early-access form submissions with restricted insert policy.

## Important functions

- `create_job_invitation` — owner-only invitation creation, stores token hashes.
- `accept_job_invitation` — verifies signed-in email, expiry and one-time token use.
- `respond_to_job_approval` — checks invited approver identity and records an explicit decision.
- `is_platform_admin`, `admin_list_concerns`, `admin_update_concern` — gated admin checks/review.
- `is_workproof_account_active` — RLS helper for the suspension lock.

The privileged RPCs use a fixed empty search path, qualified object names, restrictive grants, and explicit authorization checks. Supabase's advisor still flags security-definer functions exposed to authenticated callers; review each warning before launch. The no-policy notices on invitations, the admin roster, decisions and audit log are intentional: client roles must not read/write those tables directly.

## Edge Function

`workproof-admin` is deployed with JWT verification enabled. Source lives at `supabase/functions/workproof-admin/index.ts`. It checks the signed-in user and the private admin roster before listing accounts or suspending/restoring account access. It writes database suspension status as well as a Supabase Auth ban so existing access tokens are blocked by RLS.

## Admin provisioning

Do not grant admin access based on profile role, user metadata, or an unverified email. First have the intended owner create and confirm a WorkProof account, then add that exact Auth user ID to `public.platform_admins` through a trusted database/admin channel. Do not expose service-role credentials in HTML, GitHub, or chat.
