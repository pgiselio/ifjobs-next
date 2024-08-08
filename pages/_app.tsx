import type { AppProps } from "next/app";
import { queryClient } from "../services/queryClient";
import { AuthProvider } from "../contexts/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppOptionsProvider } from "../contexts/AppOptionsContext";

import "@reach/dialog/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "../styles/globals.scss";
import "../styles/select.scss";
import "../styles/themes.scss";
import "../styles/quill.snow.css";
import { ToastContainer } from "react-toastify";
import { CadastroProvider } from "../contexts/CadastroContext";
import { SkeletonTheme } from "react-loading-skeleton";
import { ThemeProvider } from "next-themes";
import { AlertDialogProvider } from "../contexts/AlertDialogContext";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { Poppins, Roboto } from 'next/font/google'

const poppins = Poppins({
  weight: ["100","200","300","400","500","600","700", "800", "900"],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
})

const roboto = Roboto({
  weight: ["100","300","400","500","700","900"],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ThemeProvider
      forcedTheme={(Component as any)?.theme || null}
      themes={["system", "altoContraste", "darkGray", "light", "dark"]}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppOptionsProvider>
            <AlertDialogProvider>
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
                  <SkeletonTheme
                    baseColor="rgba(000, 000, 000, 0.12)"
                    highlightColor="var(--secondary-color)"
                  >
                    <div className={`${poppins.variable} ${roboto.variable}`}>
                      <style jsx global>{`
                        * {
                          font-family: ${poppins.style.fontFamily};
                        }
                      `}</style>
                      {getLayout(<Component {...pageProps} />)}
                    </div>
                  </SkeletonTheme>
                </>
              </CadastroProvider>
            </AlertDialogProvider>
          </AppOptionsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
