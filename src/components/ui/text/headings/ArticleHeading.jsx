"use client";
import { Heading, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const ArticleHeading = (title) => {
  const textColor = useColorModeValue("gray.700", "gray.100");
  return (
    <Heading my={2} color={textColor} as="h1" size="2xl" lineHeight="120%">
      {title}
    </Heading>
  );
};

export default ArticleHeading;
