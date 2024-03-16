import { useRouter } from "next/router";
import { useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  Box,
  BoxContent,
  BoxMessage,
  BoxTitle,
} from "../../../../components/General/box";
import { Button } from "../../../../components/General/button";
import CircularProgressFluent from "../../../../components/General/circular-progress-fluent";
import { ProfilePic } from "../../../../components/SystemLayout/profile-pic/profile-pic";
import { api } from "../../../../services/api";
import { User } from "../../../../types/user";
import { vaga } from "../../../../types/vagaType";
import VagaPageLayout from "../../../../components/Layouts/vagaLayout";
import Skeleton from "react-loading-skeleton";
import { CriarNovaVagaForm } from "../../../../components/Layouts/vaga_form";
import { SystemLayout } from "../../../../components/Layouts/_sysLayout";
import Head from "next/head";

export default function VagaEditarPage() {
  const router = useRouter();
  const params = router.query;
  const { data, isFetching } = useQuery<vaga>({
    queryKey: [`vaga-${params.id}`],
    queryFn: async () => {
      const response = await api
        .get(`/vaga/lista/${params.id}`)
        .catch((error) => (error.response.status === 400 ? null : error));
      return response?.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!params.id,
  });
  if (isFetching) {
    return (
      <SystemLayout>
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
      </SystemLayout>
    );
  }
  return (
    <SystemLayout>
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
    </SystemLayout>
  );
}
