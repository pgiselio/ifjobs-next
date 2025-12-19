import HomePage from "../../pages/sys";
import Header from "../SystemLayout/header";
import { SidebarList } from "../SystemLayout/sidebar/sidebar-list";
import { SysGlobalStyle } from "../../styles/sys.global";
import Head from "next/head";
import { RequireAuth } from "../../contexts/AuthContext/RequireAuth";
import { ThemeProvider } from "next-themes";


export function SystemLayout({ children }: { children: any }) {
  return (
    <ThemeProvider themes={["system", "altoContraste", "darkGray", "light", "dark"]}>
    <RequireAuth>
      <>
        <Head>
          <title>IFJobs</title>
        </Head>
        <SysGlobalStyle />

        <Header />
        <div className="sys-grid-container">
          <SidebarList />
          <div className="main">
            <div className="main-container">
              <main>{children ? children : <HomePage />}</main>
              <footer>
                <p>IFJobs</p>
              </footer>
            </div>
          </div>
        </div>
      </>
    </RequireAuth>
    </ThemeProvider>
  );
}
