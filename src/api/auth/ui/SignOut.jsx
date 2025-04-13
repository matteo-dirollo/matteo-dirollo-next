'use client'
import React from "react";
// Removed Chakra UI imports: import { Button, useColorModeValue } from "@chakra-ui/react";
import { signOutFirebase } from "../authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

// Assuming you might have a custom Button component or want to use a standard button
// If you have a specific HeroUI Button, import it here, e.g.:
// import Button from '@/components/ui/Button'; // Adjust the path as needed

const SignOut = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleSignOut() {
    try {
      await dispatch(signOutFirebase());
      router.push("/");
    } catch (error) {
      console.error("Sign out failed:", error);
      // Optionally re-throw if you want parent components to handle it
      // throw error;
    }
  }

  return (
    <Button
      onPress={handleSignOut}
      className="px-3 py-1 md:px-4 md:py-2 text-sm font-normal"
      size="sm" // If your component supports size props that map to Tailwind
      variant="solid"
      color="default" // If your component has color schemes
    >
      Sign Out
    </Button>
  );

};

export default SignOut;
