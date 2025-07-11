import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/General/button";
import { Input } from "../../components/General/input";
import styled from "../../styles/LoginSignupStyle.module.scss";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { AccessGlobalStyle } from "../../styles/_Pages/Cadastro/AccessGlobalStyle";

PasswordResetPage.theme = "light";
export default function PasswordResetPage() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useRouter();
  const paramsToken = searchParams.get("token");

  useEffect(() => {
    if (paramsToken) {
      let paramsTokensSplitted = paramsToken.split(".");
      let tokenBuffer = Buffer.from(
        paramsTokensSplitted[1],
        "base64"
      ).toString();

      let tokenPayloadFromParams = JSON.parse(tokenBuffer);
      if (tokenPayloadFromParams.exp * 1000 < new Date().getTime()) {
        navigate.push("/entrar?error=invalidResetToken");
      }
      setToken(paramsToken);
    }
  }, [searchParams]);

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
    console.log("Captcha value:", value);
    setValue("recaptcha", value);
  };

  const newPasswordFormValidationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Este campo é obrigatório")
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirmPassword: Yup.string()
      .required("Este campo é obrigatório")
      .oneOf([Yup.ref("password")], "As senhas não coincidem"),
  });

  const {
    control: newPasswordControl,
    formState: newPasswordFormState,
    handleSubmit: newPasswordHandleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(newPasswordFormValidationSchema),
  });
  async function onSubmit(data: any) {
    setIsLoading(true);
    await api.get(`/usuario/recuperar/${data.email}`).finally(() => {
      setIsLoading(false);
      toast.info("E-mail de recuperação de senha enviado!");
      reset();
      window.location.href = "/entrar?error=checkEmail";
    });
  }
  async function onSubmitNewPassword(data: any) {
    setIsLoading(true);
    api
      .patch(
        "/usuario/senha",
        { senha: data.password, token: "Bearer " + token },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        setIsLoading(false);
        navigate.push("/entrar?error=passwordChanged");
      });
  }
  return (
    <main className={styled.StyledAccess}>
      <AccessGlobalStyle/>
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
          {token ? (
            <form onSubmit={newPasswordHandleSubmit(onSubmitNewPassword)}>
              <h2 className="desc">Recuperar conta</h2>
              <section className="inputs">
                <div className="lbl">
                  <Controller
                    name="password"
                    control={newPasswordControl}
                    render={({ field }) => (
                      <Input
                        type="password"
                        id="password"
                        placeholder="Nova senha"
                        {...field}
                        {...(newPasswordFormState.errors.password && {
                          className: "danger",
                        })}
                      />
                    )}
                  />
                  <p className="input-error">
                    {newPasswordFormState.errors.password?.message}
                    &nbsp;
                  </p>
                </div>
                <div className="lbl">
                  <Controller
                    name="confirmPassword"
                    control={newPasswordControl}
                    render={({ field }) => (
                      <Input
                        type="password"
                        id="passwordconfirm"
                        placeholder="Confirmar nova senha"
                        {...field}
                        {...(newPasswordFormState.errors.confirmPassword && {
                          className: "danger",
                        })}
                      />
                    )}
                  />
                  <p className="input-error">
                    {newPasswordFormState.errors.confirmPassword?.message}
                    &nbsp;
                  </p>
                </div>
              </section>
              <Button
                type="submit"
                className="less-radius"
                disabled={!newPasswordFormState.isValid || isLoading}
                isLoading={isLoading}
                isLoadingText="Alterando senha..."
              >
                <span>Enviar</span>
              </Button>
            </form>
          ) : (
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
                    sitekey="6Lf5FBUiAAAAAAE6cTrZRsII_MKMFIL5dm5k9WPE"
                    {...field}
                  />
                )}
              />
              <p className="input-error">
                {formState.errors.recaptcha?.message}
              </p>
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
          )}
        </div>
      </div>
    </main>
  );
}
