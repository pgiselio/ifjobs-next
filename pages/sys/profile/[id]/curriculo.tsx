"use client";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import CircularProgressFluent from "../../../../components/General/circular-progress-fluent";
import { api } from "../../../../services/api";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "../../../../components/General/button";
import styled from "./styles.module.scss";
import Progressbar from "../../../../components/General/progress-bar";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { RequireAuth } from "../../../../contexts/AuthContext/RequireAuth";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../../../types/user";
import { getNomeAbreviado } from "../../../../utils/getNomeAbreviado";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "../../../../node_modules/pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

type CurriculoDocumentProps = {
  url: string;
  onLoadSuccess: ({ numPages }: { numPages: number }) => void;
  pageNumber: number;
  scale: number;
};

const CurriculoDocument = memo(function CurriculoDocument({
  url,
  onLoadSuccess,
  pageNumber,
  scale,
}: CurriculoDocumentProps) {
  return (
    <div className={styled.document}>
      <Document
        file={url}
        onLoadSuccess={onLoadSuccess}
        loading="Carregando visualização..."
        error="Falha ao carregar o arquivo (você ainda pode tentar baixá-lo)"
        noData="Nenhum arquivo PDF especificado."
      >
        <Page pageNumber={pageNumber} loading="Carregando..." scale={scale} />
      </Document>
    </div>
  );
});

export default function DownloadCurriculoPage() {
  const [curriculo, setCurriculo] = useState<Blob | null>(null);
  const [hasError, setHasError] = useState<Error | null>(null);
  const [downloadCProgress, setDownloadCProgress] = useState(0);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [tryed, setTryed] = useState(false);
  const [scale, setScale] = useState(2);
  const [alertNotShowAgain, setAlertNotShowAgain] = useState(false);
  const [chkNotShow, setChkNotShow] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const [notFound, setNotFound] = useState(false);

  const { data, isFetching } = useQuery<User>({
    queryKey: ["profile-" + id],
    queryFn: async () => {
      try {
        const response = await api.get(`/usuario/${id}`);
        return response.data;
      } catch (err: any) {
        if (err.response?.status === 404 || err.response?.status === 400) {
          setNotFound(true);
        }
        return null;
      }
    },
    staleTime: 1000 * 60 * 2,
    enabled: !!id && !notFound,
    retry: 1,
  });

  useEffect(() => {
    if (!isFetching && !data?.aluno) {
      setHasError(new Error("Este tipo de usuário não possui currículo."));
    }
  }, [data, isFetching]);

  useEffect(() => {
    const alertStatus = sessionStorage.getItem("CurriculoDownloadAlertDismiss");
    if (alertStatus === "true") {
      setAlertNotShowAgain(true);
    }
  }, []);

  const getCurriculo = useCallback(async () => {
    if (!data?.aluno?.curriculo) return;
    setTryed(true);
    try {
      const response = await api.get(`/curriculo/download/${data.aluno.curriculo}`, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setDownloadCProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }
        },
      });
      setCurriculo(response.data);
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        window.location.href = "/logout";
      } else {
        setHasError(error);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!isFetching && data?.aluno?.curriculo && !curriculo && !tryed) {
      getCurriculo();
    }
  }, [isFetching, data, curriculo, tryed, getCurriculo]);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => setNumPages(numPages),
    []
  );

  const setPageNumberHandler = useCallback(
    (page: number) => {
      if (!numPages) return;
      if (page < 1) setPageNumber(1);
      else if (page > numPages) setPageNumber(numPages);
      else setPageNumber(page);
    },
    [numPages]
  );

  const setScaleHandler = useCallback(
    (newScale: number) => {
      if (newScale > 0 && newScale <= 4) setScale(newScale);
    },
    []
  );

  const url = useMemo(
    () => (curriculo ? URL.createObjectURL(curriculo) : null),
    [curriculo]
  );

  useEffect(() => {
    if (!url) return;
    return () => URL.revokeObjectURL(url);
  }, [url]);

  if (!curriculo && !hasError) {
    return (
      <>
        <Progressbar progress={downloadCProgress} backgroundColor="transparent" />
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: downloadCProgress + "%",
            height: 0,
            background: "transparent",
          }}
        >
          <span
            style={{
              position: "absolute",
              right: 0,
              top: 10,
              color: "var(--text-b)",
              fontWeight: "500",
            }}
          >
            {downloadCProgress}%
          </span>
        </div>
        <div className={styled.loadingDefs}>
          <CircularProgressFluent height={"40px"} width={"40px"} />
          <span>Carregando currículo do servidor</span>
        </div>
      </>
    );
  }

  if (hasError) {
    return (
      <div className={styled.loadingDefs} style={{ flexDirection: "column" }}>
        <div className={styled.loadingDefs}>
          <i style={{ fontSize: 30, color: "var(--text-b)" }} className="fas fa-info-circle"></i>
          <span>Currículo não encontrado</span>
        </div>
        <span style={{ fontSize: 13 }}>{hasError.message}</span>
      </div>
    );
  }

  if (!curriculo) return null;

  if (!url) return null;

  const nomeAbreviado = getNomeAbreviado(data?.aluno?.dadosPessoa?.nome || "");
  const fileName = `[${id}] ${nomeAbreviado}.pdf`;

  return (
    <>
      {!alertNotShowAgain && (
        <AlertDialog.Root defaultOpen>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="AlertDialogOverlay" />
            <AlertDialog.Content className="AlertDialogContent">
              <AlertDialog.Title className="AlertDialogTitle">
                Informação importante!
              </AlertDialog.Title>
              <AlertDialog.Description className="AlertDialogDescription">
                Para uma melhor visualização, sempre opte por baixar o arquivo
                ou, caso esteja em um computador, clique com o botão direito em
                &quot;Download&quot; e abra o link em uma nova aba.
              </AlertDialog.Description>
              <div className="alert-buttons AlertDialogActions" data-reach-alert-dialog-actions>
                <div className="chk">
                  <input
                    type="checkbox"
                    id="byebye"
                    checked={chkNotShow}
                    onChange={(e) => setChkNotShow(e.currentTarget.checked)}
                  />
                  <label htmlFor="byebye" style={{ color: "var(--text-a)" }}>
                    Não mostrar novamente
                  </label>
                </div>
                <AlertDialog.Cancel asChild>
                  <Button
                    className="less-radius"
                    onClick={() => {
                      if (chkNotShow) {
                        sessionStorage.setItem("CurriculoDownloadAlertDismiss", "true");
                        setAlertNotShowAgain(true);
                      }
                    }}
                  >
                    Ok!
                  </Button>
                </AlertDialog.Cancel>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      )}
      <main className={styled.mainContainer}>
        <div className={styled.controlsContainer}>
          <div className={styled.controls}>
            <div
              className={
                styled.pagination +
                (numPages && numPages > 1 ? " " + styled.display : "")
              }
            >
              <button
                type="button"
                onClick={() => setPageNumberHandler(pageNumber - 1)}
                disabled={pageNumber <= 1}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <span>
                <input
                  type="text"
                  onClick={(e) => e.currentTarget.select()}
                  onChange={(e) => setPageNumberHandler(Number(e.target.value))}
                  value={pageNumber}
                  style={{ width: 30, textAlign: "center" }}
                />{" "}
                de {numPages}
              </span>
              <button
                type="button"
                onClick={() => setPageNumberHandler(pageNumber + 1)}
                disabled={pageNumber >= (numPages || 1)}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            <a href={url} download={fileName}>
              <i className="fas fa-arrow-down"></i> Download
            </a>
            <div className={styled.zoomControls}>
              <button type="button" onClick={() => setScaleHandler(scale - 0.5)} disabled={scale <= 0.5}>
                <i className="fas fa-search-minus"></i>
              </button>
              <button type="button" onClick={() => setScaleHandler(scale + 0.5)} disabled={scale >= 4}>
                <i className="fas fa-search-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <CurriculoDocument
          url={url}
          onLoadSuccess={onDocumentLoadSuccess}
          pageNumber={pageNumber}
          scale={scale}
        />
      </main>
    </>
  );
}

DownloadCurriculoPage.getLayout = (page: any) => <RequireAuth>{page}</RequireAuth>;
