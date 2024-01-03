import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import { useEffect } from "react";
import { Button } from "../components/General/button";
import { LandNavBar } from "../components/landing/navbar";
import { LandingGlobalStyle, LandingStyle } from "../components/landing/styles";
import { useAuth } from "../hooks/useAuth";
import { ColorOptions, TagCloud } from "react-tagcloud";

const Home: NextPage = () => {
  const auth = useAuth();
  const data = [
    { value: "Administração", count: Math.random() * 100 },
    { value: "Informática", count: Math.random() * 100 },
    { value: "Eletrotécnica", count: Math.random() * 100 },
    { value: "Física", count: Math.random() * 100 },
    { value: "Energias Renováveis", count: Math.random() * 100 },
  ];
  const options = {
    luminosity: "light",
    hue: "green",
  } as ColorOptions;

  useEffect(() => {
    if (auth.userInfo?.email) {
      window.location.href = "sys";
    }
  });

  return (
    <>
      <Head>
        <title>IF Jobs</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>

      <ParallaxProvider>
        <LandingStyle>
          <LandNavBar />
          <LandingGlobalStyle />
          <main className="landing-main">
            <section className="hello-section" id="sec1">
              <ParallaxBanner
                className="parallax"
                layers={[
                  { image: "images/waves.svg", speed: -20 },
                  {
                    children: (
                      <div className="container">
                        <h1>Olá!👋</h1>
                        <p>
                          Somos uma plataforma de oportunidades voltada para
                          alunos e ex-alunos do IFRN Campus João Câmara.
                          Surgimos com o objetivo de estreitar os laços entre as
                          empresas, tornando o processo de divulgação de vagas e
                          de contratação mais centrado, fácil e ágil.
                        </p>
                      </div>
                    ),
                    speed: -30,
                    className: "layer-1",
                  },
                ]}
                style={{ aspectRatio: "2 / 1" }}
              />
            </section>

            <section className="cursos-section" id="sec2">
              <div className="container" style={{ maxWidth: 600 }}>
                <h1>Cursos do campus JC</h1>

                <TagCloud
                  minSize={20}
                  maxSize={35}
                  colorOptions={options}
                  tags={data}
                  shuffle
                  onClick={(tag: any) => console.log("clicking on tag:", tag)}
                />
              </div>
            </section>
            <section className="aderir-section" id="sec3">
              <div className="container">
                <div className="img-job-hunt">
                  <Image src="images/undraw_job_hunt_re_q203.svg" alt="" height={140} width={145}/>
                </div>
                <h1>Se interessou?</h1>
                <div className="options">
                  <div className="option">
                    <h2>É aluno ou ex-aluno?</h2>
                    <Link href="/cadastro">
                      <Button className="outlined">Cadastre-se</Button>
                    </Link>
                  </div>
                  <div className="option">
                    <h2>É uma empresa?</h2>
                    <Link href="/cadastro?tab=EMPRESA">
                      <Button className="outlined">Faça o pré-cadastro</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section className="equipe-section" id="sec5">
              <div className="container">
                <h1>A equipe fundadora</h1>
                <div className="equipe">
                  <div className="pessoa">
                    <img
                      src="/images/landing/equipe/Lucas.jpg"
                      alt=""
                      className="picture"
                    />
                    <div className="info">
                      <h3>Lucas Mateus</h3>
                      <span>Back-end dev javeiro</span>
                      <a
                        href="https://github.com/Lucas-dev-back"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa-brands fa-github"></i>
                      </a>
                    </div>
                  </div>
                  <div className="pessoa">
                    <img
                      src="/images/landing/equipe/Pedro.jpg"
                      alt=""
                      className="picture"
                    />
                    <div className="info">
                      <h3>Pedro Gisélio</h3>
                      <span>Front-end dev e palpiteiro</span>
                      <a
                        href="https://github.com/pgiselio"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa-brands fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section id="sec4" className="contatos-section">
              <ul className="items">
                <div>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <span>email@yourdomain.com</span>
                  </li>

                  <li>
                    <i className="fas fa-phone"></i>
                    <span>(84) 0000-0000 (ramal x)</span>
                  </li>
                </div>
                <li>
                  <i className="fas fa-location-dot"></i>
                  <span>
                    BR 406, Km 73, nº 3500, Perímetro Rural - João Câmara-RN
                  </span>
                  <span>CEP:59550-000</span>
                </li>
              </ul>
            </section>
          </main>
          <footer className="landing-footer">
            <img src="/images/landing/IFRNJC.png" alt="" />
            <img src="/images/landing/coex.png" className="coex" alt="" />
          </footer>
        </LandingStyle>
      </ParallaxProvider>
    </>
  );
};

export default Home;
