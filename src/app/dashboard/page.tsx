import { redirect } from "next/navigation";
import { createClient } from "@utils/supabase/server";
import LogoutButton from "@components/dashboard/LogoutButton";

export default async function Page() {
  const { auth } = await createClient();
  const {
    error,
    data: { user },
  } = await auth.getUser();
  if (error || user === null) {
    redirect("/login");
  }

  return (
    <>
      <p>Hello {user.id}</p>
      <LogoutButton />
    </>
  );
}
