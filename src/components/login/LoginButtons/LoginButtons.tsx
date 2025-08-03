"use client";

import OAuthLoginCards from "@components/login/OAuthLoginCard";
import { styled } from "@pigment-css/react";
import createClient from "@utils/supabase/client";

function LoginButtons() {
  const { auth } = createClient();

  return (
    <Container>
      <AuthButtonList>
        <OAuthLoginCards
          variant="google"
          onClick={() =>
            void auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: location.origin + "/auth",
              },
            })
          }
        />
        <OAuthLoginCards
          variant="github"
          onClick={() =>
            void auth.signInWithOAuth({
              provider: "github",
              options: {
                redirectTo: location.origin + "/auth",
              },
            })
          }
        />
        <OAuthLoginCards variant="anon" onClick={() => void auth.signInAnonymously()} />
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
