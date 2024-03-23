import Link from "next/link";
import { vaga } from "../../../types/vagaType";
import { PillItem, PillList } from "../../General/pill";
import { ProfilePic } from "../profile-pic/profile-pic";
import styled from "./styles.module.scss";
import { dateFormatter } from "../../../utils/dateFormatter";

type vagaObj = {
  vaga: vaga;
};
export function VagaCard({ vaga }: vagaObj) {
  const date = new Date(vaga.dataCriacao);
  const dateFormatted = dateFormatter(date);
  return (
    <div className={styled.VagaCardStyle}>
      <div className={styled["vaga-data"]}>
        <div className={styled["vaga-header"]}>
          <div className={styled["photo-align"]}>
            <Link href={`profile/${vaga?.empresa?.id}`} passHref aria-label={'Imagem com link para o perfil da empresa "' + vaga?.empresa?.dadosPessoa.nome + '"' }>

              <ProfilePic userId={vaga?.empresa?.id} isCompany className={styled["profile-pic"]}/>

            </Link>

            <div>
              <div className={styled["vaga-titles"]}>
                <h3>
                  <Link
                    href={`vagas/${vaga.id}`}
                    title={vaga.titulo}
                    passHref
                  >
                    {vaga.titulo}
                  </Link>
                </h3>

                <div className={styled["sub"]}>
                  <Link href={`profile/${vaga?.empresa?.id}`}>
                    {vaga?.empresa?.dadosPessoa.nome}
                  </Link>
                  <span className={styled["vaga-date"]}>{dateFormatted}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styled["vaga-text"]}>
          <PillList>
            <PillItem
              className={
                styled["card-pill"]+" "+styled["status"] + (vaga.status === "ATIVO" ? " "+styled["active"] : "")
              }
              title="Estado da vaga"
            >
              <span>{vaga.status === "ATIVO" ? "ATIVO" : "INATIVO"}</span>
            </PillItem>
            <PillItem className={styled["card-pill"]} title="Curso alvo">
              <i className="fas fa-book-open"></i>
              <span className="vaga-city">{vaga.cursoAlvo}</span>
            </PillItem>
            <PillItem className={styled["card-pill"]} title="Localização">
              <i className="fas fa-map-marker-alt"></i>
              <span className="vaga-city">{vaga.localizacao}</span>
            </PillItem>
          </PillList>
        </div>

        <div className={styled["vagas-bottom"]}>
          <Link href={`vagas/${vaga.id}/candidatos`} className={styled["vagas-candidatos"]}>

            <i className="fas fa-user"></i>
            <span>
              {vaga.alunos.length}
              {vaga.alunos.length > 1 || vaga.alunos.length === 0
                ? " Candidatos"
                : " Candidato"}
            </span>

          </Link>
          <Link href={`vagas/${vaga.id}`} className={styled["vagas-detalhes-btn"]}>
            Mais detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
