import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/General/button";
import { Input } from "../../components/General/input";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import CircularProgressFluent from "../../components/General/circular-progress-fluent";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import styled from "../../styles/LoginSignupStyle.module.scss";
import { AccessGlobalStyle } from "../../styles/_Pages/Cadastro/AccessGlobalStyle";
import { useSearchParams } from "next/navigation";

function LoginPage() {
  const auth = useAuth();
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "jolos.aluno@jolos.com" ,
      password: "jolos",
    },
  });

  // let [searchParams, setSearchParams] = useSearchParams();

  if (auth?.email) {
    if (searchParams.has("next")) {
      navigate.push(searchParams.get("next") +"");
    }
    navigate.push("/sys");
  }

  const paramsError = searchParams.getAll("error");
  useEffect(() => {
    if (searchParams.has("error")) {
      paramsError.forEach((error) => {
        switch (error) {
          case "needsLogin":
            toast.error("Você precisa fazer login primeiro!", {});
            break;
          case "invalidCredentials":
            toast.error("Sua sessão expirou, faça login novamente!", {});
            break;
          case "needsPasswordReset":
            toast.error("Você precisa resetar sua senha!", {});
            break;
          case "checkEmail":
            toast.info(
              "Caso esteja cadastrado, você receberá um e-mail com as instruções para redefinir sua senha.",
              {
                autoClose: 20000,
              }
            );
            break;
          case "invalidResetToken":
            toast.error("O link expirou, tente fazer uma nova solicitação", {});
            break;
          case "passwordChanged":
            toast.success("Senha alterada com sucesso!", {
              autoClose: false,
            });
            break;
        }
      });
    }
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
      <AccessGlobalStyle/>
      <Head>
        <title>Fazer Login - IFJobs</title>
        <meta name="description" content="Fazer login no sistema do IFJobs" />
        <link rel="icon" href="/favicon.ico" />
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
              isLoadingText='Entrando...'
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