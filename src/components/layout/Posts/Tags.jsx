"use client";

import React from "react";

const Tags = ({ article }) => {
  const tags = article.category;
  const renderTags = tags.map((tag, index) => (
    <span
      key={index}
      className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 px-2 py-1 rounded-full text-xs mx-2"
    >
      {tag}
    </span>
  ));
  return <div className="flex flex-wrap">{renderTags}</div>;
};

export default Tags;
