import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTabs } from "react-headless-tabs";
import { LoadingPage } from "../../../components/General/loadingPage";
import { OutsetHeadersCornerRadius } from "../../../components/SystemLayout/outset-radius-to-headers";
import { TabSelector } from "../../../components/General/Tabs/TabSelector";
import { useAuth } from "../../../hooks/useAuth";
import SystemLayout from "../../../components/Layouts/system";
import SettingContaPage from "./conta";
import { SettingPageStyle } from "../../../styles/_Pages/sys/settings";
import SettingThemesPage from "./themes";

export default function SettingsPage() {
  const router = useRouter();
  const params = router.query;
  const defaultTab = "menu";

  let tabs = ["menu", "account", "profile", "notifications", "themes"];
  const [selectedTab, setSelectedTab] = useTabs(tabs, params.tab?.[0]);

  const auth = useAuth();
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1000px)");
    if (mq.matches && typeof params.tab === "undefined") {
      setSearchParams("account");
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      !Array.isArray(params.tab) &&
      [...tabs, null, undefined].includes(params.tab)
    ) {
      setSelectedTab(params.tab || defaultTab);
    }
  }, [params.tab]);
  const setSearchParams = (value: any) => {
    router.query.tab = value;
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: value },
      },
      undefined,
      {}
    );
  };
  if (!auth.userInfo?.id) {
    return (
      <SystemLayout>
        <LoadingPage />;
      </SystemLayout>
    );
  }

  return (
    <SystemLayout>
      <SettingPageStyle>
        <nav
          className={`nav-settings-container ${
            selectedTab !== "menu" ? "toggle" : ""
          }`}
        >
          <div className="nav">
            <OutsetHeadersCornerRadius className="rounded-corner">
              <div className="header">
                <div className="header-items">
                  <h3>Configurações</h3>
                </div>
              </div>
            </OutsetHeadersCornerRadius>
            <div className="items">
              <TabSelector
                isActive={selectedTab === "account"}
                onClick={() => {
                  setSearchParams("account");
                }}
                vertical
              >
                <i className="fas fa-lock"></i>
                Conta e Segurança
              </TabSelector>
              {!auth?.authorities?.includes("ADMIN") && (
                <TabSelector
                  isActive={selectedTab === "profile"}
                  onClick={() => {
                    setSearchParams("profile");
                  }}
                  className="tab-selector-profile"
                  vertical
                >
                  <i className="fas fa-user"></i>
                  Perfil
                </TabSelector>
              )}
              <TabSelector
                isActive={selectedTab === "notifications"}
                onClick={() => {
                  setSearchParams("notifications");
                }}
                vertical
              >
                <i className="fas fa-bell"></i>
                Notificações
              </TabSelector>
              <TabSelector
                isActive={selectedTab === "themes"}
                onClick={() => {
                  setSearchParams("themes");
                }}
                vertical
              >
                <i className="fas fa-palette"></i>
                Temas
              </TabSelector>
            </div>
          </div>
        </nav>
        <div
          className={`setting-container ${
            selectedTab !== "menu" ? "active" : ""
          }`}
        >
          {selectedTab && (
            <div className="setting">
              <OutsetHeadersCornerRadius className="rounded-corner">
                <div className="header">
                  <div className="header-items slide-left">
                    <button
                      className="back-button"
                      type="button"
                      onClick={() => router.back()}
                    >
                      <i className="fas fa-arrow-left"></i>
                    </button>
                    {selectedTab === "profile" && <h3>Perfil</h3>}
                    {selectedTab === "account" && <h3>Conta e Segurança</h3>}
                    {selectedTab === "notifications" && <h3>Notificações</h3>}
                    {selectedTab === "themes" && <h3>Temas</h3>}
                  </div>
                </div>
              </OutsetHeadersCornerRadius>
              <div className="content">
                {selectedTab === "profile" && <SettingContaPage />}
                {selectedTab === "account" && <div>conteudo aqui</div>}
                {selectedTab === "notifications" && <div>Notificações</div>}
                {selectedTab === "themes" && <SettingThemesPage />}
              </div>
            </div>
          )}
        </div>
      </SettingPageStyle>
    </SystemLayout>
  );
}