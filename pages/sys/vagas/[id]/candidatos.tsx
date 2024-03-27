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

export default function VagaCandidatoPage() {
  const router = useRouter();
  const vagas = useVagas();
  const params = router.query;
  const { data, isFetching } = useQuery<vaga>({
    queryKey: ["vaga-" + params.id],
    queryFn: () => vagas.getFn(params.id),
    refetchOnWindowFocus: false,
    enabled: !!params.id,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const userQueries = useQueries({
    queries:
      data?.alunos.map((userId) => {
        return {
          queryKey: ["user", userId],
          queryFn: () => fetchUserById(userId),
        };
      }) || [],
  });
  async function fetchUserById(userId: number) {
    const response = await api.get<User>(`/usuario/${userId}`);
    return response.data;
  }
  if (!data) {
    return (
      <>
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
      </>
    );
  }
  return (
    <>
      <Box>
        {data.alunos.length > 0 ? (
          <>
            <BoxTitle>
              <input
                type="checkbox"
                name=""
                id="candidato-checkall"
                onChange={() => {
                  setCheckedList(
                    checkedList.length === data.alunos.length ? [] : data.alunos
                  );
                }}
                {...(checkedList.length === data.alunos.length && {
                  checked: true,
                })}
              />
              <label htmlFor="candidato-checkall">Selecionar tudo</label>
            </BoxTitle>
            <span>
              <ul className="lista-candidatos">
                {userQueries.length > 0 ? (
                  userQueries.map((candidato: any) => {
                    if (!candidato.data) {
                      return (
                        <li className="candidato" key={Math.random()}>
                          <button>
                            <input
                              type="checkbox"
                              name=""
                              className="candidato-list-check"
                            />
                            <a
                              href={"../../profile/" + candidato.data?.id}
                              className="candidato-group"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ProfilePic className="candidato-pic" />
                              <div className="candidato-info">
                                <h3>
                                  <Skeleton width={150}/>
                                </h3>
                                <span>
                                  <Skeleton width={100}/>
                                </span>
                              </div>
                            </a>
                          </button>
                        </li>
                      );
                    }
                    return (
                      <li className="candidato" key={candidato.data?.id}>
                        <button>
                          <input
                            type="checkbox"
                            name=""
                            className="candidato-list-check"
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setCheckedList(
                                event.target.checked
                                  ? [...checkedList, candidato.data?.id]
                                  : checkedList.filter(
                                      (id) => id !== candidato.data?.id
                                    )
                              );
                            }}
                            {...(checkedList.includes(candidato.data?.id)
                              ? { checked: true }
                              : {})}
                          />
                          <a
                            href={"../../profile/" + candidato.data?.id}
                            className="candidato-group"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ProfilePic
                              userId={candidato.data?.id}
                              className="candidato-pic"
                            />
                            <div className="candidato-info">
                              <h3>{candidato.data?.aluno?.dadosPessoa.nome}</h3>
                              <span>{candidato.data?.email}</span>
                            </div>
                          </a>
                        </button>
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

                  <Button className="less-radius">Baixar currículos</Button>
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
    </>
  );
}

VagaCandidatoPage.getLayout = (page : any) => <SystemLayout><VagaPageLayout>{page}</VagaPageLayout></SystemLayout>;