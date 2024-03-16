import { empresaType } from "./empresa";

export type vaga = {
  id: number;
  titulo: string;
  status: "ATIVO" | "INATIVO" | null;
  descricao: string;
  localizacao: string;
  dataCriacao: string;
  cursoAlvo: string;
  empresa?: empresaType;
  alunos: number[];
};

