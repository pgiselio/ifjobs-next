import Head from "next/head";
import styled from "./styles.module.scss";

export default function Error404() {
  return (
    <div className={styled["error404Style"]}>
        <Head>
            <title>404 - Página não encontrada</title>
        </Head>
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <span>:(</span>
    </div>
  );
}
