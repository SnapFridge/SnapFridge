import LoginButtons from "@components/login/LoginButtons";
import LoginError from "@components/login/LoginError";
import { PageMargin } from "@utils";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to SnapFridge to save your recipes. Login with Google or Github.",
};

export default function Page() {
  return (
    <PageMargin>
      <LoginButtons />
      <Suspense>
        <LoginError />
      </Suspense>
    </PageMargin>
  );
}
