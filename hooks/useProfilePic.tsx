import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

type photoQueryType = {
  id: string;
  arquivo: {
    nome: string;
    tipoArquivo: string;
    dados: string;
  };
};

export const useProfilePic = ({userId, enabled = true}:{userId: string | number | undefined, enabled ?: boolean}) => {
  const query = useQuery({
    queryKey: ["profilePic-" + userId],
    queryFn: async () => {
      if (!userId || userId === "undefined" || typeof userId === "undefined") {
        return;
      }
      const response = await api.get(
        `/imagem/fotoPerfil/${userId}`, { responseType: 'arraybuffer' });
      if (response.data) {
        return response.request.responseURL
      }
      return null;
    },
    enabled: !!userId && enabled,
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30, // 30 seconds
  });
  return query;
};
