import { isSupabaseConfigured } from "./config";
import { createClient } from "./server";

export type AdminIdentity = {
  id: string;
  email: string;
};

function allowedEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function getAdminIdentity(): Promise<AdminIdentity | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  const id = typeof claims?.sub === "string" ? claims.sub : null;
  const email = typeof claims?.email === "string" ? claims.email.toLowerCase() : null;

  if (!id || !email || !allowedEmails().includes(email)) {
    return null;
  }

  return { id, email };
}

