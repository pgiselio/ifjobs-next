import React, { useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import CircularProgressFluent from "../../../components/General/circular-progress-fluent";
import { Input } from "../../../components/General/input";
import { useCadastroSteps } from "../../../hooks/useCadastroAluno";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { userAlunoType } from "../../../contexts/CadastroContext/types";
import { convertFromStringToDate } from "../../../utils/convertStringToDateFormat";
import Select from "react-select";
import {
  CursosSelectOptions,
  UFsSelectOptions,
} from "../../../utils/selectLists";
import { useRouter } from "next/router";
import { CadastroLayout } from "../../../components/Layouts/_cadastroLayout";
import styled from "./styles.module.scss";

CadastroStep3.theme = "light";
export default function CadastroStep3() {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useRouter();
  const cadastroSteps = useCadastroSteps();

  useEffect(() => {
    if (cadastroSteps.step < 3) {
      navigate.push("/cadastro");
    }
  });
  let cursos = CursosSelectOptions.map(({ value }) => value);
  let unidadesFederativas = UFsSelectOptions.map(({ value }) => value);
  let validationSchema = Yup.object().shape({
    nome: Yup.string().required("Este campo é obrigatório"),
    cpf: Yup.string()
      .required("Este campo é obrigatório")
      .min(14, "CPF inválido"),
    dataNascimento: Yup.string()
      .test(
        "validacao da data",
        "Data inválida",
        (value: any) =>
          convertFromStringToDate(value).toString() !== "Invalid Date" &&
          convertFromStringToDate(value) <= new Date() &&
          convertFromStringToDate(value) >= new Date("1500-01-01")
      )
      .required("Este campo é obrigatório")
      .min(10, "Data inválida"),
    cidade: Yup.string().required("Este campo é obrigatório"),
    UF: Yup.string()
      .oneOf([...unidadesFederativas], "O estado não é válido")
      .required("Este campo é obrigatório"),
    curso: Yup.string()
      .oneOf([...cursos], "O curso selecionado não é válido")
      .required("Este campo é obrigatório"),
    periodo: Yup.string().required(""),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nome: "",
      cpf: "",
      dataNascimento: "",
      cidade: "",
      UF: "",
      curso: "",
      periodo: "",
    },
    resolver: yupResolver(validationSchema),
  });

  async function onHandleSubmit(props: any) {
    setIsLoading(true);

    await api
      .post<userAlunoType>(
        "/aluno/create",
        {
          dadosPessoa: {
            nome: props.nome,
            dataNasc: convertFromStringToDate(props.dataNascimento),
            localizacao: props.cidade + "/" + props.UF,
          },
          curso: props.curso.toUpperCase(),
          periodo: props.periodo,
          cpf: props.cpf.replaceAll(".", "").replaceAll("-", ""),
        },
        {
          headers: {
            Authorization: cadastroSteps.token,
          },
        }
      )
      .then(() => {
        cadastroSteps.setStep(4);
        navigate.push("confirmacao");
      })
      .catch(() => {
        toast.error("Erro ao cadastrar aluno");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <CadastroLayout>
        <div className={styled.content}>
          <h2 className="desc">Seus Dados</h2>
          <form id="cadastroStep3" onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="inputs">
              <div className="lbl">
                <label htmlFor="nome">Nome: </label>
                <Controller
                  name="nome"
                  control={control}
                  render={({ field }) => (
                    <Input
                      icon="fas fa-pencil"
                      type="text"
                      id="nome"
                      placeholder="Nome completo"
                      {...field}
                      {...(errors.nome && { className: "danger" })}
                    />
                  )}
                />
                <p className="input-error">{errors.nome?.message}</p>
              </div>
              <div className="lbl">
                <label htmlFor="cpf">CPF: </label>
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field: {ref, ...rest} }) => (
                    <ReactInputMask
                      maskPlaceholder={null}
                      mask="999.999.999-99"
                      {...rest}
                      inputRef={ref}
                    >
                      {/* @ts-ignore */}  
                      <Input
                        icon="fas fa-id-card"
                        type="text"
                        id="cpf"
                        placeholder="CPF"
                        ref={ref}
                        {...(errors.cpf && { className: "danger" })}
                      />
                    </ReactInputMask>
                  )}
                />
                <p className="input-error">{errors.cpf?.message}</p>
              </div>
              <div className="lbl">
                <label htmlFor="dataNascimento">Data de Nascimento: </label>
                <Controller
                  name="dataNascimento"
                  control={control}
                  render={({ field: {ref, ...rest} }) => (
                    <ReactInputMask
                      maskPlaceholder={null}
                      mask="99/99/9999"
                      inputRef={ref}
                      {...rest}
                    >
                      {/* @ts-ignore */}  
                      <Input
                        type="text"
                        placeholder="Data de nascimento"
                        icon="fas fa-calendar"
                        id="dataNascimento"
                        ref={ref}
                        {...(errors.dataNascimento && { className: "danger" })}
                      />
                    </ReactInputMask>
                  )}
                />
                <p className="input-error">{errors.dataNascimento?.message}</p>
              </div>
              <div className="input-group">
                <div className="lbl">
                  <label htmlFor="estado">Estado: </label>
                  <Controller
                    name="UF"
                    control={control}
                    render={({ field: { value, onChange, onBlur, ref } }) => (
                      <Select
                      unstyled
                      classNamePrefix="Select"
                        noOptionsMessage={() => "Não encontrado"}
                        ref={ref}
                        inputId="estado"
                        options={UFsSelectOptions}
                        placeholder="Selecione um estado"
                        onChange={(option: any) => onChange(option?.value)}
                        onBlur={onBlur}
                        value={UFsSelectOptions.filter((option) =>
                          value?.includes(option.value)
                        )}
                        defaultValue={UFsSelectOptions.filter((option) =>
                          value?.includes(option.value)
                        )}
                        className={`custom-select ${
                          errors.UF?.message && "danger"
                        }`}
                      />
                    )}
                  />
                  <p className="input-error">{errors.UF?.message}</p>
                </div>
                <div className="lbl">
                  <label htmlFor="cidade">Cidade: </label>
                  <Controller
                    name="cidade"
                    control={control}
                    render={({ field }) => (
                      <Input
                        icon="fas fa-location-dot"
                        type="text"
                        id="cidade"
                        placeholder="Cidade"
                        {...field}
                        {...(errors.cidade && { className: "danger" })}
                      />
                    )}
                  />
                  <p className="input-error">{errors.cidade?.message}</p>
                </div>
              </div>

              <div className="input-group no-wrap">
                <div className="lbl">
                  <label htmlFor="change-courses">Curso: </label>

                  <Controller
                    name="curso"
                    control={control}
                    render={({ field: { value, onChange, onBlur, ref } }) => (
                      <Select
                      unstyled
                      classNamePrefix="Select"
                        noOptionsMessage={() => "Não encontrado"}
                        ref={ref}
                        inputId="change-courses"
                        options={CursosSelectOptions}
                        placeholder="Selecione um curso"
                        onChange={(option: any) => onChange(option?.value)}
                        onBlur={onBlur}
                        value={CursosSelectOptions.filter((option) =>
                          value?.includes(option.value)
                        )}
                        defaultValue={CursosSelectOptions.filter((option) =>
                          value?.includes(option.value)
                        )}
                        className={`custom-select ${
                          errors.curso?.message && "danger"
                        }`}
                      />
                    )}
                  />
                  <p className="input-error">{errors.curso?.message}</p>
                </div>

                <div className="lbl" style={{ maxWidth: "70px" }}>
                  <label htmlFor="periodo">Período: </label>
                  <Controller
                    name="periodo"
                    control={control}
                    render={({ field }) => (
                      <ReactInputMask
                        maskPlaceholder={null}
                        mask="99"
                        {...field}
                      >
                        {/* @ts-ignore */}  
                        <Input
                          type="text"
                          id="periodo"
                          style={{ textAlign: "center" }}
                          {...(errors.periodo && { className: "danger" })}
                        />
                      </ReactInputMask>
                    )}
                  />
                  <p className="input-error">{errors.periodo?.message}</p>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="bottom-actions">
          <div className="flex-btn-login"></div>
          <div className="flex-btn-next">
            <button
              type="submit"
              className="btn-next"
              title="Confirmar cadastro"
              form="cadastroStep3"
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
