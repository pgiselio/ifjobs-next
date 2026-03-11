import { toast, ToastContainer, ToastOptions } from "react-toastify";
import { Button } from "../../components/General/button";
import { Input } from "../../components/General/input";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import styled from "../../styles/LoginSignupStyle.module.scss";
import { AccessGlobalStyle } from "../../styles/_Pages/Cadastro/AccessGlobalStyle";
import { useSearchParams } from "next/navigation";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessage {
  type: ToastType;
  message: string;
  options?: ToastOptions;
}

const LISTA_MENSAGENS : Record<string, ToastMessage> = {
  needsLogin: {
    message: "Você precisa fazer login primeiro!",
    type: "error"
  },
  invalidCredentials: {
    message: "Sua sessão expirou, faça login novamente!",
    type: "error"
  },
  needsPasswordReset: {
    message: "Você precisa resetar sua senha!",
    type: "error"
  },
  checkEmail: {
    message: "Caso esteja cadastrado, você receberá um e-mail com as instruções para redefinir sua senha.",
    type: "info",
    options: { autoClose: 20000 }
  },
  invalidResetToken: {
    message: "O link expirou, tente fazer uma nova solicitação",
    type: "error"
  },
  passwordChanged: {
    message: "Senha alterada com sucesso!",
    type: "success",
    options: { autoClose: false }
  }
};

function LoginPage() {
  const auth = useAuth();
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "jolos.aluno@jolos.com",
      password: "jolos",
    },
  });

  // let [searchParams, setSearchParams] = useSearchParams();

  if (auth?.email) {
    if (searchParams.has("next")) {
      navigate.push(searchParams.get("next") + "");
    }
    navigate.push("/sys");
  }

  useEffect(() => {
    const paramsError = searchParams.getAll("error");

    paramsError.forEach((error) => {
      const handler = LISTA_MENSAGENS[error];

      if (handler) {
        const { message, type, options = {} } = handler;
        toast[type](message, options);
      }
    });
  }, [searchParams]);

  async function onSubmit(data: any) {
    try {
      setIsLoading(true);
      await auth.signin(data.email, data.password);
      console.log(searchParams.get("next"));
      if (searchParams.has("next")) {
        window.location.href = "" + searchParams.get("next");
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Usuário ou senha inválidos!", {});
    }
  }

  return (
    <main className={styled.StyledAccess}>
      <AccessGlobalStyle />
      <Head>
        <title>Fazer Login - IFJobs</title>
        <meta name="description" content="Fazer login no sistema do IFJobs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="access-container">
        <div className="login-form">
          <div className="logo-login">
            <a href="../">
              <Image
                src="/images/logo.svg"
                className="logo"
                alt="Logo do IF Jobs"
                title="Logo IF Jobs"
                width={110}
                height={40}
              />
            </a>
          </div>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="desc">Entrar</h2>
            <div className="info-message error-msg">
              <span>Usuário ou senha inválidos</span>
            </div>
            <div className="inputs">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="email"
                    icon="fas fa-user"
                    placeholder="E-mail"
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Input
                      type="password"
                      id="password"
                      icon="fas fa-lock"
                      placeholder="Senha"
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div>
              <Link href="/recuperar-senha/" className="pwrst-link">
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              type="submit"
              className="less-radius"
              disabled={!formState.isValid || isLoading}
              isLoading={isLoading}
              isLoadingText="Entrando..."
            >
              <span>Entrar</span>
            </Button>
            <div className="registre-se">
              <span>Não tem uma conta?</span>
              <Link href="/cadastro" passHref className="bt-cadse">
                Registre-se
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

LoginPage.theme = "light";
export default LoginPage;
