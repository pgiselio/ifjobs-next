import Link from "next/link";
import { CadastroLayout } from "../_layout";
import styled from "./styles.module.scss";

export default function CadastroConcluidoPage() {
  return (
    <CadastroLayout>
      <div className={styled.confirmacao}>
        <div className="content">
          <div className="circle">
            <i className="fas fa-check"></i>
          </div>
          <h2>Cadastro concluído</h2>
          <span className="message">
            Agora é só fazer login e começar a usar. Ahh, e não se esqueça de
            dar um &quot;toque&quot; no seu perfil viu? Isso vai te ajudar muito com as
            empresas.
          </span>
          <span className="message">
            <strong>;)</strong>
          </span>
        </div>
        <div className="bottom-actions">
          <div className="flex-btn-next"></div>
          <div className="flex-btn-login">
            <Link
              href="/entrar"
              passHref
              className="btn-login"
              title="Já tem uma conta? Faça Login!"
            >
              Entrar com sua conta <i className="fas fa-arrow-right"></i>

            </Link>
          </div>
        </div>
      </div>
    </CadastroLayout>
  );
}
