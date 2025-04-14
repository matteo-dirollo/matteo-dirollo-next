"use client";
import React from "react";

const CustomHeading = ({ children, my, as: Tag = "h1", size, lineHeight, fontSize }) => {
  const textColor = "text-gray-700 dark:text-gray-100"; // Tailwind CSS for light and dark mode

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-4xl",
  };

  return (
    <Tag
      className={`${textColor} ${sizeClasses[size] || ""} ${lineHeight || ""} ${fontSize || ""} my-${my || "4"}`}
    >
      {children}
    </Tag>
  );
};

export default CustomHeading;
