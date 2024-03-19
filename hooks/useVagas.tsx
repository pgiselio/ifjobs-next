import { toast } from "react-toastify";
import { api } from "../services/api";
import { vaga } from "../types/vagaType";
import { useQueryClient } from "@tanstack/react-query";

export const useVagas = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = (vagaId?: number | string | string[]) => {
    queryClient.invalidateQueries({ queryKey: ["vaga-"+ vagaId] });
    queryClient.invalidateQueries({ queryKey: ["vagas"] });
  };
  const getFn = async (id?: string | string[] | number | undefined) => {
    if(!id){
      return;
    }
    const response = await api
      .get<vaga>(`/vaga/lista/${id}`)
      .catch((error) => (error.response.status === 400 ? null : error));
    return response?.data;
  }
  const subscribe = async ({
    vagaId,
    candidatoId,
  }: {
    vagaId: number | string | string[];
    candidatoId: number | string;
  }) => {
    await api.patch(`/vaga/${vagaId}/addAluno/${candidatoId}`).then(() => {
      toast.success("Você se increveu na vaga!", {
        position: "bottom-center",
        hideProgressBar: true,
        toastId: "subscribe",
      });
      invalidateQueries(vagaId);
    });
  };

  const unsubscribe = async ({
    vagaId,
    candidatoId,
  }: {
    vagaId: number | string | string[];
    candidatoId: number | string;
  }) => {
    await api.patch(`/vaga/${vagaId}/removeAluno/${candidatoId}`).then(() => {
      toast.warn("Você se desinscreveu da vaga!", {
        position: "bottom-center",
        hideProgressBar: true,
        toastId: "unsubscribe",
      });
      invalidateQueries(vagaId);
    });
  };

  const open = async (vagaId?: number | string) => {
    await api
      .patch<vaga>(`/vaga/${vagaId}`, [
        {
          op: "replace",
          path: "/status",
          value: "ATIVO",
        },
      ])
      .then(() => {
        invalidateQueries(vagaId);
        toast.info("Incrições reabertas com sucesso!", {
          toastId: "vaga-aberta",
        });
      })
      .catch((err) => {
        toast.error("Erro ao abrir inscrições!");
        console.error(err);
      });
  };
  const close = async (vagaId?: number | string) => {
    await api
      .patch<vaga>(`/vaga/${vagaId}`, [
        {
          op: "replace",
          path: "/status",
          value: "INATIVO",
        },
      ])
      .then(() => {
        invalidateQueries(vagaId);
        toast.warning("Vaga encerrada com sucesso!", {
          toastId: "vaga-encerrada",
        });
      })
      .catch((err) => {
        toast.error("Erro ao encerrar inscrições!");
        console.error(err);
      });
  };
  const edit = async (vagaId: number | string, data: any) => { 
    api.patch(`/vaga/${vagaId}`, data).then(() => {
      invalidateQueries(vagaId);
      toast.success("Vaga editada com sucesso!");
    });
  }
  return { getFn, subscribe, unsubscribe, open, close, edit };
};
