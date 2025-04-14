'use client';
import React from 'react';
import { navItems } from './NavItem';
import MobileNavItem from './MobileNavItem';

const MobileNav = ({ onClick }) => {
  const MobileItems = navItems.map((navItem) => (
    <MobileNavItem onClick={onClick} key={navItem.label} {...navItem} />
  ));

  return (
    <div className="flex flex-col gap-4">
      {MobileItems}
    </div>
  );
};

export default MobileNav;
