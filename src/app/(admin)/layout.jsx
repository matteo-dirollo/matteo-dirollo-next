import React from "react";
import AdminSidebar from "@/components/layout/AdminSidebar/AdminSidebar";
import { Providers } from "@/app/providers";
import CheckAuth from "./CheckAuth";
import "@fontsource/epilogue"; // Defaults to weight 400
import "@fontsource/epilogue/400.css"; // Specify weight
import "@fontsource/epilogue/400-italic.css";

// LEXICAL STYLES
import "@/components/ui/lexicalEditor/ui/Button.css";
import "@/components/ui/lexicalEditor/ui/ContentEditable.css";
import "@/components/ui/lexicalEditor/ui/Dialog.css";
import "@/components/ui/lexicalEditor/ui/Input.css";
import "@/components/ui/lexicalEditor/ui/Modal.css";
import "@/components/ui/lexicalEditor/nodes/ImageNode.css";
import "@/components/ui/lexicalEditor/styles.css";


export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CheckAuth>
            <AdminSidebar>{children}</AdminSidebar>
          </CheckAuth>
        </Providers>
      </body>
    </html>
  );
}