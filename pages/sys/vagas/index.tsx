import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Button } from "../../../components/General/button";
import CircularProgressFluent from "../../../components/General/circular-progress-fluent";
import { FabButton } from "../../../components/General/fab";
import { HeaderTitle } from "../../../components/SystemLayout/header-title";
import { OutsetHeadersCornerRadius } from "../../../components/SystemLayout/outset-radius-to-headers";
import { VagaCard } from "../../../components/SystemLayout/vagaCard";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../services/api";
import { vaga } from "../../../types/vagaType";
import SystemLayout from "../../../components/Layouts/system";

const CreateNewFAB = styled(FabButton)`
  display: flex;
  @media (min-width: 766px) {
    display: none;
  }
`;
const CreateNewButton = styled(Button)`
  display: none;
  @media (min-width: 766px) {
    display: flex;
  }
`;

export default function VagasList() {
  const router = useRouter();
  const { data, isFetching } = useQuery<vaga[]>(
    ["vagas"],
    async () => {
      const response = await api.get("/vaga/");
      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute to refetch
    }
  );
  const auth = useAuth();
  return (
    <SystemLayout>
      <section>
        <OutsetHeadersCornerRadius>
          <HeaderTitle>
            {auth?.authorities?.includes("EMPRESA") ||
            auth?.authorities?.includes("ADMIN") ? (
              <>
                <CreateNewFAB
                  className="FabCreateNew"
                  type="button"
                  onClick={() => router.push("/sys/vagas/criar-nova")}
                >
                  <i className="fa-solid fa-plus"></i>
                </CreateNewFAB>
                <h2>Vagas criadas</h2>
                <CreateNewButton
                  className="outlined"
                  id="newVagaButton"
                  onClick={() => router.push("/sys/vagas/criar-nova")}
                  key="create-new-vaga-btn"
                >
                  <i className="fa-solid fa-plus"></i>
                  Criar nova
                </CreateNewButton>
              </>
            ) : (
              <h2>Vagas disponíveis</h2>
            )}
          </HeaderTitle>
        </OutsetHeadersCornerRadius>
        <div className="content-grid">
          <div className="content">
            <div className="cards-container">
              {data?.map((vaga) => {
                return <VagaCard key={vaga.id} vaga={vaga} />;
              })}
            </div>
            {isFetching && (
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
              </p>
            )}
          </div>
        </div>
      </section>
    </SystemLayout>
  );
}
