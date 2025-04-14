'use client'
import React from 'react';
import { useDispatch } from 'react-redux';
import { socialLogin } from '@/api/auth/authSlice';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { closeModal } from '@/components/ui/modals/modalSlice';
import { Button } from '@heroui/react';

const SocialLogin = () => {
  const dispatch = useDispatch();
  const handleSocialLogin = provider => {
    dispatch(closeModal());
    dispatch(socialLogin(provider));
  };
  return (
    <>
      <Button
        onPress={() => handleSocialLogin('google')}
        startContent={<FaGoogle />}
        className='mt-2 bg-red-400'
        minW="100%"
        variant="solid"
        width="100%"
        size="md"
      >
        Login with Google
      </Button>
      <Button
        onPress={() => handleSocialLogin('facebook')}
        startContent={<FaFacebook />}
        className='mt-2 bg-blue-400'
        minW="100%"
        variant="solid"
        width="100%"
        size="md"
      >
        Login with Facebook
      </Button>
    </>
  );
};

export default SocialLogin;
