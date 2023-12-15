import config from "@/config";
import app from "./app";
import { sendSignInLinkToEmail, signInWithPopup, getAuth, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";

const auth = getAuth(app);

const actionCodeSettings = {
  url: config.firebase.signInLinkRedirectUrl,
  handleCodeInApp: true
}

export async function signInWithLink(email: string): Promise<any> {
  let result = null,
    error = null;
  try {
    result = await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    console.warn('Failed to login with Google', e);
  }
}

export async function signInWithTwitter() {
  const provider = new TwitterAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    console.warn('Failed to login with Twitter', e);
  }
}