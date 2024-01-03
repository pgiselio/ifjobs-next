export type empresaType = {
  id: 0;
  dadosPessoa: {
    nome: string;
    dataNasc: Date;
    localizacao: string;
  };
  cnpj: string;
  resumo?: string;
  telefone?: string;
  linkSite?: string;
  redesSociais?: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
};
