// import "./globals.css";
import "@fontsource/epilogue"; // Defaults to weight 400
import "@fontsource/epilogue/400.css"; // Specify weight
import "@fontsource/epilogue/400-italic.css";

import ModalManager from "@/components/ui/modals/ModalManager";
import FooterNewsletter from "@/components/layout/Footer/FooterNewsletter";
import { Providers } from "@/app/providers";
import PublicNav from "@/components/layout/Navbar/PublicNav";

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
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
