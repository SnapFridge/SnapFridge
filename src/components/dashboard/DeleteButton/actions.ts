"use server";

import { createAdminClient, createClient } from "@utils/supabase/server";
import { redirect } from "next/navigation";

export default async function deleteUser() {
  const supabaseAdmin = createAdminClient();
  const { auth } = await createClient();

  const { data: clientUser, error: clientError } = await auth.getUser();
  if (!clientUser || clientError) {
    console.error(clientUser);
    console.error(clientError);

    throw new Error("no authenticated user");
  }

  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
    clientUser.user.id
  );

  if (deleteError) {
    throw new Error("failed to delete user");
  }

  const { error: signOutError } = await supabaseAdmin.auth.signOut();
  if (signOutError) {
    throw new Error("failed to sign out user");
  }

  redirect("/login");
}
