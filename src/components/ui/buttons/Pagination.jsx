'use client'
import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, active }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex">
      {pageNumbers.map(number => (
        <button
          className={`mx-1 px-3 py-1 rounded-md ${
            active === number
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100'
              : 'bg-transparent text-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600'
          }`}
          key={number}
          onClick={() => {
            paginate(number);
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
