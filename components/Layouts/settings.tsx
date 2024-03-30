import { useRouter } from "next/router";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAuth } from "../../hooks/useAuth";
import { LoadingPage } from "../General/loadingPage";
import styled from "../../styles/_Pages/sys/settings.module.scss";
import { OutsetHeadersCornerRadius } from "../SystemLayout/outset-radius-to-headers";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
  headerTitle,
}: {
  children: React.ReactNode;
  headerTitle?: string;
}) {
  const router = useRouter();
  const pathName = usePathname();
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
    return <LoadingPage />;
  }

  if (pathName === "/sys/settings" && mediaQueryMatches) {
    router.push(routes.account);
  }

  return (
    <>
      <section className={styled.settingPageStyle}>
        <nav
          className={`nav-settings-container ${
            !mediaQueryMatches && pathName != "/sys/settings" ? "toggle" : ""
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
                  "link" + (pathName == routes.account ? " active" : "")
                }
              >
                <i className="fas fa-lock"></i>
                Conta e Segurança
              </Link>

              {!auth?.authorities?.includes("ADMIN") && (
                <Link
                  href={routes.profile}
                  className={
                    "link" + (pathName == routes.profile ? " active" : "")
                  }
                >
                  <i className="fas fa-user"></i>
                  Perfil
                </Link>
              )}

              <Link
                href={routes.notifications}
                className={
                  "link" + (pathName == routes.notifications ? " active" : "")
                }
              >
                <i className="fas fa-bell"></i>
                Notificações
              </Link>
              <Link
                href={routes.themes}
                className={
                  "link" + (pathName == routes.themes ? " active" : "")
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
            pathName != "/sys/settings" ? "active" : ""
          }`}
        >
          <div className="setting">{children}</div>
        </div>
      </section>
    </>
  );
}
