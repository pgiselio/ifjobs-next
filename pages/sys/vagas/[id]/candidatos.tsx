import { useRouter } from "next/router";
import { useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Box, BoxMessage, BoxTitle } from "../../../../components/General/box";
import { Button } from "../../../../components/General/button";
import CircularProgressFluent from "../../../../components/General/circular-progress-fluent";
import { ProfilePic } from "../../../../components/SystemLayout/profile-pic/profile-pic";
import { api } from "../../../../services/api";
import { User } from "../../../../types/user";
import { vaga } from "../../../../types/vagaType";
import VagaPageLayout from "../../../../components/Layouts/vagaLayout";
import Skeleton from "react-loading-skeleton";
import { useVagas } from "../../../../hooks/useVagas";
import { SystemLayout } from "../../../../components/Layouts/_sysLayout";
import { getNomeAbreviado } from "../../../../utils/getNomeAbreviado";

async function baixarCurriculosSelecionados(checkedList: number[], userQueries: any[]) {
  for (const idx of checkedList) {
    const userId = userQueries[idx]?.data?.id;
    const curriculoId = userQueries[idx]?.data?.aluno?.curriculo;
    const nome = userQueries[idx]?.data?.aluno?.dadosPessoa.nome;
    if (!userId) continue;
    try {
      const response = await api.get(`/curriculo/download/${curriculoId}`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      
      const nomeAbreviado = getNomeAbreviado(nome);
      
      a.href = url;
      a.download = `[${userId}] ${nomeAbreviado}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(`Erro ao baixar currículo do usuário ${userId}`, err);
    }
  }
}

export default function VagaCandidatoPage() {
  const router = useRouter();
  const vagas = useVagas();
  const params = router.query;
  const { data, isFetching } = useQuery<vaga>({
    queryKey: ["vaga-" + params.id],
    queryFn: () => vagas.getFn(params.id),
    refetchOnWindowFocus: false,
    enabled: !!params.id,
    staleTime: 1000 * 60 * 2,
  });
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  async function fetchUserById(userId: number) {
    const response = await api.get<User>(`/usuario/${userId}`);
    return response.data;
  }

  const userQueries = useQueries({
    queries:
      data?.alunos.map((userId) => ({
        queryKey: ["user", userId],
        queryFn: () => fetchUserById(userId),
      })) || [],
  });

  if (!data) {
    return (
      <p
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          padding: "30px",
        }}
      >
        <CircularProgressFluent
          color="var(--accent-color)"
          height="30px"
          width="30px"
          duration=".9s"
        />
        Carregando...
      </p>
    );
  }

  const allChecked =
    checkedList.length === data.alunos.length && data.alunos.length > 0;

  return (
    <Box>
      {data.alunos.length > 0 ? (
        <>
          <BoxTitle>
            <div className="d-flex justify-content-between align-items-center flex-1">
              {!selectionMode ? (
                <h2>Candidatos</h2>
              ) : (
                <>
                  <span className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="candidato-checkall"
                      onChange={() =>
                        setCheckedList(
                          allChecked
                            ? []
                            : data.alunos.map((_, idx) => idx)
                        )
                      }
                      checked={allChecked}
                    />
                    <label htmlFor="candidato-checkall">
                      Selecionar tudo
                    </label>
                  </span>
                </>
              )}
              <Button
                className="less-radius secondary"
                onClick={() => {
                  setSelectionMode(!selectionMode);
                  if (selectionMode) {
                    setCheckedList([]);
                  }
                }}
              >
                {selectionMode ? "Cancelar seleção" : "Selecionar candidatos"}
              </Button>
            </div>
          </BoxTitle>
          <span>
            <ul
              className={
                "lista-candidatos" +
                (checkedList.length > 0 || selectionMode ? " selection-mode" : "")
              }
            >
              {userQueries.length > 0 ? (
                userQueries.map((candidato: any, index: number) => {
                  const userId = candidato.data?.id;
                  const nome = candidato.data?.aluno?.dadosPessoa.nome;
                  const email = candidato.data?.email;
                  const checked = checkedList.includes(index);
                  console.log(
                    `Candidato ${nome} (${index}) - Carregando: ${candidato.isLoading}`
                  );
                  const candidatoData =
                    !candidato || candidato.isLoading ? (
                      <>
                        <ProfilePic className="candidato-pic" />
                        <div className="candidato-info">
                          <h3>
                            <Skeleton width={150} />
                          </h3>
                          <span>
                            <Skeleton width={100} />
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <ProfilePic userId={userId} className="candidato-pic" />
                        <div className="candidato-info">
                          <h3>{nome}</h3>
                          <span>{email}</span>
                        </div>
                      </>
                    );
                  return (
                    <li className="candidato" key={index}>
                      <input
                        type="checkbox"
                        className="candidato-list-check"
                        aria-label={`Selecionar candidato '${nome}'`}
                        id={`candidato-check-${index}`}
                        checked={checked}
                        disabled={!selectionMode}
                        onChange={(e) => {
                          setCheckedList(
                            e.target.checked
                              ? [...checkedList, index]
                              : checkedList.filter((i) => i !== index)
                          );
                        }}
                      />
                      {selectionMode ? (
                        <label
                          className="candidato-group"
                          htmlFor={`candidato-check-${index}`}
                        >
                          {candidatoData}
                        </label>
                      ) : (
                        <a
                          href={"../../profile/" + userId}
                          className="candidato-group"
                          target="_blank"
                          rel="noreferrer"
                          {...(candidato.isLoading && { "aria-busy": true })}
                          aria-label={`Ver perfil de ${nome}`}
                        >
                          {candidatoData}
                        </a>
                      )}
                    </li>
                  );
                })
              ) : (
                <p
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    padding: "30px",
                  }}
                >
                  <CircularProgressFluent
                    color="var(--accent-color)"
                    height="30px"
                    width="30px"
                    duration=".9s"
                  />
                  Carregando...
                </p>
              )}
              <div className="lista-candidatos-actions">
                <p className="selected-counter">
                  {checkedList.length}/{data.alunos.length} selecionados
                </p>
                <Button
                  className="less-radius"
                  disabled={checkedList.length === 0}
                  onClick={async () => {
                    await baixarCurriculosSelecionados(checkedList, userQueries);
                  }}
                  style={!selectionMode ? { opacity: "0" } : undefined}
                >
                  Baixar currículos
                </Button>
              </div>
            </ul>
          </span>
        </>
      ) : (
        <span>
          <BoxMessage>
            <span>Sem candidatos para essa vaga</span>
          </BoxMessage>
        </span>
      )}
    </Box>
  );
}

VagaCandidatoPage.getLayout = (page: any) => (
  <SystemLayout>
    <VagaPageLayout>{page}</VagaPageLayout>
  </SystemLayout>
);
