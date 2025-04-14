'use client';
import Link from 'next/link';
import React from 'react';

const AdminItem = ({ icon: Icon, children, link, onClose, ...rest }) => {
  return (
    <Link
      href={link}
      onClick={onClose}
      className="no-underline focus:outline-none"
    >
      <div
        className="flex items-center p-4 mx-4 rounded-lg cursor-pointer group hover:bg-cyan-400 hover:text-white"
        {...rest}
      >
        {Icon && (
          <div className="mr-4">
            <Icon
              className="w-5 h-5 group-hover:text-white"
            />
          </div>
        )}
        <span>{children}</span>
      </div>
    </Link>
  );
};

export default AdminItem;
