"use client";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithRedirect,
  linkWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "@utils/firebaseConfig";
import Button from "@components/Button";
import { useEffect } from "react";

type Provider = GoogleAuthProvider | GithubAuthProvider | "anonymous";

export default function Page() {
  async function signIn(provider: Provider) {
    if (provider === "anonymous") {
      await signInAnonymously(auth);
    } else {
      await signInWithRedirect(auth, provider);
    }
  }

  async function linkAnonymous(provider: Exclude<Provider, "anonymous">) {
    if (!auth.currentUser) {
      throw new Error("no auth user found");
    }
    await linkWithRedirect(auth.currentUser, provider);
  }

  async function printAuthRes() {
    const usr = await getRedirectResult(auth);
    if (usr) {
      console.log(usr);
    }
  }
  useEffect(() => void printAuthRes(), []);
  return (
    <>
      <h1>Login page</h1>
      <Button variant={"primary"} onClick={() => signIn(new GoogleAuthProvider())}>
        Google
      </Button>
      <Button variant={"primary"} onClick={() => signIn(new GithubAuthProvider())}>
        Github
      </Button>
      <Button variant={"primary"} onClick={() => signIn("anonymous")}>
        Anonymous
      </Button>
    </>
  );
}
