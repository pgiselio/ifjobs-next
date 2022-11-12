import Link from "next/link";
import { CadastroLayout } from "../_layout";
import { CadastroConcluidoStyle } from "./styles";

export default function CadastroConcluidoPage() {
  return (
    <CadastroLayout>
      <CadastroConcluidoStyle>
        <div className="content">
          <div className="circle">
            <i className="fas fa-check"></i>
          </div>
          <h2>Cadastro concluído</h2>
          <span className="message">
            Agora é só fazer login e começar a usar. Ahh, e não se esqueça de
            dar um "toque" no seu perfil viu? Isso vai te ajudar muito com as
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
              <a>
                Entrar com sua conta <i className="fas fa-arrow-right"></i>
              </a>
            </Link>
          </div>
        </div>
      </CadastroConcluidoStyle>
    </CadastroLayout>
  );
}
