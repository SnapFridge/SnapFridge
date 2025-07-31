import { createServerClient } from "@supabase/ssr";
import { createClient as supabaseCreateClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
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

export async function createAdminClient() {
  return supabaseCreateClient(
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
