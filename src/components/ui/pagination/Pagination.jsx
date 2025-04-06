'use client';
import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, active }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      {pageNumbers.map(number => (
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            active === number
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
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
