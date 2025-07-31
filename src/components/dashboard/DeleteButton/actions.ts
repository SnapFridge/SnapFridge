"use server";

import { createClient, createAdminClient } from "@utils/supabase/server";
import { redirect } from "next/navigation";

async function deleteUser() {
  console.log("What");
  const { auth: adminAuth } = await createAdminClient();
  const { auth } = await createClient();

  const {
    data: { user },
  } = await auth.getUser();
  const { error: deleteError } = await adminAuth.admin.deleteUser(user!.id);

  if (deleteError) {
    console.log("Failed to delete user");
  }

  const { error: signOutError } = await adminAuth.signOut();
  if (signOutError) {
    console.log("Failed to sign out user");
  }

  redirect("/login");
}

export default deleteUser;
