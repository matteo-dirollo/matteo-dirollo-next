"use client";
import ReduxProvider from "@/lib/ReduxProvider";
import "./globals.css";
import theme from "@/styles/theme";
import { Inter } from "next/font/google";
import "@fontsource/epilogue"; // Defaults to weight 400
import "@fontsource/epilogue/400.css"; // Specify weight
import "@fontsource/epilogue/400-italic.css";

const inter = Inter({ subsets: ["latin"] });

// LEXICAL STYLES
import "@/components/ui/lexicalEditor/ui/Button.css";
import "@/components/ui/lexicalEditor/ui/ContentEditable.css";
import "@/components/ui/lexicalEditor/ui/Dialog.css";
import "@/components/ui/lexicalEditor/ui/Input.css";
import "@/components/ui/lexicalEditor/ui/Modal.css";
import "@/components/ui/lexicalEditor/nodes/ImageNode.css";
import "@/components/ui/lexicalEditor/styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar/Navbar";
import ModalManager from "@/components/ui/modals/ModalManager";
import FooterNewsletter from "@/components/layout/Footer/FooterNewsletter";

export default function RootLayout({ children }) {
  const router = useRouter();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ChakraProvider theme={theme}>
            {router.pathname !== "/admin" && <Navbar />}
            <ModalManager />
            {children}
            <FooterNewsletter />
          </ChakraProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
