// 'use client'
import "./globals.css";
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

import ModalManager from "@/components/ui/modals/ModalManager";
import FooterNewsletter from "@/components/layout/Footer/FooterNewsletter";
import { Providers } from "./providers";
import PublicNav from "@/components/layout/Navbar/PublicNav";

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <PublicNav />
          <ModalManager />
          {children}
          <FooterNewsletter />
        </Providers>
      </body>
    </html>
  );
}
