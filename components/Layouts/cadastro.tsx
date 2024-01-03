import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useCadastroSteps } from "../../hooks/useCadastroAluno";
import { AccessGlobalStyle, StyledAccess } from "../../styles/LoginSignupStyle";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export function CadastroLayout({children} : {children: any}) {
  const navigate = useRouter();
  const auth = useAuth();
  const cadastroSteps = useCadastroSteps();
  useEffect(() => {
    if (auth?.email) {
      navigate.push("/sys");
    }
  });
  return (
    <StyledAccess>
      <Head>
        <title>Cadastro - IFJobs</title>
        <meta name="description" content="Cadastro no sistema do IFJobs" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AccessGlobalStyle />

      <section className="access-container">
        <div className="login-form signup-form">
          <div className="header-signup">
            <Link href="../" passHref className="logo-signup">
              <Image src="../images/logo.svg" alt="" fill/>
            </Link>
            <div className="progress">
              <span
                {...(cadastroSteps.step === 1
                  ? { className: "active" }
                  : cadastroSteps.step > 1 && {
                      className: "done",
                    })}
                title="Cadastro básico"
              ></span>
              <span
                {...(cadastroSteps.step === 2
                  ? { className: "active" }
                  : cadastroSteps.step > 2 && {
                      className: "done",
                    })}
                title="Confirmação do e-mail"
              ></span>
              <span
                {...(cadastroSteps.step === 3
                  ? { className: "active" }
                  : cadastroSteps.step > 3 && {
                      className: "done",
                    })}
                title="Cadastramento de dados"
              ></span>
            </div>
          </div>
          <div className="cadastro-content">
            {children}
          </div>
        </div>
      </section>
    </StyledAccess>
  );
}
