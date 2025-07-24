import { createClient } from "@utils/supabase/server";
import LoginButtons from "@components/login/LoginButtons";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();

  const {
    //  error,
    data: { user },
  } = await supabase.auth.getUser();
  //if (error) {
  //  throw error;
  //}
  if (user !== null) {
    redirect("/user");
  }

  return <LoginButtons />;
}
