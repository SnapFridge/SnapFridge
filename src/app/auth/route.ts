import { createClient } from "@utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  function errorRedirect(error: string) {
    const params = new URLSearchParams({
      error,
    }).toString();
    redirect(`/login?${params}`);
  }

  // Happens when this endpoint is recalled with error
  const recallError = searchParams.get("error");
  if (recallError) {
    errorRedirect(recallError);
  }

  const code = searchParams.get("code");
  if (!code) {
    errorRedirect("Need code to authenticate");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code!);
  if (error) {
    errorRedirect(error.message);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Add row for saved_recipe, won't update if already present
  await supabase.from("saved_recipes").insert({ id: user!.id, recipes: [] });

  redirect("/dashboard");
}
