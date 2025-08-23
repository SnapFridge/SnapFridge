"use client";

import Button from "@components/Button";
import createClient from "@utils/supabase/client";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const { auth } = createClient();
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      onClick={() => auth.signOut().then(() => router.push("/login"))}
    >
      Sign out
    </Button>
  );
}

export default LogoutButton;
