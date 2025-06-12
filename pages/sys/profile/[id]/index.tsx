import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  BoxContent,
  BoxMessage,
  BoxTitle,
} from "../../../../components/General/box";
import { Button } from "../../../../components/General/button";
import CircularProgressFluent from "../../../../components/General/circular-progress-fluent";
import LabelWithData from "../../../../components/General/label-data";
import { ProfilePic } from "../../../../components/SystemLayout/profile-pic/profile-pic";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";
import { User } from "../../../../types/user";
import { cnpjMask } from "../../../../utils/cnpjMask";
import { isBlank } from "../../../../utils/isBlank";
import Error404 from "../../../404";
import styled from "./profiles.module.scss";
import { SystemLayout } from "../../../../components/Layouts/_sysLayout";
import Skeleton from "react-loading-skeleton";
import { dateFormatter } from "../../../../utils/dateFormatter";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  let usertype;
  const auth = useAuth();
  const [notFound, setNotFound] = useState(false);
  const { data, isFetching } = useQuery<User>({
    queryKey: ["profile-" + id],
    queryFn: async () => {
      const response = await api.get(`/usuario/${id}`).catch((err) => {
        if (err.response?.status === 404 || err.response?.status === 400)
          setNotFound(true);
      });
      return response?.data || null;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    enabled: !!id && !notFound,
    retry: 1,
  });

  if (!data && !isFetching && id) {
    return <Error404 message="Perfil não encontrado!" />;
  }
  if (data?.aluno) {
    usertype = "ALUNO";
  } else if (data?.empresa) {
    usertype = "EMPRESA";
  } else {
    usertype = "ADMIN";
  }
  return (
    <section className={styled.profilePageStyle}>
      <div className={styled["header"]}>
        <div className={styled["header-container"]}>
          <div className={styled["user-info"]}>
            {isFetching && !data ? (
              <ProfilePic />
            ) : (
              <ProfilePic
                userId={data?.id + "" || ""}
                isCompany={usertype === "EMPRESA"}
              />
            )}

            <div className={styled["profile-names"]}>
              {isFetching ? (
                <>
                  <h2>
                    <Skeleton containerClassName="flex-1" width={220} />
                  </h2>
                  <span style={{ marginTop: 5 }}>
                    <Skeleton
                      containerClassName="flex-1"
                      width={190}
                      height={16}
                    />
                  </span>
                </>
              ) : (
                <>
                  <h2>
                    {usertype === "ALUNO"
                      ? data?.aluno?.dadosPessoa.nome
                      : usertype === "EMPRESA"
                      ? data?.empresa?.dadosPessoa.nome
                      : data?.email}
                  </h2>
                  <span>
                    {usertype === "ALUNO"
                      ? data?.email
                      : data?.empresa?.dadosPessoa
                      ? cnpjMask(data?.empresa?.cnpj)
                      : data?.email}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className={styled["user-actions"]}>
            {data?.email === auth.email && (
              <>
                <Link href="/sys/settings/profile" passHref>
                  <Button tabIndex={-1}>
                    <i className="fas fa-pencil-alt"></i>

                    <span>Editar perfil</span>
                  </Button>
                </Link>
              </>
            )}
            {usertype === "ALUNO" && (
              <Link
                href={`${data?.id}/curriculo/`}
                passHref
              >
                <Button className="outlined" tabIndex={-1}>
                  Vizualizar currículo
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      {isFetching ? (
        <p
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            paddingTop: "30px",
          }}
        >
          <CircularProgressFluent
            color="var(--accent-color)"
            height="50px"
            width="50px"
            duration=".8s"
          />
        </p>
      ) : (
        <div className="content">
          <section className={styled["info"]}>
            <div className={styled["labelDatas"]}>
              {data?.aluno?.dadosPessoa && (
                <LabelWithData
                  data={dateFormatter(data?.aluno?.dadosPessoa.dataNasc)}
                  label="Data de Nascimento:"
                  icon="fas fa-calendar-day"
                />
              )}
              {usertype !== "ADMIN" && (
                <LabelWithData
                  data={
                    usertype === "ALUNO"
                      ? data?.aluno?.dadosPessoa.localizacao
                      : data?.empresa?.dadosPessoa.localizacao
                  }
                  label="Localização:"
                  icon="fas fa-map-marker-alt"
                />
              )}

              {usertype === "ALUNO" && (
                <LabelWithData
                  data={
                    <>
                      <span style={{ textTransform: "capitalize" }}>
                        {data?.aluno?.curso.toLocaleLowerCase()}{" "}
                      </span>
                      <span title="Período do curso">
                        <span>{data?.aluno?.periodo}º P</span>
                      </span>
                    </>
                  }
                  label="Curso e Período:"
                  icon="fas fa-book-open"
                />
              )}
            </div>
          </section>
          {usertype === "ALUNO" && (
            <Box>
              <BoxTitle>
                <h3>Sobre</h3>
              </BoxTitle>
              {data?.aluno?.resumo ? (
                <BoxContent>
                  <p>{data?.aluno?.resumo}</p>
                </BoxContent>
              ) : (
                <BoxMessage className={styled["no-about-message"]}>
                  <span>
                    Oops... parece que alguém se esqueceu de fazer o &quot;sobre
                    mim&quot;
                  </span>
                </BoxMessage>
              )}
            </Box>
          )}
          {usertype === "EMPRESA" && (
            <div className="vaga-columns-2">
              <div className="column-1">
                <Box>
                  <BoxTitle>
                    <h3>Sobre nós</h3>
                  </BoxTitle>
                  <BoxContent>
                    <div className={styled["profile-description"]}>
                      <p>{data?.empresa?.resumo}</p>
                    </div>
                  </BoxContent>
                </Box>
              </div>
              <div className="column-2">
                <Box>
                  <BoxTitle>
                    <h3>Contato</h3>
                  </BoxTitle>
                  <BoxContent>
                    <div className={styled["contacts"]}>
                      <ul className={styled["essential-info"]}>
                        <li>
                          <a href={"mailto:" + data?.email}>
                            <i className="fas fa-envelope"></i>
                            <span>{data?.email}</span>
                          </a>
                        </li>
                        <li>
                          <a href={"tel:" + data?.empresa?.telefone}>
                            <i className="fas fa-phone-alt"></i>
                            <span>{data?.empresa?.telefone}</span>
                          </a>
                        </li>
                        {data?.empresa?.linkSite &&
                          !isBlank(data?.empresa?.linkSite) && (
                            <li>
                              <a
                                href={data?.empresa?.linkSite}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <i className="fa-solid fa-link"></i>
                                <span style={{ gap: 8, alignItems: "center" }}>
                                  Visite nosso site
                                  <i
                                    className="fa-solid fa-arrow-up-right-from-square"
                                    style={{ fontSize: 12 }}
                                  ></i>
                                </span>
                              </a>
                            </li>
                          )}
                      </ul>
                    </div>
                  </BoxContent>
                </Box>
                {data?.empresa?.redesSociais &&
                  (!isBlank(data?.empresa?.redesSociais.linkedin) ||
                    !isBlank(data?.empresa?.redesSociais.facebook) ||
                    !isBlank(data?.empresa?.redesSociais.instagram) ||
                    !isBlank(data?.empresa?.redesSociais.twitter)) && (
                    <Box>
                        <ul className={styled["social-info"]}>
                          {!isBlank(data?.empresa?.redesSociais.linkedin) && (
                            <li>
                              <a
                                href={`https://www.linkedin.com/company/${data?.empresa?.redesSociais.linkedin}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <i
                                  style={{ color: "#0a66c2" }}
                                  className="fab fa-linkedin"
                                ></i>
                                <span>LinkedIn</span>
                              </a>
                            </li>
                          )}
                          {!isBlank(data?.empresa?.redesSociais.facebook) && (
                            <li>
                              <a
                                href={`https://www.facebook.com/${data?.empresa?.redesSociais.facebook}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <i
                                  style={{ color: "#2374E1" }}
                                  className="fab fa-facebook"
                                ></i>
                                <span>Facebook</span>
                              </a>
                            </li>
                          )}
                          {!isBlank(data?.empresa?.redesSociais.instagram) && (
                            <li>
                              <a
                                href={`https://www.instagram.com/${data?.empresa?.redesSociais.instagram}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <i
                                  style={{ color: "deeppink" }}
                                  className="fab fa-instagram"
                                ></i>
                                <span>Instagram</span>
                              </a>
                            </li>
                          )}
                          {!isBlank(data?.empresa?.redesSociais.twitter) && (
                            <li>
                              <a
                                href={`https://www.twitter.com/${data?.empresa?.redesSociais.twitter}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <i
                                  style={{ color: "#05bcbc" }}
                                  className="fab fa-twitter"
                                ></i>
                                <span>X/Twitter</span>
                              </a>
                            </li>
                          )}
                        </ul>
                    </Box>
                  )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

ProfilePage.getLayout = (page: any) => <SystemLayout>{page}</SystemLayout>;