import type { AppProps } from "next/app";
import { queryClient } from "../services/queryClient";
import { themes } from "../styles/themes";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global";
import { AuthProvider } from "../contexts/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppOptionsProvider } from "../contexts/AppOptionsContext";

import "@reach/dialog/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import "../styles/globals.scss";
import "../styles/select.scss";
import { ToastContainer } from "react-toastify";
import { CadastroProvider } from "../contexts/CadastroContext";
import { SkeletonTheme } from "react-loading-skeleton";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themes.light}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <AuthProvider>
          <AppOptionsProvider>
            <CadastroProvider>
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
                <SkeletonTheme baseColor="rgba(000, 000, 000, 0.12)" highlightColor="var(--secondary-color)">
                <Component {...pageProps} />
                </SkeletonTheme>
              </>
            </CadastroProvider>
          </AppOptionsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
