import { createServerClient } from "@supabase/ssr";
import { createClient as supabaseCreateClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { type Database } from "./database";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env["NEXT_PUBLIC_SUPABASE_URL"]!,
    process.env["NEXT_PUBLIC_SUPABASE_KEY"]!,
    {
      cookieEncoding: "raw",
      cookieOptions: {
        sameSite: "lax",
        secure: true,
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookies) {
          try {
            for (const { name, value, options } of cookies) {
              cookieStore.set(name, value, options);
            }
          } catch {}
        },
      },
    }
  );
}

export function createAdminClient() {
  return supabaseCreateClient<Database>(
    process.env["NEXT_PUBLIC_SUPABASE_URL"]!,
    process.env["SUPABASE_SECRET_KEY"]!,
    {
      auth: {
        detectSessionInUrl: false,
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
