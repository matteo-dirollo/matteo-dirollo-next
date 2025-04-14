'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { socialLogin } from '@/api/auth/authSlice';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { closeModal } from '@/components/ui/modals/modalSlice';
import { Button } from '@heroui/react';

const SocialLogin = () => {
  const dispatch = useDispatch();

  const handleSocialLogin = (provider) => {
    dispatch(closeModal());
    dispatch(socialLogin(provider));
  };

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <Button
        onPress={() => handleSocialLogin('google')}
        startContent={<FaGoogle />}
        className="bg-red-400 w-full"
        variant="solid"
        size="md"
      >
        Login with Google
      </Button>
      <Button
        onPress={() => handleSocialLogin('facebook')}
        startContent={<FaFacebook />}
        className="bg-blue-400 w-full"
        variant="solid"
        size="md"
      >
        Login with Facebook
      </Button>
    </div>
  );
};

export default SocialLogin;
