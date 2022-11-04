import Link from "next/link";
import { vaga } from "../../types/vagaType";
import { PillItem, PillList } from "../pill";
import { ProfilePic } from "../profile-pic/profile-pic";
import { VagaCardStyle } from "./style";

type vagaObj = {
  vaga: vaga;
};
export function VagaCard({ vaga }: vagaObj) {
  const date = new Date(vaga.dataCriacao);
  const dateFormatted = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
  return (
    <VagaCardStyle className="vaga">
      <div className="vaga-data">
        <div className="vaga-header">
          <div className="photo-align">
            <Link href={`profile/${vaga?.empresa?.id}`} passHref>
              <a>
                <ProfilePic userId={vaga?.empresa?.id} />
              </a>
            </Link>

            <div>
              <div className="vaga-titles">
                <h3>
                  <Link
                    href={`${vaga.id}`}
                    className="vagas-detalhes-btn"
                    title={vaga.titulo}
                    passHref
                  >
                    <a>{vaga.titulo}</a>
                  </Link>
                </h3>

                <div className="sub">
                  <Link href={`profile/${vaga?.empresa?.id}`}>
                    <a>{vaga?.empresa?.dadosPessoa.nome}</a>
                  </Link>
                  <span className="vaga-date">{dateFormatted}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vaga-text">
          <PillList>
            <PillItem
              className={
                "card-pill status " + (vaga.status === "ATIVO" && "active")
              }
              title="Estado da vaga"
            >
              <span>{vaga.status === "ATIVO" ? "ATIVO" : "INATIVO"}</span>
            </PillItem>
            <PillItem className="card-pill" title="Curso alvo">
              <i className="fas fa-book-open"></i>
              <span className="vaga-city">{vaga.cursoAlvo}</span>
            </PillItem>
            <PillItem className="card-pill" title="Localização">
              <i className="fas fa-map-marker-alt"></i>
              <span className="vaga-city">{vaga.localizacao}</span>
            </PillItem>
          </PillList>
        </div>

        <div className="vagas-bottom">
          <Link href={`vagas/${vaga.id}/candidatos`} className="vagas-candidatos">
            <a>
              <i className="fas fa-user"></i>
              <span>
                {vaga.alunos.length}
                {vaga.alunos.length > 1 || vaga.alunos.length === 0
                  ? " Candidatos"
                  : " Candidato"}
              </span>
            </a>
          </Link>
          <Link href={`vagas/${vaga.id}`} className="vagas-detalhes-btn">
            <a>Mais detalhes</a>
          </Link>
        </div>
      </div>
    </VagaCardStyle>
  );
}
