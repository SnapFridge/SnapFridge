import { auth, db } from "../../utils/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// sign in with popup requires to be in a client component
// todo: change this to use admin sdk
// todo: connect with our db
export default async function GoogleSignIn() {
  const provider = new GoogleAuthProvider();

  try {
    const res = await signInWithPopup(auth, provider);
    console.log(res.user.displayName);
  } catch (e) {
    console.log(e);
  }
}
