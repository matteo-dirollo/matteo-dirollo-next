'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from './modalSlice';
import { useRouter } from 'next/navigation';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';

export default function UnauthModal() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  return (
    <Modal isOpen={open} onClose={handleClose} backdrop="blur">
      <ModalContent>
        <ModalHeader>
          Please either login or register to see this content
        </ModalHeader>
        <ModalBody>
          <div className="flex justify-center items-center space-x-4">
            <Button
              color="primary"
              onPress={() => {
                dispatch(openModal({ modalType: 'SignIn' }));
              }}
            >
              Sign In
            </Button>
            or
            <Button
              color="secondary"
              onPress={() => {
                dispatch(openModal({ modalType: 'SignUp' }));
              }}
            >
              Sign Up
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          {/* You can add a close button here if needed */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
