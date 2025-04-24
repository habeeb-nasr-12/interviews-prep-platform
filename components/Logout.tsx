
"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/client";
import { Button } from "@/components/ui/button";
import { clearCookies } from "@/lib/actions/auth.action";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await clearCookies()
      router.replace("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className="rounded-lg cursor-pointer bg-red-500 text-white hover:bg-red-600"
    >
      Logout
    </Button>
  );
}
