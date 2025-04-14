'use client';
import React from 'react';
import { Button } from '@heroui/react'; // Import HeroUI Button
import { FiMenu } from 'react-icons/fi'; // Keep the FiMenu icon
import EmmeLogo from '../../../../public/EmmeLogo';

const MobileSidebar = ({ onOpen, ...rest }) => {
  return (
    <div
      className="flex items-center justify-start px-4 md:px-24 h-20 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
      {...rest}
    >
      <Button
        isIconOnly
        aria-label="open menu"
        color="default"
        variant="ghost"
        size="md"
        radius="full"
        onPress={onOpen}
      >
        <FiMenu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </Button>
      <div className="p-5">
        <EmmeLogo width={30} height={30} />
      </div>
    </div>
  );
};

export default MobileSidebar;
