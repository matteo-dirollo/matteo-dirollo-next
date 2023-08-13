"use client";

import { Tag } from "@chakra-ui/react";
import React from "react";

const Tags = ({ article }) => {
  const tags = article.category;
  const renderTags = tags.map((tag, index) => {
    return <Tag key={index} mx={2}>{tag}</Tag>;
  });
  return <div>{renderTags}</div>;
};

export default Tags;
