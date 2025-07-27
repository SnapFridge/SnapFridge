import { redirect } from "next/navigation";
import { createClient } from "@utils/supabase/server";
import LogoutButton from "@components/dashboard/LogoutButton";
import { PageMargin } from "@components/Global";
import DeleteButton from "@components/dashboard/DeleteButton";

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
    <PageMargin>
      <p>Hello {user.id}</p>
      <DeleteButton />
      <LogoutButton />
    </PageMargin>
  );
}
