'use client';
import React from 'react';
import { Accordion, AccordionItem } from '@heroui/react'; // Import HeroUI Accordion
import Link from 'next/link';
import { GoChevronDown } from 'react-icons/go'; // Import GoChevronDown icon

const MobileNavItem = ({ label, children, href, onClick }) => {
  return (
    <div className="space-y-4">
      <div
        className="flex py-2 justify-between items-center"
        onClick={children && onClick}
      >
        <Link
          href={href ?? '#'}
          className="font-semibold text-gray-600 dark:text-gray-200 hover:underline"
        >
          {label}
        </Link>
        {children && (
          <GoChevronDown className="w-6 h-6 text-gray-600 dark:text-gray-200 transition-transform duration-300" />
        )}
      </div>

      {children && (
        <Accordion
          variant="light"
          selectionMode="single"
          className="pl-4 border-l border-gray-200 dark:border-gray-700"
          showDivider={false}
        >
          <AccordionItem
            title=""
            classNames={{
              content: 'space-y-2',
            }}
            hideIndicator
          >
            {children.map((child) => (
              <Link
                onClick={onClick}
                href={child.href}
                key={child.label}
                className="block py-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                {child.label}
              </Link>
            ))}
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default MobileNavItem;
