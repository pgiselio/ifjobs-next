"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import VerificationInput from "react-verification-input";
import CircularProgressFluent from "../../../components/General/circular-progress-fluent";
import { useCadastroSteps } from "../../../hooks/useCadastroAluno";
import { api } from "../../../services/api";
import { CadastroLayout } from "../../../components/Layouts/_cadastroLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "./styles.module.scss";


export default function VerifiqueOSeuEmailPage() {
  const [isLoading, setIsLoading] = useState(false);

  let router = useRouter();
  const params = router.query;
  const [email, setEmail] = useState<string>(params?.email?.toString() || "");
  const [codeParam, setcodeParam] = useState<string>(
    params.codigo?.toString() || ""
  );
  const [codeFromInput, setCodeFromInput] = useState<string>(
    codeParam?.toString() || ""
  );
  const cadastroSteps = useCadastroSteps();
  const { handleSubmit } = useForm({});

  useEffect(() => {
    if (
      email === "" &&
      (cadastroSteps.email === undefined || cadastroSteps.email === "")
    )
      setEmail(params.email?.toString() || "");

    if (codeParam === "") setcodeParam(params.codigo?.toString() || "");
    else setCodeFromInput(codeParam);

    if (cadastroSteps.step === 3) {
      cadastroSteps.setVerificationCode(
        codeParam?.toString().length === 6
          ? codeParam?.toString()
          : codeFromInput
      );
      cadastroSteps.setEmail(email);
      router.push("step3");
    }
  });
  useEffect(() => {
    if (cadastroSteps.step < 2) {
      cadastroSteps.setStep(2);
    }
  });
  useEffect(() => {
    if (codeParam?.length === 6 && email) {
      setCodeFromInput(codeParam);
      handleSubmit(onSubmit)();
    }
  }, []);

  const thenAxios = (response: any) => {
    cadastroSteps.setToken(response.data);
    cadastroSteps.setStep(3);
  };
  async function onSubmit() {
    if (isLoading) return;
    if (!email) {
      toast.error("Necessário informar o e-mail!");
      return;
    }
    setIsLoading(true);
    await api
      .get(
        `/usuario/validacao/${email}/${
          codeParam?.length === 6 ? codeParam : codeFromInput
        }`
      )
      .then((response) => {
        console.log(response.data);
        thenAxios(response);
      })
      .catch((e) => {
        console.error(e);
        toast.error("Codigo inválido!");
        router.query.codigo = undefined;
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <CadastroLayout>
      <div className={styled.step2}>
        <div className="content">
          <h1>
            <i className="fas fa-envelope"></i>
          </h1>
          <h2>Verifique o seu e-mail</h2>
          <span className="message">
            Para continuar com o cadastro digite nos campos abaixo o código que
            você recebeu no seu e-mail
          </span>
          <form id="verify" onSubmit={handleSubmit(onSubmit)}>
            <div className="code-fields">
              <VerificationInput
                value={codeFromInput}
                length={6}
                validChars="0-9"
                onChange={(value: string) => {
                  setCodeFromInput(value);
                }}
                classNames={{
                  container: "code-fields",
                  character: "code-field",
                  characterInactive: "code-field--inactive",
                  characterSelected: "code-field--selected",
                }}
                containerProps={{}}
                {...(codeParam?.length === 6 ? { disabled: true } : {})}
                {...(isLoading && { disabled: true })}
              />
            </div>
          </form>
        </div>
        <div className="bottom-actions">
          <div className="flex-btn-login">
            <Link
              href="/entrar"
              passHref
              className="btn-login"
              title="Já tem uma conta? Faça Login!"
            >
              Ou... faça login
            </Link>
          </div>
          <div className="flex-btn-next">
            <button
              type="submit"
              className="btn-next"
              title="Confirmar cadastro"
              form="verify"
              id="cadastroSubmit"
              disabled={isLoading}
            >
              <span>Próximo</span>
              <span className="next-arrow">
                {isLoading ? (
                  <CircularProgressFluent
                    color="white"
                    height="2em"
                    width="2em"
                    duration="1s"
                    style={{ position: "absolute" }}
                  />
                ) : (
                  <i className="fas fa-arrow-right"></i>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </CadastroLayout>
  );
}
