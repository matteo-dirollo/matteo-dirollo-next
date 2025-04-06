"use client";
import React from "react";

const CustomText = ({ post, my, as, lineHeight, fontSize, size }) => {
  // Define default styles and allow overrides via props
  const baseStyles = `text-gray-700 dark:text-gray-100`; // Default text color
  const marginStyles = my ? `my-${my}` : ""; // Handle margin-y
  const fontStyles = fontSize ? `text-${fontSize}` : ""; // Handle font size
  const lineStyles = lineHeight ? `leading-${lineHeight}` : ""; // Handle line height
  const sizeStyles = size ? `text-${size}` : ""; // Handle size

  // Combine styles
  const combinedStyles = `${baseStyles} ${marginStyles} ${fontStyles} ${lineStyles} ${sizeStyles}`;

  // Handle the date formatting
  const formattedDate = new Date(
    post.date.seconds * 1000 + post.date.nanoseconds / 1000000
  ).toLocaleDateString();

  // Map Chakra UI's `as` prop to HTML tags
  const Tag = as || "p"; // Default to <p> if 'as' is not provided

  return <Tag className={combinedStyles}>{formattedDate}</Tag>;
};

export default CustomText;
