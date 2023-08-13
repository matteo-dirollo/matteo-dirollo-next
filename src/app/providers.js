"use client"
import React from 'react';
import theme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import ReduxProvider from "@/lib/ReduxProvider";

export function Providers({ children }) {
  return (
    <ReduxProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </ReduxProvider>
  );
}
