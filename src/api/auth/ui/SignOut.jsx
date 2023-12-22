'use client'
import React from "react";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { signOutFirebase } from "../authSlice";
import { useDispatch } from "react-redux";
import {useRouter} from "next/navigation";

const SignOut = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  async function handleSignOut() {
    try {
      await dispatch(signOutFirebase());
      router.push("/");
    } catch (error) {
      throw error;
    }
  }

  return (
    <Button
      size={["sm", "md"]}
      fontSize={"sm"}
      fontWeight={400}
      color={'black'}
      variant={"solid"}
      onClick={handleSignOut}   
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
