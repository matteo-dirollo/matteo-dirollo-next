import CustomHeading from "@/components/ui/text/headings/CustomHeading";
import { Box, Center, Flex } from "@/styles/ChakraImports";
import React from "react";

export default function BlogLayout({ children }) {
  return (
    <Box w="80%" marginX="auto" my={10} minH={"100vh"} as="section">
      <CustomHeading my={10}>Latest Projects</CustomHeading>
      <Box w="100%" mx="0 auto" display="flex" justifyContent="center">
        <Flex
          maxW="intrinsic"
          mx="auto"
          flexWrap="wrap"
          justifySelf="stretch"
          justify="space-evenly"
          spacing="30px"
        >
          {children}
        </Flex>
      </Box>
      <Center>{/* PAGINATION */}</Center>
    </Box>
  );
}
