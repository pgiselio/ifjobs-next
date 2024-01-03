import Link from "next/link";
import { vaga } from "../../../types/vagaType";
import { PillItem, PillList } from "../../General/pill";
import { ProfilePic } from "../profile-pic/profile-pic";
import { VagaCardStyle } from "../vagaCard/style";
import { User } from "../../../types/user";
import { empresaType } from "../../../types/empresa";

type userObj = {
  user?: empresaType;
  qtd?: number | string;
  tipo?: string;
};
export function GerenciamentoCard({ qtd, tipo }: userObj) {
  return (
    <VagaCardStyle className="vaga">
      <div className="vaga-data">
        <div className="vaga-header">
          <div className="vaga-titles">
            <h3 style={{textAlign: "center", fontSize: 30}}>{qtd}</h3>

            <div className="sub" style={{justifyContent: "center", fontSize: 20, width:"100%"}}>
              {tipo}
            </div>
          </div>
        </div>
        <div className="vaga-text"></div>

        <div className="vagas-bottom">
          <Link
            href={`/sys/gerenciamento/cadastrar/empresa`}
            className="vagas-detalhes-btn"
          >
            Cadastrar nova
          </Link>
        </div>
      </div>
    </VagaCardStyle>
  );
}
