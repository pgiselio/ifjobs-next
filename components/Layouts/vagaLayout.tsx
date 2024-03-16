import { ReactNode, useEffect, useRef, useState } from "react";

import Error404 from "../../pages/404";
import { TabsMenu, TabsMenuItem } from "../SystemLayout/tabs-menu";
import { vaga } from "../../types/vagaType";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { Skeleton } from "../General/skeleton-load";
import { ProfilePic } from "../SystemLayout/profile-pic/profile-pic";
import styled from "../../pages/sys/vagas/[id]/style.module.scss";
import { PillItem, PillList } from "../General/pill";
import { Button } from "../General/button";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { useVagas } from "../../hooks/useVagas";
import Link from "next/link";
import { SystemLayout } from "./_sysLayout";
import CircularProgressFluent from "../General/circular-progress-fluent";
import Head from "next/head";
import { useAlertDialog } from "../../hooks/useAlertDialog";

export default function VagaPageLayout({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const router = useRouter();
  const useVaga = useVagas();
  const alert = useAlertDialog();

  let params = router.query;

  const [isCandidatoSubscribed, setIsCandidatoSubscribed] = useState(false);
  const [isOpenCloseOnProgress, setIsOpenCloseOnProgress] = useState(false);

  const subscribeBtnRef = useRef<HTMLButtonElement>(null);

  const { data, isFetching } = useQuery<vaga>({
    queryKey: [`vaga-${params.id}`],
    queryFn: async () => {
      const response = await api
        .get(`/vaga/lista/${params.id}`)
        .catch((error) => (error.response.status === 400 ? null : error));
      return response?.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!params.id,
  });

  const cancelUnsubRef = useRef(null);
  function inscreverOuDesinscreverAluno() {
    if (
      !(
        auth.userInfo?.aluno?.dadosPessoa &&
        (data?.status === "INATIVO" ||
          data?.cursoAlvo.localeCompare(
            auth.userInfo?.aluno?.curso,
            undefined,
            {
              sensitivity: "accent",
            }
          ))
      )
    ) {
      if (isCandidatoSubscribed) {
        alert({title: "Tem certeza que deseja se desinscrever desta vaga?"}).then(() => desinscreverAluno());
      } else {
        subscribeBtnRef.current &&
          subscribeBtnRef.current.setAttribute("disabled", "");
        inscreverAluno();
      }
    } else {
      toast.error(subscribeBtnRef.current?.title, {
        position: "bottom-center",
        hideProgressBar: true,
        toastId: "subscribe-btn-disabled",
      });
    }
  }
  async function inscreverAluno() {
    if (!auth.userInfo?.aluno?.id || !params.id) return;
    useVaga.subscribe({
      vagaId: params.id,
      candidatoId: auth.userInfo?.aluno?.id,
    });
  }
  async function desinscreverAluno() {
    if (!auth.userInfo?.aluno?.id || !params.id) return;
    useVaga.unsubscribe({
      vagaId: params.id,
      candidatoId: auth.userInfo?.aluno?.id,
    });
  }

  useEffect(() => {
    if (auth.userInfo?.id && data?.alunos.includes(auth.userInfo?.id)) {
      setIsCandidatoSubscribed(true);
    } else {
      setIsCandidatoSubscribed(false);
    }
  }, [auth.userInfo?.id, data?.alunos]);

  function abrirEncerrarInscricoes() {
    if (data?.status === "ATIVO") {
      alert({
        title: "Tem certeza que deseja desativar esta vaga?",
        description:
          "A vaga não poderá ser editada e nem aceitará novas inscrições, mas continuará sendo visível para todos.",
      }).then(() => encerrarInscricoes());
    } else {
      abrirInscricoes();
    }
  }
  async function encerrarInscricoes() {
    if (!data) {
      return;
    }
    setIsOpenCloseOnProgress(true);
    await useVaga.close(data.id);
    setIsOpenCloseOnProgress(false);
  }
  async function abrirInscricoes() {
    if (!data) {
      return;
    }
    setIsOpenCloseOnProgress(true);
    await useVaga.open(data.id);
    setIsOpenCloseOnProgress(false);
  }

  let date;
  let dateFormatted;
  if (data) {
    date = new Date(data.dataCriacao);
    dateFormatted = new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
  } else if (!isFetching) {
    return (
      <SystemLayout>
        <Error404 />
      </SystemLayout>
    );
  }

  return (
    <SystemLayout>
      <Head>{data && <title>Vaga: {data.titulo} - IFJobs</title>}</Head>
      <section className={styled.vagaPageStyle}>
        <div className="vaga-page-header-container content">
          <div className="vaga-page-header ">
            <div className="empresa-info">
              {!data && isFetching ? (
                <>
                  <Skeleton variant="square" className="profile-pic" />
                </>
              ) : (
                <>
                  <ProfilePic userId={data?.empresa.id} isCompany />
                </>
              )}
            </div>
            {!data && isFetching ? (
              <>
                <Skeleton variant="text" width="300px" height="43px" />
                <Skeleton variant="text" width="150px" height="25px" />
              </>
            ) : (
              <>
                <h2>{data?.titulo}</h2>
                <Link href={`/sys/profile/${data?.empresa?.id}`} passHref>
                  {data?.empresa?.dadosPessoa.nome}
                </Link>
              </>
            )}
            <div className="subscribe">
              <div
                className={
                  "vaga-status " + (data?.status === "ATIVO" ? "enabled" : "")
                }
              >
                {data?.status === "ATIVO" ? "ATIVO" : "INATIVO"}
              </div>
              {data &&
                ((!auth.authorities?.includes("ALUNO") &&
                  auth.userInfo?.id === data.empresa?.id) ||
                  auth.authorities?.includes("ADMIN")) && (
                  <Button
                    className={`less-radius ${
                      data.status === "ATIVO" ? "red" : "secondary"
                    }`}
                    onClick={abrirEncerrarInscricoes}
                    {...((isFetching || isOpenCloseOnProgress) && {
                      disabled: true,
                    })}
                  >
                    {isOpenCloseOnProgress && (
                      <CircularProgressFluent
                        height={20}
                        width={20}
                        color="white"
                        duration=".5s"
                      />
                    )}
                    {data.status === "ATIVO"
                      ? "Encerrar inscrições"
                      : "Reabrir inscrições"}
                  </Button>
                )}
              {auth.userInfo?.aluno?.dadosPessoa && (
                <>
                  <Button
                    type="submit"
                    ref={subscribeBtnRef}
                    onClick={inscreverOuDesinscreverAluno}
                    className={`less-radius ${
                      isCandidatoSubscribed ? "red" : ""
                    }`}
                    {...((data?.status === "INATIVO" ||
                      data?.cursoAlvo.localeCompare(
                        auth.userInfo?.aluno?.curso,
                        undefined,
                        { sensitivity: "accent" }
                      )) && {
                      disabled: true,
                      title:
                        data?.status === "INATIVO"
                          ? "A vaga não aceita novas inscrições"
                          : "Voce não está no curso alvo para esta vaga",
                      onTouchEnd: () =>
                        toast.error(subscribeBtnRef.current?.title, {
                          position: "bottom-center",
                          hideProgressBar: true,
                          toastId: "subscribe-btn-disabled",
                        }),
                    })}
                    {...(isFetching && {
                      disabled: true,
                    })}
                  >
                    <span>
                      {isCandidatoSubscribed
                        ? "Desinscrever-se"
                        : "Inscrever-se"}
                    </span>
                  </Button>
                 
                </>
              )}
            </div>
          </div>
        </div>
        <TabsMenu
          sticky
          size="medium"
          isOntop
          className="tabs"
          items={[
            {
              to: `/sys/vagas/${params.id}`,
              title: "Detalhes",
            },
            {
              to: `/sys/vagas/${params.id}/candidatos`,
              title: "Candidatos",
              highlighted: data ? data?.alunos.length + "" : "",
            },
          ]}
        />
        <div className="content">
          <div className="vaga-page-info">
            <PillList style={{ marginTop: 10 }}>
              <PillItem>
                <i className="fas fa-calendar-day"></i>
                {!data && isFetching ? (
                  <Skeleton variant="text" width="130px" height="25px" />
                ) : (
                  <span>{dateFormatted}</span>
                )}
              </PillItem>
              <PillItem>
                <i className="fas fa-map-marker-alt"></i>
                {!data && isFetching ? (
                  <Skeleton variant="text" width="150px" height="25px" />
                ) : (
                  <span>{data?.localizacao}</span>
                )}
              </PillItem>
              <PillItem>
                <i className="fas fa-book-open"></i>
                {!data && isFetching ? (
                  <Skeleton variant="text" width="150px" height="25px" />
                ) : (
                  <span>{data?.cursoAlvo}</span>
                )}
              </PillItem>
            </PillList>
          </div>
          <div className="vaga-navigation">
            {!data && isFetching ? (
              <Skeleton
                variant="square"
                width="100%"
                height="300px"
                style={{ marginTop: "20px" }}
              />
            ) : (
              children
            )}
          </div>
        </div>
      </section>
    </SystemLayout>
  );
}
