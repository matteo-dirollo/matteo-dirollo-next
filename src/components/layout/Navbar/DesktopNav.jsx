'use client';
import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import Link from 'next/link';
import { navItems } from './NavItem';
import DesktopSubNav from './DesktopSubNav';

const DesktopNav = () => {
  const MenuItem = navItems.map((navItem) => {
    const child = navItem.children;

    return (
      <div key={navItem.label} className="relative">
        <Popover
          placement="bottom-start"
          size="md"
          radius="lg"
          shadow="lg"
          showArrow
          classNames={{
            base: 'bg-white dark:bg-gray-800',
          }}
        >
          <PopoverTrigger>
            <Link
              href={navItem.href ?? '#'}
              className="p-2 text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white"
            >
              {navItem.label}
            </Link>
          </PopoverTrigger>

          {navItem.children && (
            <PopoverContent className="p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 min-w-[200px]">
              <div className="flex flex-col gap-2">
                {child.map((subNavItem) => (
                  <DesktopSubNav key={subNavItem.label} {...subNavItem} />
                ))}
              </div>
            </PopoverContent>
          )}
        </Popover>
      </div>
    );
  });

  return (
    <div className="flex flex-row gap-4 items-center">
      {MenuItem}
    </div>
  );
};

export default DesktopNav;
