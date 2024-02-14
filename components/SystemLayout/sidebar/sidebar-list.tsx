import { useAuth } from "../../../hooks/useAuth";
import { useAppOptions } from "../../../hooks/useAppOptions";

import { ProfilePic } from "../profile-pic/profile-pic";
import { SidebarItem } from "./sidebar-item";
import styled from "./styles.module.scss"
import Link from "next/link";

export function SidebarList() {
  const auth = useAuth();
  const appOptions = useAppOptions();

  function nomePessoa(): string {
    if (!auth.userInfo?.id) {
      return "Carregando...";
    }
    return (
      auth.userInfo?.aluno?.dadosPessoa.nome ||
      auth.userInfo?.empresa?.dadosPessoa.nome ||
      "ADMIN"
    );
  }
  return (
    <>
      <div
        className={styled["sidebar-overlay"]}
        onClick={() => appOptions.toggleSidebar()}
      ></div>
      <aside className={styled["sidebar"]}>
        <div className={styled["sidebar-scroller"]}>
          <div className={styled["side-bar-container"]}>
            <div className={styled["min-perfil"]}>
              <ProfilePic userId={auth.userInfo?.id} className={styled["profile-pic"]}/>
              <div className={styled["min-perfil-details"]}>
                <h3 className={styled["min-perfil-name"]}>{nomePessoa()}</h3>
                <span className={styled["min-perfil-detail"]}>{auth?.email}</span>
              </div>
            </div>

            <nav className={styled["sidebar-items"]}>
              <ul>
                <SidebarItem to="/sys" icon="fas fa-home" label="Início" end />
                {auth?.authorities?.includes("ADMIN") && (
                  <SidebarItem
                    to={`/sys/gerenciamento`}
                    icon="fas fa-gauge-high"
                    label="Gerenciamento"
                  />
                )}
                <SidebarItem
                  to="/sys/vagas"
                  icon="fas fa-briefcase"
                  label="Vagas"
                />
                <SidebarItem
                  to="/sys/forum"
                  icon="fas fa-comments"
                  label="Fórum"
                />
                {!auth?.authorities?.includes("ADMIN") && (
                  <SidebarItem
                    to={`/sys/profile/${auth.userInfo?.id}`}
                    icon="fas fa-user"
                    label="Perfil"
                  />
                )}

                <SidebarItem
                  to="/sys/settings"
                  icon="fas fa-cog"
                  label="Configurações"
                />
                <div className={styled["menu-separator"]}></div>
                <li>
                  <Link href="/logout" passHref title="Sair" className={styled["sair"]}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Sair</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
