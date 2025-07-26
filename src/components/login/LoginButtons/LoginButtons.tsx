"use client";

import OAuthLoginCards from "@components/login/OAuthLoginCards";
import { styled } from "@pigment-css/react";
import { createClient } from "@utils/supabase/client";

function LoginButtons() {
  const supabase = createClient();

  return (
    <Container>
      <AuthButtonList>
        <OAuthLoginCards
          variant="google"
          onClick={() =>
            void supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: snapURL,
              },
            })
          }
        />
        <OAuthLoginCards
          variant="github"
          onClick={() =>
            void supabase.auth.signInWithOAuth({
              provider: "github",
              options: {
                redirectTo: snapURL,
              },
            })
          }
        />
        <OAuthLoginCards
          variant="anon"
          onClick={() => void supabase.auth.signInAnonymously()}
        />
      </AuthButtonList>
    </Container>
  );
}

const Container = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const AuthButtonList = styled("ul")({
  borderRadius: "12px",
  width: "min(400px, 100%)",
  height: "400px",
  border: "2px solid var(--gray-200)",

  padding: "24px 36px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "18px",
});

export default LoginButtons;
