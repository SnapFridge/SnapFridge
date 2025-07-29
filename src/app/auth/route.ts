import { createClient } from "@utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = url.origin.replace("localhost", "127.0.0.1");
  function errorRedirect(error: string) {
    const params = new URLSearchParams({
      error,
    }).toString();
    redirect(origin + "/login" + params);
  }
  const code = url.searchParams.get("code");
  if (!code) {
    errorRedirect("Need code to authenticate");
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code!);
  if (error) {
    errorRedirect(error.message);
  }
  redirect(origin + "/dashboard");
}
