import { Box, BoxContent, BoxTitle } from "../../../../components/General/box";
import { Button } from "../../../../components/General/button";
import { useAuth } from "../../../../hooks/useAuth";
import SystemLayout from "../../../../components/Layouts/system";
import { CriarNovaVagaForm } from "../../../../components/Layouts/vaga_form";

export default function CriarNovaVagaPage() {
  const auth = useAuth();
  if (auth?.authorities?.includes("ALUNO")) {
    return <h2>SEM PERMISÃO</h2>;
  }
  return (
    <SystemLayout>
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
