import { Box, BoxContent, BoxTitle } from "../../../../components/General/box";
import { useAuth } from "../../../../hooks/useAuth";
import { SystemLayout } from "../../../../components/Layouts/_sysLayout";
import { CriarNovaVagaForm } from "../../../../components/Forms/vaga_form";
import Head from "next/head";
import { toast } from "react-toastify";

export default function CriarNovaVagaPage() {
  const auth = useAuth();
  if (auth?.authorities?.includes("ALUNO")) {
    toast.error("Você não tem permissão para acessar essa página", {});
    return (
      <SystemLayout>
        <h2>SEM PERMISSÃO</h2>
      </SystemLayout>
    );
  }
  return (
    <SystemLayout>
      <Head>
        <title>Criar nova vaga - IFJobs</title>
      </Head>
      <section>
        <div className="content">
          <Box>
            <BoxTitle>
              <h3>Criar nova vaga</h3>
            </BoxTitle>
            <BoxContent>
              <CriarNovaVagaForm />
            </BoxContent>
          </Box>
        </div>
      </section>
    </SystemLayout>
  );
}
