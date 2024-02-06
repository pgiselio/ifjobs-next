"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CircularProgressFluent from "../../../../components/General/circular-progress-fluent";
import { api } from "../../../../services/api";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "../../../../components/General/button";
import styled from "./styles.module.scss";
import Progressbar from "../../../../components/General/progress-bar";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "../../../../node_modules/pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function DownloadCurriculoPage() {
  const [curriculo, setCurriculo] = useState<any>();
  const [hasError, setHasError] = useState<any>();
  const [downloadCProgress, setDownloadCProgress] = useState(0);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [tryed, setTryed] = useState(false);
  const [scale, setScale] = useState(2);
  const [alertNotShowAgain, setAlertNotShowAgain] = useState(false);
  const [chkNotShow, setChkNotShow] = useState(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const router = useRouter();
  const params = router.query;
  useEffect(() => {
    let alertStatus = sessionStorage.getItem("CurriculoDownloadAlertDismiss");
    if (alertStatus === "true") {
      setAlertNotShowAgain(true);
    }
  }, []);
  useEffect(() => {
    if (params.id && !curriculo && !tryed) {
      getCurriculo();
    }
  });
  const getCurriculo = async () => {
    setTryed(true);
    const response = await api
      .get(`/curriculo/download/${params.id}`, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total)
            setDownloadCProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
        },
      })
      .catch((error) =>
        error.response.status === 401 || error.response.status === 403
          ? (window.location.href = "/logout")
          : (setHasError(error), error)
      );
    setCurriculo(response.data);
  };

  function setPageNumberHandler(page: number) {
    if (numPages) {
      if (page > 0 && page <= numPages) setPageNumber(page);
      else if (page < 1) setPageNumber(1);
      else if (page > numPages) setPageNumber(numPages);
    }
  }
  function setScaleHandler(scale: number) {
    if (scale > 0 && scale <= 4) {
      setScale(scale);
    }
  }

  if (!curriculo && !hasError) {
    return (
      <>
        <Progressbar
          progress={downloadCProgress}
          backgroundColor="transparent"
        />
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: downloadCProgress + "%",
            height: 0,
            background: "trasparent",
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
      <div
        className={styled.loadingDefs}
        style={{
          flexDirection: "column",
        }}
      >
        <div className={styled.loadingDefs}>
          <i
            style={{ fontSize: 30, color: "var(--text-b)" }}
            className="fas fa-info-circle"
          ></i>
          <span>Currículo não encontrado</span>
        </div>
        <span style={{ fontSize: 13 }}>{hasError.message}</span>
      </div>
    );
  } else {
    let blob = curriculo;
    blob.name = `curriculo-${params.id}.pdf`;
    const url = URL.createObjectURL(blob);
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
                Para uma melhor vizualização sempre opte por baixar o arquivo
                ou, caso esteja em um computador, clique com o botão direito em
                "Download" e abra o link em uma nova aba.
              </AlertDialog.Description>
              <div
                className="alert-buttons AlertDialogActions"
                data-reach-alert-dialog-actions
              >
                <div className="chk">
                  <input type="checkbox" id="byebye" onChange={(e) => setChkNotShow(e.currentTarget.checked)}/>
                  <label htmlFor="byebye">Não mostrar novamente</label>
                </div>
                <AlertDialog.Cancel asChild>
                  <Button onClick={() => {
                    if (chkNotShow) {
                      sessionStorage.setItem("CurriculoDownloadAlertDismiss", "true");
                    }
                  }}>Ok!</Button>
                </AlertDialog.Cancel>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
        )}
        <main className={styled.mainContainer}>
          <div className={styled.controlsContainer}>
            <div className={styled["controls"]}>
              <div
                className={
                  styled.pagination +
                  (numPages && numPages > 1 ? " " + styled.display : "")
                }
              >
                <button
                  onClick={() => {
                    if (pageNumber > 1) {
                      setPageNumber(pageNumber - 1);
                    }
                  }}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span>
                  <input
                    type="text"
                    onClick={(e) => e.currentTarget.select()}
                    onChange={(e) =>
                      setPageNumberHandler(parseInt(e.target.value))
                    }
                    value={pageNumber}
                  />{" "}
                  de {numPages}
                </span>
                <button
                  onClick={() => {
                    if (pageNumber < (numPages || 1)) {
                      setPageNumber(pageNumber + 1);
                    }
                  }}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>

              <a href={url} download={blob.name}>
                <button type="button">
                  <i className="fas fa-arrow-down"></i> Download
                </button>
              </a>
              <div className={styled.zoomControls}>
                <button
                  onClick={() => {
                    setScaleHandler(scale - 0.5);
                  }}
                >
                  <i className="fas fa-search-minus"></i>
                </button>
                <button
                  onClick={() => {
                    setScaleHandler(scale + 0.5);
                  }}
                >
                  <i className="fas fa-search-plus"></i>
                </button>
              </div>
            </div>
          </div>

          <div className={styled.document}>
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              loading="Carregando vizualização..."
              error="Falha ao carregar o arquivo (você ainda pode tentar baixa-lo)"
              noData="Nenhum arquivo PDF especificado."
            >
              <Page
                pageNumber={pageNumber}
                loading="Carregando..."
                scale={scale}
              />
            </Document>
          </div>
        </main>
      </>
    );
  }
}
