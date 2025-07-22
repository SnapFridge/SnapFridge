"use client";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  onAuthStateChanged,
  linkWithPopup,
} from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";

interface Provider {
  provider: "google" | "github";
}

export default function Page() {
  // todo: maybe move this into its own component, GoogleSignIn.tsx ?
  async function GoogleSignIn() {
    const provider = new GoogleAuthProvider();

    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res.user.displayName);
    } catch (e) {
      console.error(e);
    }
  }

  async function GithubSignIn() {
    const provider = new GithubAuthProvider();

    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res.user.displayName);
    } catch (e) {
      console.error(e);
    }
  }

  async function AnonSignIn() {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      console.error(e);
    }
  }

  async function ConvertAnonToPermanent(provider: Provider) {
    if (!auth.currentUser) {
      throw new Error("no auth user found");
    }

    let authProvider;

    // todo: handle error of auth credential already in use
    switch (provider.provider) {
      case "google":
        authProvider = new GoogleAuthProvider();
        try {
          const res = await linkWithPopup(auth.currentUser, authProvider);
        } catch (e) {
          throw e;
        }
        break;

      case "github":
        authProvider = new GithubAuthProvider();
        try {
          const res = await linkWithPopup(auth.currentUser, authProvider);
        } catch (e) {
          throw e;
        }
        break;
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      console.log("signed out");
    }
  });

  return (
    <>
      <h1>login page</h1>
      <button onClick={GoogleSignIn}>google sign in</button>
      <button onClick={GithubSignIn}>github sign in</button>
      <button onClick={AnonSignIn}>sign in anonymously</button>
    </>
  );
}
