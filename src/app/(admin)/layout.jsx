"use client";
import React from "react";
import AdminSidebar from "@/components/layout/AdminSidebar/AdminSidebar";
import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
import "@/components/ui/lexicalEditor/ui/Button.css";
import "@/components/ui/lexicalEditor/ui/ContentEditable.css";
import "@/components/ui/lexicalEditor/ui/Dialog.css";
import "@/components/ui/lexicalEditor/ui/Input.css";
import "@/components/ui/lexicalEditor/ui/Modal.css";
import "@/components/ui/lexicalEditor/nodes/ImageNode.css";
import "@/components/ui/lexicalEditor/styles.css";

export default function AdminLayout({ children }) {
  const isAdmin = useSelector((state) => state.auth.currentUser);
  //   const isAdmin =  await store.getState().auth.currentUser.role === "admin";
  //   const router = useRouter();

  console.log(isAdmin);
  //   if (!isAdmin) {
  //     router.push("/");
  //     return null;
  //   }
  return <AdminSidebar>{children}</AdminSidebar>;
}
