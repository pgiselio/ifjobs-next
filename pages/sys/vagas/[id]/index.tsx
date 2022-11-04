import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  BoxContent,
  BoxMessage,
  BoxTitle,
} from "../../../../components/box";
import { Button } from "../../../../components/button";
import CircularProgressFluent from "../../../../components/circular-progress-fluent";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";
import { vaga } from "../../../../types/vagaType";
import VagaPage from "./_layout";

export default function VagaSobrePage() {
  const router = useRouter();
  const params = router.query;
  const { data, isFetching } = useQuery<vaga>(
    [`vaga-${params.id}`],
    async () => {
      const response = await api
        .get(`/vaga/lista/${params.id}`)
        .catch((error) => (error.response.status === 400 ? null : error));
      return response?.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const auth = useAuth();
  const isAluno = auth?.authorities?.includes("ALUNO");
  if (!data) {
    return (
      <VagaPage>
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
        Carregando...
      </p></VagaPage>
    );
  }
  return (
    <VagaPage>
      <div className={!isAluno ? "vaga-columns-2" : ""}>
        <div className="column-1">
          <Box>
            <BoxTitle>Sobre a vaga</BoxTitle>
            <BoxContent>
              <div className="vaga-page-description">{data.descricao}</div>
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
                    <Button className="less-radius">Editar informações</Button>
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
    </VagaPage>
  );
}
