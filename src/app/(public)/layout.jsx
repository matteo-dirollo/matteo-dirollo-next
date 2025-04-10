import "../globals.css";
import "../../styles/fonts.css";
import Head from "next/head";

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
import { Providers } from "@/app/providers";
import PublicNav from "@/components/layout/Navbar/PublicNav";
import { GoogleTagManager } from "@next/third-parties/google";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Injecting raw HTML comment */}
        <meta charSet="UTF-8" />
        <script
          dangerouslySetInnerHTML={{
            __html: `<!--Tradedoubler site verification 3425221-->`,
          }}
        />
        <GoogleTagManager
          gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
        />
      </Head>
      <body>
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
