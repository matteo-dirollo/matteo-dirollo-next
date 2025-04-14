'use client';
import React from 'react';
import { Button } from '@heroui/react'; // Import HeroUI Button
import Link from 'next/link';
import { CiMenuBurger } from 'react-icons/ci'; // Import menu icon
import { IoIosCloseCircleOutline } from 'react-icons/io'; // Import close icon
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../ui/modals/modalSlice';
import SignOut from '@/api/auth/ui/SignOut';
import { ColorModeSwitcher } from '@/components/ui/ColorModeSwitcher';
import EmmeLogo from '../../../../public/EmmeLogo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navbar = () => {
  const { authenticated } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-3 pb-0">
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 text-gray-600 dark:text-white min-h-[60px] py-2 px-4 border-b border-gray-200 dark:border-gray-900">
        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button
            isIconOnly
            aria-label="Toggle Navigation"
            color="default"
            variant="ghost"
            size="md"
            radius="full"
            onPress={handleToggle}
          >
            {isOpen ? (
              <IoIosCloseCircleOutline className="h-6 w-6 text-gray-600 dark:text-gray-200" />
            ) : (
              <CiMenuBurger className="h-6 w-6 text-gray-600 dark:text-gray-200" />
            )}
          </Button>
        </div>

        {/* Logo and Desktop Navigation */}
        <div id='' className="flex flex-1 items-center gap-10">
          <Link href="/" className="flex items-center">
            <EmmeLogo width="60" height="60" />
          </Link>
          <div className="hidden md:flex">
            <DesktopNav />
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="flex flex-row gap-4">
          <ColorModeSwitcher className="hidden" display='none' />
          {authenticated ? (
            <SignOut />
          ) : (
            <>
              <Button
                id="login-button"
                size="md"
                fontSize="sm"
                fontWeight="normal"
                variant="light"
                onPress={() => dispatch(openModal({ modalType: 'SignIn' }))}
              >
                Sign In
              </Button>
              <Button
                size="md"
                fontSize="sm"
                fontWeight="normal"
                color="primary"
                onPress={() => dispatch(openModal({ modalType: 'SignUp' }))}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden p-4">
          <MobileNav onClick={handleToggle} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
