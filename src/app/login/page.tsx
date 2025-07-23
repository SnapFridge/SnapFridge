"use client";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInAnonymously,
  onAuthStateChanged,
  signInWithPopup,
  linkWithPopup,
} from "firebase/auth";
import { auth } from "@utils/firebaseConfig";
import Button from "@components/Button";

type Provider = GoogleAuthProvider | GithubAuthProvider | "anonymous";

export default function Page() {
  async function signIn(provider: Provider) {
    if (provider === "anonymous") {
      await signInAnonymously(auth);
    } else {
      await signInWithPopup(auth, provider);
    }
  }

  async function linkAnonymous(provider: Exclude<Provider, "anonymous">) {
    if (!auth.currentUser) {
      throw new Error("no auth user found");
    }
    await linkWithPopup(auth.currentUser, provider);
  }

  onAuthStateChanged(auth, (usr) => {
    console.log(usr == null ? "signed out" : usr.displayName);
  });

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
