# WorkProof — Full Product and Admin Plan

**Status:** Product specification for the first real release  
**Product promise:** Clear work. Clear records. Better working relationships.  
**Initial market:** South African service businesses, independent workers, and their customers  
**Primary job types:** Plumbing, electrical work, building, painting, cleaning, repairs, maintenance, installations and similar services

## 1. Product principles

1. **Fairness by design:** WorkProof records what each side says, agrees to, changes, and disputes. It does not automatically decide who is right.
2. **A clear source of truth:** Each job has one chronological Job Passport.
3. **Explicit consent:** A quote or change is not marked accepted until the intended person takes an explicit action.
4. **History matters:** Important records are versioned. An approved quote must not be silently overwritten.
5. **Privacy by default:** People only see jobs and information they are authorized to access.
6. **Human review:** Reports and complaints have a review process, appeal path, and documented outcome.
7. **Accessible and simple:** Mobile-first, plain language, low-bandwidth friendly, accessible controls and useful empty states.
8. **No false guarantees:** Do not promise that WorkProof prevents lawsuits, guarantees payment, or makes records automatically court-proof.

## 2. Roles and permissions

### A. Customer
A customer can:
- Create an account and manage their profile.
- Start a job invitation or join through a secure invitation.
- Review a business profile and quote.
- See the agreed scope, included/excluded work, price, dates and terms.
- Accept, decline or ask a question about a quote.
- See job updates, notes and permitted photos.
- Request a change or respond to a proposed change.
- See a change's proposed price/time impact and approve or decline it.
- Record completion feedback and raise a concern.
- Download or request an export of their own job record.
- Report abuse, incorrect information or a privacy concern.
- Close their account or request deletion, subject to lawful retention requirements.

A customer cannot:
- Change a worker's or business's original record.
- See other customers' jobs, private worker notes, or internal admin notes.
- Edit an already accepted quote as if the original terms never existed.
- Remove evidence or feedback submitted by another participant.

### B. Business owner / manager
A business owner can:
- Create a business profile, service categories, service area and contact details.
- Invite workers and assign roles.
- Create, send, revise and withdraw quotes before acceptance.
- Define scope, exclusions, materials, labour, taxes where applicable, dates and payment milestones.
- Create job records and invite customers.
- Add progress updates, notes and photos.
- Propose change orders with reason, cost and schedule impact.
- Record invoices/payment status and attach receipts where appropriate.
- Mark work ready for review and record customer feedback.
- Export job records and see basic activity summaries.
- Manage business branding and notification preferences.
- Request data export, account closure or business transfer under controlled rules.

A business owner cannot:
- Change an accepted agreement without a new recorded change and the required approvals.
- erase an audit event, customer concern or payment receipt from the history.
- view unrelated businesses' or customers' private records.
- impersonate a customer or worker to create fake approvals.

### C. Worker / technician
A worker can:
- View only jobs assigned to them or explicitly shared with their role.
- See the approved scope, safety notes and scheduled dates relevant to their work.
- Add progress notes, photos and completion details.
- Flag blockers, extra work, customer requests and safety issues.
- Propose a change for the business owner to review.
- See whether a change is pending, approved or declined.
- Record work performed and submit it for review.
- Raise a concern with the business owner or platform support.

A worker cannot:
- Approve price changes on behalf of the customer unless they have a separately authorized role and the workflow explicitly permits it.
- view business-wide financial information unless granted permission.
- delete a customer or business owner's records.
- access jobs they are not assigned to.

### D. Business administrator / manager
A business may delegate limited administration. Permissions should be assignable rather than treating every staff member as an owner:
- **Owner:** billing and business settings, member access, all business jobs.
- **Manager:** jobs, quotes, assignments and customer communication; no ownership transfer or platform settings.
- **Worker:** assigned jobs and permitted updates.
- **Bookkeeper (optional later):** invoices and payment status, limited job details.
- **Read-only auditor (optional later):** view permitted records, no edits.

### E. WorkProof platform administrator (you)
Platform admin tools:
- Search users, businesses, jobs, reports and support tickets by authorized identifiers.
- View account status, verification state, recent activity and abuse flags.
- Suspend, restrict, restore or deactivate an account with a reason.
- Revoke sessions and require a password reset after suspected compromise.
- Review reports, complaints, appeals and privacy requests.
- Disable a compromised invitation link or suspicious account.
- Manage service categories, help content, FAQs, email templates, platform announcements and feature flags.
- Review system health, failed jobs, failed emails, authentication issues and audit events.
- Manage retention policies and process data export/deletion requests.
- Configure support roles and restrict which support staff can access sensitive data.
- Export platform-level operational reports with personal information minimized.
- See admin actions and who performed them.

**Platform admin safeguards:**
- Require MFA for admin accounts.
- Keep a reason and immutable audit event for sensitive admin actions.
- Use least-privilege access; support staff should not automatically get unrestricted access to every job.
- Do not expose passwords, session tokens, API secrets, full payment credentials, or unnecessary private data in admin search results.
- Prefer account suspension/restriction over permanent deletion while a complaint or legal retention obligation is active.
- Provide a review/appeal route for mistaken suspensions.
- Require confirmation for irreversible actions.
- Admin access does not mean silently editing or falsifying a job's history.

## 3. Core information architecture

Public pages:
1. Home / landing page
2. How it works
3. For businesses
4. For customers
5. Job Passport explanation
6. Pricing (only when pricing is decided; do not imply paid plans exist prematurely)
7. Help centre / FAQs
8. Contact and report a concern
9. Privacy notice
10. Terms of service
11. Accessibility statement

Authentication:
12. Sign up
13. Sign in
14. Email verification
15. Password reset
16. MFA / recovery for privileged accounts
17. Invitation acceptance
18. Account recovery

Signed-in product:
19. Role-aware dashboard
20. Jobs list and filters
21. Job Passport details and timeline
22. Quote builder / quote review
23. Change request review
24. Progress update and photo upload
25. Completion review / concern submission
26. Documents and export centre
27. Notifications
28. Profile and privacy settings
29. Business profile and team management
30. Help/support tickets

Platform administration (restricted):
31. Admin overview
32. User and business directory
33. Job lookup with privacy controls
34. Reports and complaints queue
35. Appeals and account actions
36. Support tickets
37. Privacy/export/deletion requests
38. Audit log
39. Content/category settings
40. System health and email delivery
41. Admin team and permission settings
42. Retention and security settings

## 4. Job Passport data and lifecycle

A Job Passport should contain:
- Unique job ID and human-readable reference.
- Customer, business, and assigned workers with role-based access.
- Job address or service location only where needed.
- Initial scope, inclusions, exclusions, quote total, currency, tax treatment and dates.
- Versioned quote documents and clear acceptance/decline timestamps.
- Progress entries with author, time, text and attachments.
- Change requests: reason, proposed scope, cost/time impact, proposer, decision, approver and timestamps.
- Completion submission, customer review and any outstanding concern.
- Invoice references and payment status if payment tracking is enabled.
- Record export history and access/security events where appropriate.

Lifecycle:
1. Draft → 2. Sent for review → 3. Accepted / declined / changes requested → 4. Scheduled → 5. In progress → 6. Change proposed (may occur multiple times) → 7. Ready for review → 8. Completed, or concern raised → 9. Closed/archived.

Rules:
- A change request does not alter accepted terms until the required people approve it.
- Preserve prior versions and show what changed.
- Let participants add a correction note; do not silently rewrite a historical event.
- A concern can remain open after a job is marked complete.
- Closing a job must not prevent a participant from accessing records they are entitled to retain.
- Keep payment status distinct from work completion status.

## 5. Important workflows

### Quote and agreement
- Business creates a quote with line items, scope, exclusions, schedule and validity date.
- Customer receives a secure notification and reviews a human-readable summary.
- Customer can accept, decline or ask a question.
- Acceptance records the quote version and timestamp.
- If the business edits material terms, a new version is created and acceptance is requested again.

### Progress updates
- Assigned worker adds a note and optional photo(s).
- The system records who posted it and when.
- Participants receive notification according to their preferences.
- A participant may flag a privacy concern or ask for a correction without erasing the original event.

### Change orders
- Any authorized participant can request a change.
- The request describes the reason, scope difference, price impact and schedule impact.
- The other required party can approve, decline or ask a question.
- No approval is inferred from silence.
- The Job Passport shows the original agreement and each approved change.

### Completion and dispute
- Business submits the work as ready for review.
- Customer can confirm completion, leave feedback, or raise a concern with details and optional attachments.
- The business can respond.
- The job can be marked complete while a clearly labelled concern remains open, if appropriate.
- WorkProof records the process; it does not issue a legal ruling.

### Complaints and moderation
- Report categories: harassment, fraud concern, impersonation, inaccurate content, privacy/security issue, spam, or other.
- Confirm receipt and provide a case reference.
- Route urgent security/privacy reports to a restricted queue.
- Record reviewer, evidence reviewed, actions, rationale, date and appeal status.
- Avoid automatically treating a report as proof of wrongdoing.

## 6. Admin console specification

### Overview dashboard
- New users and businesses (aggregated)
- Active jobs and recently completed jobs
- Open complaints, urgent reports and overdue support tickets
- Suspended accounts and pending appeals
- Email/authentication/system error indicators
- Recent admin actions

### User/business detail
Show only what is needed: account ID, display name, role, status, verification state, created date, recent activity summary, open reports, and authorized business membership. Mask or omit private fields by default. Sensitive access should be logged.

Actions:
- Warn / contact
- Temporarily restrict a capability
- Suspend account
- Revoke active sessions
- Require re-authentication/password reset
- Restore account
- Start a deletion/export request
- Add an internal admin note (clearly separated from user-visible job records)
- Escalate to another reviewer

Every sensitive action must capture: actor, target, action, reason, timestamp, outcome, and relevant case ID.

### Reports queue
Filters: severity, category, status, age, assigned reviewer, target account, job reference.  
Statuses: new, triaged, investigating, awaiting response, action taken, no violation found, appealed, closed.  
Keep reporter identity private from the reported person unless disclosure is required and appropriate.

### Content and configuration
Admin-editable:
- Public FAQ and help articles
- Service categories and supported job types
- Support contact details
- Email templates and announcement banners
- Feature flags / maintenance mode
- Basic limits and retention settings with safe validation

Do not place arbitrary executable code, raw SQL or secrets in ordinary content-editing fields.

## 7. Security, privacy and South African readiness

Before handling real customers:
- Use a managed authentication system with verified email, secure password reset and MFA for admins.
- Enforce database-level row-level security (RLS); hiding a button in the frontend is not security.
- Separate tenant/business data and verify every membership and job relationship server-side.
- Validate file type and size, use private storage buckets and time-limited signed URLs for job photos/documents.
- Add rate limits, abuse detection, spam controls and secure invitation expiry.
- Keep secrets in server-side environment variables; never commit service-role keys, passwords or tokens to GitHub.
- Back up the database and test restoring it.
- Log sensitive actions while avoiding unnecessary sensitive content in logs.
- Establish privacy notice, retention schedule, incident response, access/deletion request handling and vendor review.
- Design for South Africa's POPIA and Consumer Protection Act requirements with qualified legal guidance before launch.
- Do not claim a digital acknowledgement waives statutory rights or guarantees admissibility in court.
- Make clear whether WorkProof is a recordkeeping tool, not a bank, escrow service, insurer or legal adviser.

## 8. Suggested database model

Initial entities (exact schema to be designed and tested before production):
- profiles: user identity fields and account status; no secrets.
- businesses: business profile and owner.
- business_members: business, user, role, permission state.
- jobs: business, customer, status, location reference and dates.
- job_assignments: job, worker, assignment role and status.
- quotes: job, version, currency, totals, scope snapshot, status, sender and timestamps.
- quote_items: quote line items.
- quote_decisions: quote version, actor, decision, timestamp, comment.
- job_events: append-only timeline events, actor, event type, safe metadata, timestamp.
- change_requests: job, proposer, reason, proposed scope/cost/time, status.
- change_decisions: change request, actor, decision, timestamp.
- attachments: job/event, storage path, content type, size, uploader.
- completion_reviews: job, reviewer, outcome, comment, timestamp.
- concerns: job, reporter, category, description, status and assigned reviewer.
- support_tickets: requester, category, status, messages and assigned support staff.
- notifications: recipient, type, read state, delivery state.
- admin_audit_log: actor, action, target, reason, case reference, timestamp.
- privacy_requests: requester, request type, status, verification and completion timestamps.

Use foreign keys, constraints, indexes, retention rules and RLS policies. Avoid storing duplicate personal data when a reference will do. Avoid a single unrestricted admin table view that exposes all content to all staff.

## 9. Notifications
- Quote received / quote decision
- Change proposed / change decision
- New progress update
- Job ready for review
- Concern or business response
- Invitation and account security events
- Support case updates
- Admin suspension/restoration and appeal outcome

Start with in-app and email notifications. Add SMS/WhatsApp only if there is a clear user need and appropriate consent/cost controls. Allow non-essential notifications to be configured, but keep important security notices enabled.

## 10. Metrics that matter
Measure whether the product is useful, not just whether people click:
- Percentage of jobs with a recorded scope and quote before work begins
- Percentage of material changes with explicit recorded decisions
- Time to receive a quote decision
- Percentage of jobs with progress updates and a completion review
- Number of support cases and median resolution time
- Repeat usage by businesses and customers
- Onboarding completion and reasons people abandon it
- User-reported clarity and fairness

Use aggregated metrics where possible. Do not use complaint volume alone to automatically punish accounts.

## 11. Build roadmap

### Phase 0 — Product and trust foundations
- Confirm the initial audience and core job types.
- Review terms, privacy and retention with appropriate South African legal guidance.
- Finalize permission matrix and abuse/reporting policy.
- Define the first version of the Job Passport.

### Phase 1 — Secure MVP
- Authentication, profile, business and membership roles.
- Create a job and invite a customer.
- Quote creation, versioning and explicit approval.
- Job Passport timeline with progress notes/photos.
- Change requests and approvals.
- Completion review and concerns.
- Basic notifications, export, and platform audit log.
- Minimal admin console: user lookup, reports queue, suspension/restoration, support and audit history.

### Phase 2 — Operational quality
- Better search/filtering, mobile upload improvements, reminders.
- Business team permissions and job templates.
- Customer and business dashboards.
- Data export/deletion workflows, backup/restore tests, security review.
- Accessible help centre and support workflow.

### Phase 3 — Only after validation
- Invoices and payment integrations (separate from work approval).
- Recurring jobs, richer reports, multi-branch businesses.
- Additional countries, currencies and localization.
- Integrations requested by actual users.

## 12. Acceptance checklist before public launch
- Customer A cannot read Customer B's job, even by changing a URL or API request.
- Worker A cannot access unassigned jobs.
- Business A cannot access Business B's records.
- Admin actions are logged and admin access is restricted.
- Accepted quotes and approved changes cannot be silently overwritten.
- Both parties can view the relevant history and record concerns.
- Uploads are private and access-controlled.
- Password reset, invitation expiry, MFA for admins and session revocation work.
- Data export, deletion requests, retention and backup restoration are tested.
- Mobile, keyboard navigation, screen-reader labels and reduced motion are checked.
- No fake testimonials, invented live activity, misleading legal guarantees or pretend payment confirmations appear.
- Early access forms are only enabled after their data handling and permissions are verified.
- Terms, privacy notices, support contact and incident response are ready.

## 13. Current implementation status

The repository currently contains a static landing page (index.html). This document is a product specification, not proof that authentication, a database, file uploads, email notifications, payments, admin tools or production security have been implemented. Those require a backend, database policies, integration configuration and testing before real customer data is accepted.
