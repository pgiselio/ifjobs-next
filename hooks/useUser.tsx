import { toast } from "react-toastify";
import { api } from "../services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/user";
import { use } from "react";

export const useUser = (id: number | string) => {
  const queryClient = useQueryClient();
  const invalidateQueries = (userId?: number | string | string[]) => {
    queryClient.invalidateQueries({ queryKey: ["user-" + userId] });
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };
  const get = async (id?: string | string[] | number | undefined) => {
    if (!id) {
      return;
    }
    try {
      const response = await api.get(`/usuario/${id}`);
      return response.data;
    } catch (err: any) {
      if (err.response?.status === 404 || err.response?.status === 400) {
        console.error("Usuário não encontrado:", err);
      }
      return null;
    }
  };
  const query = useQuery<User>({
    queryKey: ["user-" + id],
    queryFn: () => get(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  const userDTO = {
    id: query.data?.id || id,
    email: query.data?.email || "",
    status: query.data?.status || "PENDENTE",
    nome:
      query.data?.aluno?.dadosPessoa.nome ||
      query.data?.empresa?.dadosPessoa.nome ||
      "",
    roles: query.data?.roles || [],
    cnpj: query.data?.empresa?.cnpj || null,
    curso: query.data?.aluno?.curso || null,
    periodo: query.data?.aluno?.periodo || null,
    dataNasc: query.data?.aluno?.dadosPessoa.dataNasc || null,
    localizacao:
      query.data?.aluno?.dadosPessoa.localizacao ||
      query.data?.empresa?.dadosPessoa.localizacao ||
      null,
  };

  const getNome = () => {
    return (
      query.data?.aluno?.dadosPessoa.nome ||
      query.data?.empresa?.dadosPessoa.nome ||
      ""
    );
  };

  const getCNPJ = () => {
    return query.data?.empresa?.cnpj || null;
  };
  const getDataNasc = () => {
    return query.data?.aluno?.dadosPessoa.dataNasc || null;
  };
  const getLocalizacao = () => {
    return (
      query.data?.aluno?.dadosPessoa.localizacao ||
      query.data?.empresa?.dadosPessoa.localizacao ||
      null
    );
  };

  return { ...userDTO, getNome, getCNPJ, getDataNasc, getLocalizacao, query };
};
