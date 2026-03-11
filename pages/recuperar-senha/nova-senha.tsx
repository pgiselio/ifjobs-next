import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/General/button";
import { Input } from "../../components/General/input";
import styled from "../../styles/LoginSignupStyle.module.scss";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { AccessGlobalStyle } from "../../styles/_Pages/Cadastro/AccessGlobalStyle";

SetNewPasswordPage.theme = "light";
export default function SetNewPasswordPage() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useRouter();

  useEffect(() => {
    const paramsToken = searchParams.get("token");
    if (!paramsToken) return;
    let paramsTokensSplitted = paramsToken.split(".");
    let tokenBuffer = Buffer.from(paramsTokensSplitted[1], "base64").toString();

    let tokenPayloadFromParams = JSON.parse(tokenBuffer);
    if (tokenPayloadFromParams.exp * 1000 < new Date().getTime()) {
      navigate.push("/entrar?error=invalidResetToken");
    }
    setToken(paramsToken);
  }, [searchParams, navigate]);

  const validationSchema = Yup.object().shape({
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
    handleSubmit: handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });
  async function onSubmit(data: any) {
    setIsLoading(true);
    api
      .patch(
        "/usuario/senha",
        { senha: data.password, token: "Bearer " + token },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then(() => {
        setIsLoading(false);
        navigate.push("/entrar?error=passwordChanged");
      });
  }
  if (!token) navigate.push("/entrar?error=invalidResetToken");

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
        </div>
      </div>
    </main>
  );
}
