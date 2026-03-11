import { Controller, FormState, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/General/button";
import { Input } from "../../components/General/input";
import styled from "../../styles/LoginSignupStyle.module.scss";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import Image from "next/image";
import { AccessGlobalStyle } from "../../styles/_Pages/Cadastro/AccessGlobalStyle";
import { useState } from "react";

PasswordResetPage.theme = "light";
export default function PasswordResetPage() {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Endereço de e-mail inválido")
      .required("Este campo é obrigatório"),
    recaptcha: Yup.string().required("Você precisa verificar se é um robô"),
  });
  const { control, formState, handleSubmit, setValue, reset, register } =
    useForm({
      mode: "onChange",
      defaultValues: {
        email: "",
        recaptcha: "",
      },
      resolver: yupResolver(validationSchema),
    });

  const handleRecaptcha = (value: any) => {
    setValue("recaptcha", value);
  };

  async function onSubmit({email, recaptcha} : {
    email: string;
    recaptcha: string;
}) {
    setIsLoading(true);
    await api
      .post(`/usuario/recuperar/${email}`, recaptcha)
      .then(() => {
        toast.info("E-mail de recuperação de senha enviado!");
        window.location.href = "/entrar?error=checkEmail";
      })
      .catch((error) => {
        toast.error("Erro: " + error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
        reset();
      });
  }
  return (
    <main className={styled.StyledAccess}>
      <AccessGlobalStyle />
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
            <h2 className="desc" style={{ fontSize: 20 }}>
              Recuperar senha
            </h2>
            <div className="lbl">
              <label htmlFor="email">Informe o e-mail de cadastro: </label>
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
              <p className="input-error">{formState.errors.email?.message}</p>
            </div>
            <Controller
              name="recaptcha"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <ReCAPTCHA
                  sitekey="6Ld2vV4sAAAAAIaZG3X_HnUJSFBAzgQyE3VOmU-b"
                  {...field}
                />
              )}
            />
            <p className="input-error">{formState.errors.recaptcha?.message}</p>
            <div>
              <Link href="/entrar/" passHref className="pwrst-link">
                <i className="fa-solid fa-arrow-left"></i>Voltar para o login
              </Link>
            </div>
            <Button
              type="submit"
              className="less-radius"
              disabled={!formState.isValid || isLoading}
              isLoading={isLoading}
              isLoadingText="Enviando..."
            >
              <span>Enviar solicitação</span>
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
