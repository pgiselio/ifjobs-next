// import { Editor, EditorState } from "draft-js";
// import { useState } from "react";

import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

import { Input } from "../General/input";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { queryClient } from "../../services/queryClient";
import { Button } from "../General/button";
import styled from "../../styles/_Pages/sys/styleForm.module.scss";
import { CursosSelectOptions } from "../../utils/selectLists";
import { SystemLayout } from "./_sysLayout";
import Select from "react-select";
import dynamic from "next/dynamic";
import { useVagas } from "../../hooks/useVagas";
import { vaga } from "../../types/vagaType";
import Link from "next/link";
const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export function CriarNovaVagaForm({ vaga }: { vaga?: vaga }) {
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );
  const auth = useAuth();
  const vagaActions = useVagas();
  const maxDescriptionLength = 1000;

  const [empresaCNPJ, setEmpresaCNPJ] = useState<string | null>();
  const [remainigDescriptionLength, setRemainigDescriptionLength] =
    useState(maxDescriptionLength);

  useEffect(() => {
    setEmpresaCNPJ(auth.userInfo?.empresa?.cnpj);
  }, [auth.userInfo]);

  let cursos = CursosSelectOptions.map(({ value }) => value);

  let validationSchema;
  if (empresaCNPJ || vaga?.empresa?.cnpj) {
    validationSchema = Yup.object().shape({
      titulo: Yup.string().required("Este campo é obrigatório"),
      localidade: Yup.string().required("Este campo é obrigatório"),
      cursoAlvo: Yup.string()
        .oneOf([...cursos], "O curso selecionado não é válido")
        .required("Este campo é obrigatório"),
      descricao: Yup.string()
        .required("Este campo é obrigatório")
        .max(
          maxDescriptionLength,
          `Máximo de ${maxDescriptionLength} caracteres`
        ),
      cnpj: Yup.string().notRequired().nonNullable(),
    });
  } else {
    validationSchema = Yup.object().shape({
      titulo: Yup.string().required("Este campo é obrigatório"),
      localidade: Yup.string().required("Este campo é obrigatório"),
      cursoAlvo: Yup.string()
        .oneOf([...cursos], "O curso selecionado não é válido")
        .required("Este campo é obrigatório"),
      descricao: Yup.string()
        .required("Este campo é obrigatório")
        .max(
          maxDescriptionLength,
          `Máximo de ${maxDescriptionLength} caracteres`
        ),
      cnpj: Yup.string()
        .required("Este campo é obrigatório")
        .min(18, "CNPJ inválido"),
    });
  }
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        titulo: vaga?.titulo || "",
        localidade: vaga?.localizacao || "",
        cursoAlvo: vaga?.cursoAlvo || "",
        descricao: vaga?.descricao || "",
        cnpj: empresaCNPJ || vaga?.empresa?.cnpj || "",
      };
    }, [vaga, empresaCNPJ]),
    resolver:
      yupResolver<Yup.InferType<typeof validationSchema>>(validationSchema),
  });

  async function onSubmit({
    titulo,
    localidade,
    cursoAlvo,
    descricao,
    cnpj,
  }: any) {
    if (vaga?.id) {
      vagaActions.edit(vaga.id, [
        { op: "replace", path: "/titulo", value: titulo },
        { op: "replace", path: "/localizacao", value: localidade },
        { op: "replace", path: "/descricao", value: descricao },
        { op: "replace", path: "/cursoAlvo", value: cursoAlvo },
      ]);
    } else {
      await api
        .post("/vaga/create", {
          cursoAlvo,
          titulo,
          localizacao: localidade,
          descricao,
          cnpj: auth?.authorities?.includes("EMPRESA")
            ? empresaCNPJ
            : cnpj.replaceAll(".", "").replaceAll("/", "").replaceAll("-", ""),
          dataCriacao: new Date(),
        })
        .then((response) => {
          if (response.status === 201) {
            toast.success("Vaga criada com sucesso!");
            reset();
            queryClient.invalidateQueries({ queryKey: ["vagas"] });
          }
        })
        .catch((err) => {
          if (err.status === 500) {
            toast.error("Ops... algo não deu certo!", {});
          }
          if (err.response.status === 403 || err.response.status === 401) {
            toast.error("Você não tem autorização para executar essa ação!");
          } else {
            console.error(err);
          }
        });
    }
  }
  if (auth?.authorities?.includes("ALUNO")) {
    return (
        <h2>SEM PERMISSÃO</h2>
    );
  }
  return (
    <form
      className={"form-create-vaga " + styled.criarVagaFormStyle}
      id="form-create-vaga"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="lbl">
        <Controller
          name="titulo"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="vaga-title"
              placeholder="Título"
              {...field}
              {...(errors.titulo && { className: "danger" })}
            />
          )}
        />
        <p className="input-error">{errors.titulo?.message}</p>
      </div>
      <div className="form-item-group" style={{ width: "100%" }}>
        <div className="lbl">
          <label htmlFor="vaga-location"> </label>
          <Controller
            name="localidade"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                id="vaga-location"
                placeholder="Localização da vaga"
                {...field}
                {...(errors.localidade && { className: "danger" })}
              />
            )}
          />
          <p className="input-error">{errors.localidade?.message}</p>
        </div>
        <div className="lbl">
          <label htmlFor="change-courses"> </label>

          <Controller
            name={"cursoAlvo"}
            control={control}
            render={({ field: { value, onChange, onBlur, ref } }) => {
              return (
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
                  className={`${errors.cursoAlvo?.message && "danger"}`}
                />
              );
            }}
          />
          <p className="input-error">{errors.cursoAlvo?.message}</p>
        </div>
      </div>
      {auth?.authorities?.includes("ADMIN") && (
        <div className="lbl">
          <label htmlFor="cnpj">Empresa gerente da vaga: </label>
          {vaga && <Link href={`/sys/profile/${vaga?.empresa?.id}`} target="_blank" passHref>{vaga.empresa?.dadosPessoa.nome}</Link>}
          <Controller
            name="cnpj"
            control={control}
            render={({ field: { value, ref, ...rest } }) => (
              <InputMask
                maskPlaceholder={null}
                mask="99.999.999/9999-99"
                value={value}
                inputRef={ref}
                {...rest}
                {...(vaga && { disabled: true })}
              >
                <Input
                  type="text"
                  id="cnpj"
                  placeholder="CNPJ"
                  {...(errors.cnpj && { className: "danger" })}
                />
              </InputMask>
            )}
          />
          <p className="input-error">{errors.cnpj?.message}</p>
        </div>
      )}

      <div className="lbl">
        <label htmlFor="desc">Descrição: </label>
        {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
        <div id="descriptionVaga"></div>
        <div className="description-container">
          <Controller
            name="descricao"
            control={control}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                placeholder="Descrição da vaga..."
                {...field}
              />
              // <textarea
              //   style={{
              //     resize: "vertical",
              //     minHeight: "150px",
              //     maxHeight: "250px",
              //     height: 150,
              //     padding: "5px",
              //   }}
              //   placeholder="Descrição da vaga..."
              //   {...(errors.descricao && { className: "danger" })}
              //   id="desc"
              //   rows={10}
              //   maxLength={maxDescriptionLength}
              //   onKeyDown={() => {
              //     let currentValue = maxDescriptionLength - field.value.length;
              //     setRemainigDescriptionLength(currentValue);
              //   }}
              //   onKeyUp={() => {
              //     let currentValue = maxDescriptionLength - field.value.length;
              //     setRemainigDescriptionLength(currentValue);
              //   }}
              //   {...field}
              // ></textarea>
            )}
          />
          {/* <div
            className={`counter-box ${
              remainigDescriptionLength === 0 ? "danger" : ""
            }`}
          >
            <span id="count">{remainigDescriptionLength}</span>
          </div> */}
        </div>
        <p className="input-error">{errors.descricao?.message}</p>
      </div>
      <div className="buttons-container">
        <Button type="submit" id="submit-form">
          {vaga ?  "Salvar edição" : "Criar" }
        </Button>
      </div>
    </form>
  );
}
