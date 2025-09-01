import { decrypt } from "@/lib/sessions";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;

  const payload = await decrypt(cookie);
  return payload?.user || null;
}
