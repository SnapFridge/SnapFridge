import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env["NEXT_PUBLIC_SUPABASE_URL"]!,
    process.env["NEXT_PUBLIC_SUPABASE_KEY"]!,
    {
      cookieEncoding: "raw",
      cookieOptions: {
        sameSite: "lax",
        secure: true,
      },
      auth: {
        flowType: "pkce",
      },
    }
  );
}
