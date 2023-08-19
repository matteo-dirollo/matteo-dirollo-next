"use client";
import { Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const CustomText = ({post, my, as, size, lineHeight, fontSize }) => {
  const textColor = useColorModeValue("gray.700", "gray.100");
  return (
    <Text my={my} fontSize={fontSize} color={textColor} as={as} size={size} lineHeight={lineHeight}>
       {new Date(
            post.date.seconds * 1000 + post.date.nanoseconds / 1000000
          ).toLocaleDateString()}
    </Text>
  );
};

export default CustomText;
