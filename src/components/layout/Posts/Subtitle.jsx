"use client";
import { Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import _ from "lodash";

export default function Subtitle({ article }) {
    const textColor = useColorModeValue("gray.700", "gray.100");
  return (
    <Text color={textColor} fontSize="xs">
      {article.author} | {_.first(article.category)} |{" "}
      {article.date}
    </Text>
  );
}
