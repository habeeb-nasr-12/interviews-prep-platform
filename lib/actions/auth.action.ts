"use server";
import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";
const oneWeek = 60 * 60 * 24 * 7;
export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        error: "user already exists. please sign in ",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
      createdAt: Date.now(),
    });
    return {
      success: true,
      message: "Account created successfully, please sign in.",
    };
  } catch (e: any) {
    console.error(e);
    if (e.code === "auth/email-already-exists") {
      return {
        success: false,
        error: "Email already in use",
      };
    }
    return {
      success: false,
      error: "faild to create an account",
    };
  }
}
export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        error: "user not found ,create an account",
      };
    }
    await setSessionCookie(idToken);
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "failed to sign in",
    };
  }
}
export async function setSessionCookie(idToken: string) {
  const cookiesStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: oneWeek * 1000,
  });
  cookiesStore.set("session", sessionCookie, {
    maxAge: oneWeek,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookiesStore = await cookies();
    const sessionCookie = cookiesStore.get("session")?.value;
    if (!sessionCookie) {
      return null;
    }
    // Verify the session cookie and get decoded claims
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    if (!decodedClaims?.uid) {
      return null;
    }
    // Get user data from database
    const userDoc = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userDoc.exists) {
      return null;
    }

    const userData = userDoc.data();
    if (!userData) {
      return null;
    }
    console.log("user doc data", userDoc?.data);

    return {
      id: userDoc.id,
      ...userData,
    } as User;
  } catch (e) {
    console.error("Error getting current user:", e);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return user !== null;
  } catch {
    return false;
  }
}
