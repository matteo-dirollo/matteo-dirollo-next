'use client';
import React, { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from '@heroui/react';
import { CiMenuBurger } from 'react-icons/ci';
import SidebarContent from './SidebarContent';

const AdminSidebar = ({ children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenChange = (open) => {
    setIsDrawerOpen(open);
    onOpenChange(open);
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300 ${
        isDrawerOpen ? 'ml-60' : 'ml-0'
      }`}
    >
      {/* Sidebar for larger screens */}
      <div className="hidden md:block">
        <SidebarContent onClose={() => {}} />
      </div>

      {/* Drawer for smaller screens */}
      <Drawer
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        placement="left"
        size="sm"
        classNames={{
          base: 'bg-white dark:bg-gray-900',
        }}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">{''}</DrawerHeader>
              <DrawerBody>
                <SidebarContent onClose={onClose} />
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/* Mobile Sidebar Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          isIconOnly
          aria-label="Open Sidebar"
          color="default"
          variant="ghost"
          size="md"
          radius="full"
          onPress={onOpen}
        >
          <CiMenuBurger />
        </Button>
      </div>

      {/* Main Content */}
      <div className="p-4 md:pl-0 pt-16">{children}</div>
    </div>
  );
};

export default AdminSidebar;
