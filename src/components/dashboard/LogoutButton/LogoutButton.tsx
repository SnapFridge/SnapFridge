"use client";

import Button from "@components/Button";
import { createClient } from "@utils/supabase/client";
import { redirect } from "next/navigation";

function LogoutButton() {
  const { auth } = createClient();
  return (
    <Button
      variant="secondary"
      onClick={() => void auth.signOut().finally(() => redirect("/login"))}
    >
      Sign out
    </Button>
  );
}

export default LogoutButton;
