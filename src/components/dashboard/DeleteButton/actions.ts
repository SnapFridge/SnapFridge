"use server";

import { createAdminClient } from "@utils/supabase/server";
import { createClient } from "@utils/supabase/client";
import { redirect } from "next/navigation";

export default async function deleteUser() {
  /*
  const supabaseAdmin = createAdminClient();
  const client = createClient();

  const { data: currentUser, error: userError } = await supabaseAdmin.auth.getUser();
  const { data: clientUser, error: clientError } = await client.auth.getUser();

  if (!currentUser || userError || !clientUser || clientError) {
    console.error(currentUser);
    console.error(userError);

    console.error(clientUser);
    console.error(clientError);
    throw new Error("no user");
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
  */

  const supabaseAdmin = createAdminClient();

  const { data: currentUser, error: userError } = await supabaseAdmin.auth.getUser();

  console.log(currentUser);
  console.log(userError);
}
