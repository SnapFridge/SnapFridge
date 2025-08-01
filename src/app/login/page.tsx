import LoginButtons from "@components/login/LoginButtons";
import { PageMargin } from "@utils";
import { type Metadata } from "next";

import LoginError from "@components/login/LoginError";

export const metadata: Metadata = {
  title: "Login - SnapFridge",
  description:
    "Login to SnapFridge to save your recipes. Login with Google, Github, or anonymously.",
};

export default function Page() {
  return (
    <PageMargin>
      <LoginButtons />
      <LoginError />
    </PageMargin>
  );
}
