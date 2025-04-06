'use client';
import React from 'react';
import Link from 'next/link';
import AdminItem from './AdminItem';
import { AdminItems } from './AdminItems';
import EmmeLogo from '../../../../public/EmmeLogo';
import { Button } from '@heroui/react';

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 w-full md:w-60 fixed h-full ${rest.className}`}
      >
        <div className="h-20 flex items-center mx-8 justify-between">
          <Link href="/">
            <EmmeLogo width={30} height={30} />
          </Link>
          <Button
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
            variant="light"
            className="md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
        {AdminItems.map((item) => (
          <AdminItem
            onClose={onClose}
            link={item.to}
            key={item.label}
            icon={item.icon}
          >
            {item.label}
          </AdminItem>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-60">
        {/* Your main content will go here */}
      </div>
    </div>
  );
};

export default SidebarContent;
