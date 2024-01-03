import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-scroll";
import Image from "next/image";
import * as NextLink from "next/link";
import styled from "./navbar.module.scss";

export function LandNavBar() {
  const [menuState, setMenuState] = useState(false);
  const [accessState, setAccessState] = useState(false);

  let navigate = useRouter();
  const auth = useAuth();
  return (
    <>
      <div className={styled["landing-header"] + " navigate-container"}>
        <nav className={styled["navigate"]}>
          <div className={styled["menu-container"]}>
            <NextLink.default href="/" passHref className={styled["logo-nav"]}>
              <Image src="/images/logo.svg" alt="" height={34} width={94} />
            </NextLink.default>
            <div
              className={
                styled["menu"] + (menuState ? " " + styled["active-menu"] : "")
              }
            >
              <ul>
                <LandBarItem
                  href="#sec1"
                  label="Sobre"
                  setMenuState={setMenuState}
                />
                <LandBarItem
                  href="#sec2"
                  label="Cursos"
                  setMenuState={setMenuState}
                />
                <LandBarItem
                  href="#sec3"
                  label="Aderir"
                  setMenuState={setMenuState}
                />
                <LandBarItem
                  href="#sec5"
                  label="Equipe"
                  setMenuState={setMenuState}
                />
                <LandBarItem
                  href="#sec4"
                  label="Contato"
                  setMenuState={setMenuState}
                />
              </ul>
            </div>
            <div className={styled["acesso"]}>
              {auth.email ? (
                <button
                  type="button"
                  className={
                    styled["access-bt"] + (accessState ? " active" : "")
                  }
                  onClick={() => {
                    window.location.href = "sys";
                  }}
                >
                  Logado
                </button>
              ) : (
                <Acesso />
              )}
            </div>

            <div className={styled["mobile-buttons"]}>
              <button
                type="button"
                className={styled["access-bt"] + (accessState ? " active" : "")}
                onClick={() => {
                  auth.email ? navigate.push("sys") : navigate.push("entrar");
                }}
              ></button>
              <div
                className={
                  styled["acesso-mobile"] + (accessState ? " active" : "")
                }
              >
                <Acesso />
              </div>
              <div
                id="botao-ham"
                className={"botao-ham " + (menuState && "active")}
                onClick={() => {
                  setMenuState(!menuState);
                  setAccessState(false);
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div
        className={"backshadow " + (accessState || menuState ? "active" : "")}
        onClick={() => {
          setMenuState(false);
          setAccessState(false);
        }}
      ></div>
    </>
  );
}
function LandBarItem({
  href,
  label,
  setMenuState,
}: {
  href: string;
  label: string;
  setMenuState: (bol: boolean) => void;
}) {
  return (
    <li>
      <Link
        className={styled["nav-link"]}
        activeClass={styled["active-link"]}
        to={href.replace("#", "")}
        spy={true}
        smooth={true}
        offset={-80}
        duration={500}
        onClick={() => {
          setMenuState(false);
        }}
      >
        {label}
      </Link>
    </li>
  );
}

function Acesso() {
  return (
    <>
      <NextLink.default href="entrar" passHref className={styled["login-bt"]}>
        Login
      </NextLink.default>
      <NextLink.default
        href="cadastro"
        passHref
        className={styled["signup-bt"]}
      >
        Cadastro
      </NextLink.default>
    </>
  );
}
