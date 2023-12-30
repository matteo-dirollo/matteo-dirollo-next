"use client";
import React from "react";
import theme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import ReduxProvider from "@/lib/ReduxProvider";
import { ColorModeScript } from '@chakra-ui/react'
import RefreshState from "../lib/RefreshState";

export function Providers({ children }) {
  return (
    <ReduxProvider>
      <CacheProvider>
        <RefreshState>
        <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {children}
          </ChakraProvider>
          </RefreshState>ƒ
      </CacheProvider>
    </ReduxProvider>
  );
}
