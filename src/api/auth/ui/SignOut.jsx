import React from "react";
import { Button } from "@chakra-ui/react";
import { signOutFirebase } from "../authSlice";
import { useDispatch } from "react-redux";
import {useRouter} from "next/navigation";

const SignOut = ({ setAuthenticated }) => {
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
      fontWeight={400}
      colorScheme="teal"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
