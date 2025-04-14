'use client';
import React from 'react';
import Link from 'next/link';
import { GoChevronRight } from "react-icons/go";

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      role="group"
      className="block p-2 rounded-md hover:bg-pink-50 dark:hover:bg-gray-900"
      href={href}
      passHref
    >
      <div className="flex flex-row items-center">
        <div>
          <p className="font-medium transition-all duration-300 group-hover:text-pink-400">
            {label}
          </p>
          <p className="text-sm">{subLabel}</p>
        </div>
        <div className="flex-1 flex justify-end items-center opacity-0 transform -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <GoChevronRight className="w-5 h-5 text-pink-400" />
        </div>
      </div>
    </Link>
  );
};

export default DesktopSubNav;
