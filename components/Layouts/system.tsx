import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import HomePage from "../../pages/sys";
import Header from "../SystemLayout/header";
import { SidebarList } from "../SystemLayout/sidebar/sidebar-list";
import { isTheme } from "../../contexts/AppOptionsContext";
import { useAppOptions } from "../../hooks/useAppOptions";
import { GlobalStyle } from "../../styles/global";
import { SysGlobalStyle } from "../../styles/sys.global";
import { themes } from "../../styles/themes";
import Head from "next/head";
import { RequireAuth } from "../../contexts/AuthContext/RequireAuth";

export default function SystemLayout({ children }: { children: any }) {
  const AppOptions = useAppOptions();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const modeMe = (e: any) => {
      setIsDarkMode(e.matches);
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", modeMe);
    return window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", modeMe);
  }, []);

  return (
    <>
      <RequireAuth>
        <ThemeProvider
          theme={
            AppOptions.theme === "systemDefault"
              ? isDarkMode
                ? themes.dark
                : themes.light
              : isTheme(AppOptions.theme)
              ? themes[AppOptions.theme]
              : themes.light
          }
        >
          <Head>
            <title>IFJobs</title>
          </Head>
          <GlobalStyle />
          <SysGlobalStyle />

          <Header />
          <div className="sys-grid-container">
            <SidebarList />
            <div className="main">
              <div className="main-container">
                <main>{children ? children : <HomePage />}</main>
                <footer></footer>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </RequireAuth>
    </>
  );
}
