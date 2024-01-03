import { alunoType } from "./aluno";
import { empresaType } from "./empresa";

export type User = {
  id?: number;
  email?: string;
  status?: "PENDENTE" | "CONCLUIDO" | "DESATIVADO";
  roles?: [
    {
      id: number;
      nomeRole: string;
      authority: string;
    }
  ];
  aluno?: alunoType;
  empresa?: empresaType;
  
};
