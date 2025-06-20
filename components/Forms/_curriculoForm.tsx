import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../General/button";
import { useAuth } from "../../hooks/useAuth";
import * as Yup from "yup";
import { api } from "../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "../../styles/_Pages/sys/settings-conta.module.scss";
import prettyBytes from "pretty-bytes";
import Progressbar from "../General/progress-bar";
import Link from "next/link";

export function CurriculoForm() {
  const auth = useAuth();
  const [curriculo, setCurriculo] = useState<File | undefined>(undefined);
  const [sending, setSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const toastId = useRef<string | number | null>(null);
  const controller = new AbortController();

  let validationSchema = Yup.object().shape({
    arquivo: Yup.mixed().required("É necessário selecionar um arquivo"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      arquivo: curriculo,
    },
    resolver: yupResolver(validationSchema),
  });
  const maxSize = 10000000;
  const { getRootProps, getInputProps, open, rootRef } = useDropzone({
    accept: {
      "application/pdf": [],
    },
    maxFiles: 1,
    noClick: true,
    multiple: false,
    maxSize: maxSize,
    disabled: sending,
    onDrop: (acceptedFiles) => {
      setUploaded(false);
      setCurriculo(acceptedFiles[0]);
      setValue("arquivo", acceptedFiles[0]);
    },
    onDragEnter: () => {
      rootRef.current?.classList.add("active");
    },
    onDragLeave: () => {
      rootRef.current?.classList.remove("active");
    },
    onDropAccepted: () => {
      rootRef.current?.classList.remove("active");
      rootRef.current?.classList.add("accepted");
    },
    onDropRejected: () => {
      rootRef.current?.classList.remove("active");
      rootRef.current?.classList.remove("accepted");
      rootRef.current?.classList.add("rejected");
      toast.warning(
        `O arquivo deve ser um PDF menor que ${prettyBytes(maxSize)}!`
      );
    },
  });

  async function onSubmit(data: any) {
    if (sending) return;
    const formData = new FormData();
    const file = data.arquivo;
    formData.append("arquivo", file);
    await api
      .patch(`/curriculo/atualizaArquivo/${auth.userInfo?.email}`, formData, {
        signal: controller.signal,
        onUploadProgress: (progressEvent) => {
          setSending(true);
          if (progressEvent.total && progressEvent.loaded) {
            const progress = progressEvent.loaded / progressEvent.total;
            setSendingProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
            if (toastId.current === null) {
              toastId.current = toast(
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  Enviando currículo...
                  <Button
                    type="button"
                    title="Cancelar envio"
                    className="less-radius red"
                    onClick={() => {
                      controller.abort();
                      toast.warn("Envio cancelado!");
                    }}
                  >
                    <i className="fas fa-close"></i>
                  </Button>
                </div>,
                {
                  progress,
                  isLoading: true,
                  theme: "light",
                  progressStyle: { background: "var(--accent-color)" },
                  autoClose: false,
                  closeButton: false,
                  closeOnClick: false,
                  position: "bottom-right",
                }
              );
            } else {
              toast.update(toastId.current, { progress });
            }
          }
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUploaded(true);
          setValue("arquivo", "");
        }
        toast.success("Currículo enviado com sucesso!");
      })
      .catch((err) => {
        if (err.status === 500) {
          toast.error("Ops... algo não deu certo!", {});
        }
        if (err.status === 403 || err.status === 401) {
          toast.error("Você não tem autorização para executar essa ação!");
        } else {
          console.error(err);
        }
      })
      .finally(() => {
        setSending(false);
        setSendingProgress(0);
        if (toastId.current !== null) {
          toast.dismiss(toastId.current);
        }
        toastId.current = null;
      });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} id="curriculo-form" className={styled.curriculoFormStyle}>
      <div {...getRootProps({ className: "dropzone" })} onClick={open}>
        <input type="file" {...register("arquivo")} {...getInputProps()} />

        {curriculo ? (
          <div className="selected-file">
            <p className="preview">
              <i className="fa-solid fa-file-pdf"></i>
            </p>
            <div className="file-details">
              <p className="file-name">{curriculo.name}</p>
              <p className="file-size">{prettyBytes(curriculo.size)}</p>
              <Progressbar progress={sendingProgress} />
            </div>
            <p className="status">
              <i className={`fa-solid fa-check ${uploaded ? "done" : ""}`}></i>
            </p>
          </div>
        ) : (
            <p>Clique ou arraste o arquivo para cá</p>
        )}
      </div>
      <p className="maxMessage">
        O currículo deve ser do tipo <strong>PDF</strong> e ter no máximo
        <strong>{prettyBytes(maxSize)}</strong>
      </p>
      <div className="group-buttons">
        <Button
          type="button"
          className="select-new less-radius secondary"
          onClick={open}
          {...(sending && { disabled: true })}
        >
          <i className="fa-solid fa-file"></i> Selecionar arquivo
        </Button>
        <Link href="/curriculo" className="link" passHref>
          <i className="fa-solid fa-share"></i> Ver exemplo
        </Link>
      </div>
      <p className="input-error">{errors.arquivo?.message}</p>
    </form>
  );
}
