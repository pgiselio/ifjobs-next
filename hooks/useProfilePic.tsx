import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { b64toBlob } from "../utils/getProfilePic";

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
      const response = await api.get<photoQueryType>(
        `/imagem/fotoPerfil/${userId}`
      );
      if (response.data) {
        const blob = b64toBlob(response.data?.arquivo.dados, "image/png");
        const url = URL.createObjectURL(blob);
        return url;
      }
      return null;
    },
    enabled: !!userId && enabled,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30, // 30 seconds
  });
  return query;
};
