"use client";
import React from "react";
import theme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import ReduxProvider from "@/lib/ReduxProvider";
import { ColorModeScript } from "@chakra-ui/react";
import RefreshState from "../lib/RefreshState";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { useRouter } from "next/navigation";

export function Providers({ children }) {
  const router = useRouter();
  return (
    <ReduxProvider>
        <RefreshState>
          <ChakraProvider theme={theme}>
            <HeroUIProvider navigate={router.push}>
              <ToastProvider />
              <ColorModeScript
                initialColorMode={theme.config.initialColorMode}
              />
              {children}
            </HeroUIProvider>
          </ChakraProvider>
        </RefreshState>
    </ReduxProvider>
  );
}
