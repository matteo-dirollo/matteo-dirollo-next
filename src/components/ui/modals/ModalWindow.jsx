"use client";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { closeModal } from "@/components/ui/modals/modalSlice";

const ModalWindow = ({ children, header, modalFooter, size }) => {
  const dispatch = useDispatch();

  return (
    <Modal
      size={size ? size : "md"}
      isCentered
      isOpen={true}
      onClose={() => {
        dispatch(closeModal());
      }}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        {header && <ModalHeader>{header}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody
          borderTopRadius="md"
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          {children}
        </ModalBody>
        <ModalFooter
          borderBottomRadius="md"
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          {modalFooter}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalWindow;
