import * as Accordion from "@radix-ui/react-accordion";
import { useRouter } from "next/navigation";
import { SystemLayout } from "../_layout";
import Link from "next/link";
import { HeaderTitle } from "../../../components/SystemLayout/header-title";
import { OutsetHeadersCornerRadius } from "../../../components/SystemLayout/outset-radius-to-headers";
import { useQuery } from "@tanstack/react-query";
// import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/api";

export default function GerenciamentoPage() {
  const navigate = useRouter();
  // const { data } = useQuery({
  //   queryKey: ["GerenciamentoUsuariosList"],
  //   queryFn: async () => {
  //     const response = await api.get("/empresa/");
  //     return response.data;
  //   },
  //   staleTime: 1000 * 60, // 1 minute to refetch
  // });
  return (
    <SystemLayout>
      <OutsetHeadersCornerRadius>
        <HeaderTitle>
          <h2>Painel de Gerenciamento</h2>
        </HeaderTitle>
      </OutsetHeadersCornerRadius>
      <div className="content">
        <Accordion.Root type="single" defaultValue="item-1" collapsible>
          <Accordion.Item
            data-reach-accordion-item
            style={{ marginTop: 20 }}
            value="item-1"
          >
            <Accordion.Header>
              <Link href="/sys/gerenciamento/cadastrar/empresa" passHref>
                <Accordion.Trigger
                  className="arrow-right"
                  data-reach-accordion-button
                >
                  <h4>Cadastrar nova empresa</h4>
                </Accordion.Trigger>
              </Link>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion.Root>
        <Accordion.Root type="single" defaultValue="item-1" collapsible>
          <Accordion.Item
            data-reach-accordion-item
            style={{ marginTop: 14 }}
            value="item-1"
          >
            <Accordion.Header>
              <Link href="/sys/vagas/criar-nova" passHref>
                <Accordion.Trigger
                  className="arrow-right"
                  data-reach-accordion-button
                >
                  <h4>Cadastrar nova vaga</h4>
                </Accordion.Trigger>
              </Link>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </SystemLayout>
  );
}
