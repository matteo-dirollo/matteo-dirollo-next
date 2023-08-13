"use client";
import React from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/navigation";

const PublicNav = () => {
  const router = useRouter();
  return <>{router.pathname !== "/admin" && <Navbar />}</>;
};

export default PublicNav;
