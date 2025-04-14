'use client'
import React from "react";
import { signOutFirebase } from "../authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

const SignOut = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleSignOut() {
    try {
      await dispatch(signOutFirebase());
      router.push("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  }

  return (
    <Button
      onPress={handleSignOut}
      className="px-3 py-1 md:px-4 md:py-2 text-sm font-normal"
      size="sm"
      variant="solid"
      color="default"
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
