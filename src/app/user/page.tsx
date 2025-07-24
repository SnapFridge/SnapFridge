import { redirect } from "next/navigation";
import { createClient } from "@utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const {
    //  error,
    data: { user },
  } = await supabase.auth.getUser();
  //if (error) {
  //  throw error;
  //}
  if (user === null) {
    redirect("/login");
  }

  return <p>Hello {user.id}</p>;
}
