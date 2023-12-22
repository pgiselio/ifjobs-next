import type { AppProps } from "next/app";
import { queryClient } from "../services/queryClient";
import { themes } from "../styles/themes";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global";
import { AuthProvider } from "../contexts/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppOptionsProvider } from "../contexts/AppOptionsContext";
import { useEffect, useState } from "react";

import "@reach/dialog/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <ThemeProvider theme={themes.light}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <AuthProvider>
          <AppOptionsProvider>
            <>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Component {...pageProps} />
            </>
          </AppOptionsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
