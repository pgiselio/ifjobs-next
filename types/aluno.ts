export type alunoType = {
    id: number;
    dadosPessoa: {
      nome: string;
      dataNasc: Date;
      localizacao: string;
    };
    resumo?: string;
    curso: string;
    periodo?: number;
    cpf?: string;
    curriculo?: number | {
      id: number;
      pdf: {
        nome: string;
        tipoArquivo: string;
        dados: [string];
      };
      dataImport: Date;
    };
  };