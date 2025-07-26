import { createClient } from "@utils/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = url.origin.replace("localhost", "127.0.0.1");
  function errorRedirect(error: string) {
    console.error(error);
    return Response.redirect(origin + "/login");
  }
  const code = url.searchParams.get("code");
  if (!code) {
    return errorRedirect("Need code to authenticate");
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return errorRedirect(error.message);
  }
  return Response.redirect(origin + "/dashboard");
}
