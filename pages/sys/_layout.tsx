import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import HomePage from ".";
import { Header } from "../../components/header/header";
import { SidebarList } from "../../components/sidebar/sidebar-list";
import { isTheme } from "../../contexts/AppOptionsContext";
import { useAppOptions } from "../../hooks/useAppOptions";
import { GlobalStyle } from "../../styles/global";
import { SysGlobalStyle } from "../../styles/sys";
import { themes } from "../../styles/themes";

export default function SystemLayout({children} : {children: any}) {
  const AppOptions = useAppOptions();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    typeof window !== "undefined" && window.matchMedia &&
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
        <GlobalStyle />
        <SysGlobalStyle />
        
        <Header />
        <div className="sys-grid-container">
          <SidebarList />
          <div className="main">
            <div className="main-container">
              <main>
                {children ? children : <HomePage/>}
              </main>
              <footer></footer>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
