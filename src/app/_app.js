import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/layout/Navbar/Navbar";
import theme from "@/styles/theme";
import { useRouter } from "next/router";

import { Provider } from "react-redux";
import { wrapper, persistor, useStore } from "@/lib/store";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "@fontsource/epilogue"; // Defaults to weight 400
import "@fontsource/epilogue/400.css"; // Specify weight
import "@fontsource/epilogue/400-italic.css";
import ModalManager from "@/components/ui/modals/ModalManager";
import FooterNewsletter from "../components/layout/Footer/FooterNewsletter";

// LEXICAL STYLES
import "../components/ui/lexicalEditor/ui/Button.css";
import "../components/ui/lexicalEditor/ui/ContentEditable.css";
import "../components/ui/lexicalEditor/ui/Dialog.css";
import "../components/ui/lexicalEditor/ui/Input.css";
import "../components/ui/lexicalEditor/ui/Modal.css";
import "../components/ui/lexicalEditor/nodes/ImageNode.css";
import "../components/ui/lexicalEditor/styles.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          {router.pathname !== "/admin" && <Navbar />}
          <ModalManager />
          <Component {...pageProps} />
          <FooterNewsletter />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
