"use client";

import { createClient } from "@utils/supabase/component";
import OAuthLoginCards from "@components/OAuthLoginCards";
import { styled } from "@pigment-css/react";

export default function Page() {
  const supabase = createClient();

  return (
    <>
      <Container>
        <AuthButtonList>
          <li>
            <OAuthLoginCards
              variant="google"
              onClick={() => {
                supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: {
                    redirectTo: "https://snapfridge.netlify.app/snap",
                  },
                });
              }}
            />
          </li>
          <li>
            <OAuthLoginCards
              variant="github"
              onClick={() => {
                supabase.auth.signInWithOAuth({
                  provider: "github",
                  options: {
                    redirectTo: "https://snapfridge.netlify.app/snap",
                  },
                });
              }}
            />
          </li>
          <li>
            <OAuthLoginCards
              variant="anon"
              onClick={() => {
                supabase.auth.signInAnonymously();
              }}
            />
          </li>
        </AuthButtonList>
      </Container>
    </>
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
  width: "fit-content",
  height: "400px",
  border: "2px solid var(--gray-200)",

  padding: "24px 36px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "18px",
});
