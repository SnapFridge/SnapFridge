"use client";

import { useEffect } from "react";
import Button from "@components/Button";
import { styled } from "@pigment-css/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container>
      <Title>Something went wrong!</Title>
      <HomeButton
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </HomeButton>
    </Container>
  );
}

const Container = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Title = styled("h1")({});

const HomeButton = styled(Button)({
  marginTop: "12px",
  backgroundColor: "transparent",
  border: "1px solid var(--accent-200)",
  padding: "12px 36px",
  borderRadius: "24px",

  "&:hover": {
    backgroundColor: "var(--gray-100)",
  },
});
