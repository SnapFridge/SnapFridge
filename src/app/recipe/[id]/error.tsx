"use client";

import Button from "@components/Button";
import { styled } from "@pigment-css/react";
import { PageMargin } from "@utils";
import { useEffect } from "react";

export default function Page({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageMargin>
      <h1>Something went wrong!</h1>
      <HomeButton onClick={reset}>Try Again</HomeButton>
    </PageMargin>
  );
}

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
