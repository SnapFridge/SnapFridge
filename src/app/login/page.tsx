"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";

export default function Page() {
  // todo: maybe move this into its own component, GoogleSignIn.tsx ?
  async function GoogleSignIn() {
    const provider = new GoogleAuthProvider();

    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res.user.displayName);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h1>login page</h1>
      <button onClick={GoogleSignIn}>google sign in</button>
    </>
  );
}
