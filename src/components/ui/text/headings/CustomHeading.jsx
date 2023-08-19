"use client";
import { Heading, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const CustomHeading = ({ children, my, as, size, lineHeight, fontSize }) => {
  const textColor = useColorModeValue("gray.700", "gray.100");
  return (
    <Heading my={my} fontSize={fontSize} color={textColor} as={as} size={size} lineHeight={lineHeight}>
      {children}
    </Heading>
  );
};

export default CustomHeading;
