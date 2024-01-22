import { useRouter } from "next/router";
import { useAppOptions } from "../../../hooks/useAppOptions";
import { useAuth } from "../../../hooks/useAuth";
import { HeaderSysStyle } from "./style";
import Link from "next/link";
import Image from "next/image";
import { HamburgerBars } from "../../General/hamburger";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

export default function Header(props: any) {
  const auth = useAuth();
  const appOptions = useAppOptions();
  const navigate = useRouter();
  const isMobile = useMediaQuery("(max-width: 766px)");

  return (
    <HeaderSysStyle className="header">
      <nav className="navigate">
        <div className="menu-container">
          <button
            id="btn-collapse-sidemenu"
            onClick={() => {
              appOptions.toggleSidebar();
            }}
            aria-label="Botão de esconder ou mostrar menu lateral"
          >
            <HamburgerBars
              className="botao-ham"
              {...(appOptions.sidebarState && isMobile
                ? { active: true }
                : "")}
            />
          </button>
          <Link href="/sys" passHref className="logo-link">
            <div className="logo">
              <Image src="/images/logo.svg" fill alt="logo projeto" />
            </div>
          </Link>

          <button
            className="btn-notify"
            aria-label="Botão de notificações"
            onClick={() => navigate.push("/sys")}
          >
            <div>
              <i className="fas fa-bell"></i>
              {auth.notificationNew && auth.notificationNew.length > 0 && (
                <span></span>
              )}
            </div>
          </button>
        </div>
      </nav>
    </HeaderSysStyle>
  );
}
