"use client";
import React from "react";
import { useSelector } from "react-redux";
import SignUp from "@/components/layout/LogModals/SignUp";
import SignIn from "@/components/layout/LogModals/SignIn";
import ShareOnSocials from './../buttons/ShareOnSocials';
import ModifyPost from './../../../app/(admin)/admin/posts/ModifyPost';

export default function ModalManager() {
  const modalLookup = {
    SignIn,
    SignUp,
    ShareOnSocials,
    ModifyPost
  };
  const currentModal = useSelector((state) => state.modals);
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
}
