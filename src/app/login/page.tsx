import { createClient } from "@utils/supabase/server";
import LoginButtons from "@components/LoginButtons";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/user");
  }

  return <LoginButtons />;
}
