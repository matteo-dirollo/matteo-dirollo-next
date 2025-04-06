"use client";
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@heroui/react";
import { useDispatch } from "react-redux";
import { closeModal } from "@/components/ui/modals/modalSlice";

const ModalWindow = ({ children, header, modalFooter, size }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    // You might want to add logic here to handle modal opening animations or other effects
    // when the modal is mounted.
  }, []);

  return (
    <Modal
      isOpen={true} // The modal is always open when this component is rendered
      onClose={handleClose}
      size={size}
      backdrop="blur"
    >
      <ModalContent>
        {header && (
          <ModalHeader className="flex flex-col gap-1">
            {header}
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
        {modalFooter && (
          <ModalFooter>
            {modalFooter}
            <Button color="danger" variant="light" onPress={handleClose}>
              Close
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalWindow;
