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
import { useAuth } from "../../../../hooks/useAuth";
import { vaga } from "../../../../types/vagaType";
import VagaPageLayout from "../../../../components/Layouts/vagaLayout";
import { useEffect, useRef } from "react";
import Link from "next/link";
import DOMPurify from "dompurify";
import { useVagas } from "../../../../hooks/useVagas";
import { SystemLayout } from "../../../../components/Layouts/_sysLayout";

export default function VagaSobrePage() {
  const router = useRouter();
  const vagas = useVagas();
  const params = router.query;
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    contentRef.current?.querySelectorAll("a").forEach((a) => {
      !a.getAttribute("href")?.match(/https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/gi) &&
      a.setAttribute("href", `http://${a.getAttribute("href")}`);
    });
  });
  const { data, isFetching } = useQuery<vaga>({
    queryKey: ["vaga-" + params.id],
    queryFn: () => vagas.getFn(params.id),
    refetchOnWindowFocus: false,
    enabled: !!params.id,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
  const auth = useAuth();
  const isAluno = auth?.authorities?.includes("ALUNO");
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
            paddingTop: "30px",
          }}
        >
          <CircularProgressFluent
            color="var(--accent-color)"
            height="30px"
            width="30px"
            duration=".9s"
          />
        </p>
      </>
    );
  }
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(data.descricao),
  })
  return (
    <>
      <div className={!isAluno ? "vaga-columns-2" : ""}>
        <div className="column-1">
          <Box>
            <BoxTitle>Sobre a vaga</BoxTitle>
            <BoxContent className="ql-snow">
              <div className="ql-editor vaga-page-description" ref={contentRef} dangerouslySetInnerHTML={sanitizedData()}></div>
            </BoxContent>
          </Box>
        </div>

        {((!isAluno && auth.userInfo?.id === data.empresa?.id) ||
          (!auth.userInfo?.aluno && !auth.userInfo?.empresa)) && (
          <div className="column-2">
            <Box>
              <BoxTitle>
                <h3>
                  <i className="fas fa-exclamation-triangle"></i> Ações
                </h3>
              </BoxTitle>
              {data.status ? (
                <BoxContent>
                  <div className="vaga-page-actions">
                    <Link href={`/sys/vagas/${params.id}/editar`}>
                    <Button className="less-radius">Editar informações</Button>
                    </Link>
                  </div>
                </BoxContent>
              ) : (
                <span>
                  <BoxMessage>
                    <span>Essa vaga já foi encerrada</span>
                  </BoxMessage>
                </span>
              )}
            </Box>
          </div>
        )}
      </div>
    </>
  );
}

VagaSobrePage.getLayout = (page: any) => <SystemLayout><VagaPageLayout>{page}</VagaPageLayout></SystemLayout>;

