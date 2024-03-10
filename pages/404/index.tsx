import Head from "next/head";
import styled from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Error404() {
  const router = useRouter();
  return (
    <div className={styled["error404Style"]}>
      <Head>
        <title>404 - Página não encontrada</title>
      </Head>
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <span className={styled.sad}>:(</span>
      
      <span className={styled.link}>
        <a href="#" onClick={() => router.back()}>
          <i className="fas fa-arrow-left"></i> Tentar página anterior
        </a>{" "}
        |{" "}
        <Link href="/">
          <i className="fas fa-home"></i> Ir para o início
        </Link>
      </span>
      <div className={styled["balls"]}>
        <span className={styled["ball"]}></span>
        <span className={styled["ball"] + " " + styled["ball2"]}></span>
        <span className={styled["ball"] + " " + styled["ball3"]}></span>
        <span className={styled["ball"] + " " + styled["ball4"]}></span>
      </div>
    </div>
  );
}
