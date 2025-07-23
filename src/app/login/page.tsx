"use client";

import Button from "@components/Button";
import { createClient } from "@utils/supabase/component";

export default function Page() {
  const supabase = createClient();

  return (
    <>
      <h1>Login page</h1>
      <Button
        variant={"primary"}
        onClick={() => {
          supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: "https://snapfridge.netlify.app/snap",
            },
          });
        }}
      >
        Google
      </Button>
      <Button
        variant={"primary"}
        onClick={() => {
          supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
              redirectTo: "https://snapfridge.netlify.app/snap",
            },
          });
        }}
      >
        Github
      </Button>
      <Button
        variant={"primary"}
        onClick={() => {
          supabase.auth.signInAnonymously();
        }}
      >
        Anonymous
      </Button>
    </>
  );
}
