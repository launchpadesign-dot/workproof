import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
};

function response(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return response(405, { error: "Use POST." });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return response(500, { error: "Server configuration is incomplete." });
  }

  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return response(401, { error: "Sign in required." });

  const adminClient = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: userData, error: userError } = await adminClient.auth.getUser(token);
  if (userError || !userData.user) return response(401, { error: "Your session is invalid. Sign in again." });
  const actor = userData.user;

  const { data: adminRecord, error: adminError } = await adminClient
    .from("platform_admins").select("user_id").eq("user_id", actor.id).maybeSingle();
  if (adminError || !adminRecord) return response(403, { error: "Platform administrator access required." });

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return response(400, { error: "Send a valid JSON request." }); }

  const action = String(body.action || "");
  if (action === "list_users") {
    const users: Array<Record<string, unknown>> = [];
    for (let page = 1; page <= 20; page++) {
      const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage: 100 });
      if (error) return response(500, { error: "Could not load accounts." });
      const batch = data.users || [];
      users.push(...batch.map((u) => ({
        id: u.id,
        email: u.email || "",
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at || null,
        banned_until: u.banned_until || null,
        email_confirmed_at: u.email_confirmed_at || null,
      })));
      if (batch.length < 100) break;
    }
    const ids = users.map((u) => String(u.id));
    const { data: profiles, error: profileError } = ids.length
      ? await adminClient.from("profiles").select("id,full_name,role,company_name").in("id", ids)
      : { data: [], error: null };
    if (profileError) return response(500, { error: "Could not load account profiles." });
    const byId = new Map((profiles || []).map((p) => [p.id, p]));
    return response(200, { users: users.map((u) => ({ ...u, profile: byId.get(String(u.id)) || null })) });
  }

  if (action === "suspend_user" || action === "restore_user") {
    const targetId = String(body.target_user_id || "");
    const reason = String(body.reason || "").trim();
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(targetId)) {
      return response(400, { error: "Choose a valid account." });
    }
    if (targetId === actor.id) return response(400, { error: "You cannot suspend or restore your own administrator account." });
    if (reason.length < 10 || reason.length > 2000) return response(400, { error: "Enter a reason of at least 10 characters." });
    const { data: targetAdmin, error: targetAdminError } = await adminClient
      .from("platform_admins").select("user_id").eq("user_id", targetId).maybeSingle();
    if (targetAdminError) return response(500, { error: "Could not verify the target account." });
    if (targetAdmin) return response(400, { error: "Administrator accounts cannot be suspended from this screen. Use a separate owner-reviewed process." });

    const { data: updated, error: updateError } = await adminClient.auth.admin.updateUserById(
      targetId,
      { ban_duration: action === "suspend_user" ? "87600h" : "none" },
    );
    if (updateError || !updated.user) return response(400, { error: updateError?.message || "Account update failed." });

    const { error: auditError } = await adminClient.from("admin_audit_log").insert({
      actor_id: actor.id,
      action: action,
      target_user_id: targetId,
      reason,
      details: { email: updated.user.email || null },
    });
    if (auditError) return response(500, { error: "The account was updated, but the audit log could not be saved. Stop and contact support before taking another action." });
    return response(200, {
      ok: true,
      action,
      target_user_id: targetId,
      banned_until: updated.user.banned_until || null,
    });
  }

  return response(400, { error: "Unsupported admin action." });
});
