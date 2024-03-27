import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  BoxContent,
  BoxTitle,
} from "../../../../components/General/box";
import CircularProgressFluent from "../../../../components/General/circular-progress-fluent";
import { vaga } from "../../../../types/vagaType";
import { CriarNovaVagaForm } from "../../../../components/Forms/vaga_form";
import { SystemLayout } from "../../../../components/Layouts/_sysLayout";
import Head from "next/head";
import { useVagas } from "../../../../hooks/useVagas";

export default function VagaEditarPage() {
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
  if (isFetching) {
    return (
      <>
        <Head>
          <title>Editar vaga #{params.id} - IFJobs</title>
        </Head>
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
      <Head>
        <title>Editar vaga #{data?.id} - IFJobs</title>
      </Head>
      <section>
        <div className="content">
          <Box>
            <BoxTitle>
              <h3>Editar vaga #{data?.id}</h3>
            </BoxTitle>
            <BoxContent>
              <CriarNovaVagaForm vaga={data} />
            </BoxContent>
          </Box>
        </div>
      </section>
    </>
  );
}

VagaEditarPage.getLayout = (page: any) => <SystemLayout>{page}</SystemLayout>;