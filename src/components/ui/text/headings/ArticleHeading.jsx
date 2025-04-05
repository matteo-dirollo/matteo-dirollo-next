"use client";
import React from "react";

const ArticleHeading = ({ title }) => {
  return (
    <h1 className="my-4 text-4xl font-medium leading-tight text-gray-800 dark:text-gray-100">
    {title}
  </h1>

  );
};

export default ArticleHeading;
