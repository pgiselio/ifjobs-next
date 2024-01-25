import { useRouter } from "next/router";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAuth } from "../../hooks/useAuth";
import SystemLayout from "./system";
import { LoadingPage } from "../General/loadingPage";
import { SettingPageStyle } from "../../styles/_Pages/sys/settings";
import { OutsetHeadersCornerRadius } from "../SystemLayout/outset-radius-to-headers";
import Link from "next/link";

export default function SettingsLayout({ children }: { children: any }) {
  const router = useRouter();
  const mediaQueryMatches = useMediaQuery("(min-width: 1000px)");
  const routes = {
    profile: "/sys/settings/profile",
    account: "/sys/settings/account",
    notifications: "/sys/settings/notifications",
    themes: "/sys/settings/themes",
    home: "/sys/settings",
  };
  const auth = useAuth();

  if (!auth.userInfo?.id) {
    return (
      <SystemLayout>
        <LoadingPage />;
      </SystemLayout>
    );
  }

  if(router.asPath === "/sys/settings" && mediaQueryMatches) {
    router.push(routes.account);
  }

  return (
    <SystemLayout>
      <SettingPageStyle>
        <nav
          className={`nav-settings-container ${
            !mediaQueryMatches && router.asPath != "/sys/settings"
              ? "toggle"
              : ""
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
              <Link
                href={routes.account}
                className={
                  "link" + (router.asPath == routes.account ? " active" : "")
                }
              >
                <i className="fas fa-lock"></i>
                Conta e Segurança
              </Link>

              {!auth?.authorities?.includes("ADMIN") && (
                <Link
                  href={routes.profile}
                  className={
                    "link" + (router.asPath == routes.profile ? " active" : "")
                  }
                >
                  <i className="fas fa-user"></i>
                  Perfil
                </Link>
              )}

              <Link
                href={routes.notifications}
                className={
                  "link" +
                  (router.asPath == routes.notifications ? " active" : "")
                }
              >
                <i className="fas fa-bell"></i>
                Notificações
              </Link>
              <Link
                href={routes.themes}
                className={
                  "link" + (router.asPath == routes.themes ? " active" : "")
                }
              >
                <i className="fas fa-palette"></i>
                Temas
              </Link>
            </div>
          </div>
        </nav>
        <div
          className={`setting-container ${
            router.asPath != "/sys/settings" ? "active" : ""
          }`}
        >
          <div className="setting">
            {(router.asPath != "/sys/settings") && (
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
                    {router.asPath === routes.profile && <h3>Perfil</h3>}
                    {(router.asPath === routes.account || router.asPath === routes.home) && (
                      <h3>Conta e Segurança</h3>
                    )}
                    {router.asPath === routes.notifications && (
                      <h3>Notificações</h3>
                    )}
                    {router.asPath === routes.themes && <h3>Temas</h3>}
                  </div>
                </div>
              </OutsetHeadersCornerRadius>
            )}
            <div className="content">{children}</div>
          </div>
        </div>
      </SettingPageStyle>
    </SystemLayout>
  );
}