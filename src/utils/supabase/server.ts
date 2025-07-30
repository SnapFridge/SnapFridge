import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient(admin = false) {
  const cookieStore = await cookies();

  return createServerClient(
    process.env["NEXT_PUBLIC_SUPABASE_URL"]!,
    process.env[admin ? "SUPABASE_SECRET_KEY" : "NEXT_PUBLIC_SUPABASE_KEY"]!,
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
