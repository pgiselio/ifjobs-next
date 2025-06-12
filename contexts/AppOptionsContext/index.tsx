import { useState, createContext, useEffect, JSX } from "react";
import { themes } from "../../styles/themes";
import { AppOptionsContextType } from "./types";
import { useTheme } from "next-themes";

export const AppOptionsContext = createContext<AppOptionsContextType>(
  {} as AppOptionsContextType
);
export function isTheme(x: any): x is keyof typeof themes {
  const themeKeys = Object.keys(themes);  
  return themeKeys.includes(x);
}
export function AppOptionsProvider({ children }: { children: JSX.Element }) {
  const [sidebarState, setSidebarState] = useState(false);
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    const mq = window.matchMedia("(min-width: 766px)");

    if (mq.matches && localStorage.getItem("toggle-sidemenu") === "yes") {
      setSidebarState(true);
    }
  }, []);

  useEffect(() => {
    const botaoHam = document.querySelector(".botao-ham");
    if (sidebarState) {
      document.body.classList.add("toggle-sidemenu");
      botaoHam?.classList.add("active");
      localStorage.setItem("toggle-sidemenu", "yes");
    } else {
      document.body.classList.remove("toggle-sidemenu");
      botaoHam?.classList.remove("active");
      localStorage.setItem("toggle-sidemenu", "");
    }
  });
  function toggleSidebar() {
    setSidebarState(!sidebarState);
  }

  return (
    <AppOptionsContext.Provider
      value={{
        theme,
        setTheme,
        sidebarState,
        toggleSidebar,
      }}
    >
      {children}
    </AppOptionsContext.Provider>
  );
}
