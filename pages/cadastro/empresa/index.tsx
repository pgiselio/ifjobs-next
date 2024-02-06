import { toast } from "react-toastify";
import { Input } from "../../../components/General/input";
import { api } from "../../../services/api";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TabSelector } from "../../../components/General/Tabs/TabSelector";
import CircularProgressFluent from "../../../components/General/circular-progress-fluent";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CadastroLayout } from "../../../components/Layouts/cadastro";

export default function CadastroEmpresaPage() {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useRouter();

  const empresaValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Endereço de e-mail inválido")
      .required("Este campo é obrigatório"),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(empresaValidationSchema),
  });

  async function onSubmit({ email }: { email: string }) {
    setIsLoading(true);
    await api
      .post("/usuario/create", {
        email,
        tipoUsuario: "EMPRESA",
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Solicitação enviada com sucesso!");
        }
      })
      .catch(() => {
        toast.error(
          "O e-mail informado já se encontra cadastrado no sistema, aguarde resposta!",
          {}
        );
      })
      .finally(() => setIsLoading(false));
  }
  return (
    <CadastroLayout>
      <div className="form-destaque-grid">
        <div className="form">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <h2 className="desc">Criar conta</h2>

            <div style={{ display: "flex", height: "35px", columnGap: "10px" }}>
              <TabSelector
                isActive={false}
                onClick={() => navigate.push("/cadastro")}
              >
                Candidato
              </TabSelector>
              <TabSelector
                isActive={true}
                onClick={() => navigate.push("/cadastro/empresa")}
              >
                Empresa
              </TabSelector>
            </div>
          </div>
          <div style={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
            <form
              id="cadastroStep1"
              onSubmit={handleSubmit(onSubmit)}
              style={{ paddingRight: "10px" }}
            >
              <section className="inputs">
                <div>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        id="email"
                        placeholder="E-mail"
                        {...field}
                        {...(errors.email && { className: "danger" })}
                      />
                    )}
                  />
                  <p className="input-error">{errors.email?.message}</p>
                </div>
              </section>
              <div className="info-message">
                <span>
                  Assim que possível entraremos em contato por esse e-mail para
                  prosseguir com o seu cadastro
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="destaque">
          <div className="imagem-destaque">
            <img
              src="../images/undraw_connected_re_lmq2.svg"
              alt=""
              style={{ width: "60%" }}
            />
          </div>
          <span>Faça o pré-cadastro da sua empresa</span>
        </div>
      </div>
      <div className="bottom-actions">
        <div className="flex-btn-login">
          <Link
            href="/entrar"
            title="Já tem uma conta? Faça Login!"
            passHref
            className="btn-login"
          >
            Ou... faça login
          </Link>
        </div>
        <div className="flex-btn-next">
          <button
            type="submit"
            className="btn-next"
            title="Confirmar cadastro"
            form="cadastroStep1"
            id="cadastroSubmit"
            disabled={isLoading}
          >
            <span>Enviar</span>
            <span className="next-arrow">
              {isLoading ? (
                <CircularProgressFluent
                  color="white"
                  height="2em"
                  width="2em"
                  duration="1.5s"
                  style={{ position: "absolute" }}
                />
              ) : (
                <i className="fas fa-arrow-right"></i>
              )}
            </span>
          </button>
        </div>
      </div>
    </CadastroLayout>
  );
}
