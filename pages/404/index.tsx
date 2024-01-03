import Head from "next/head";
import { Error404Style } from "../../styles/_Pages/404";

export default function Error404() {
  return (
    <Error404Style>
        <Head>
            <title>404 - Página não encontrada</title>
        </Head>
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <span>:(</span>
    </Error404Style>
  );
}
