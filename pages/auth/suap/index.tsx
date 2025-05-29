import { LoadingPage } from "../../../components/General/loadingPage";
import { SuapClient } from "../../../services/suapapi/client";
import { SuapApiSettings } from "../../../services/suapapi/settings";

export default function VerificarAlunoPage() {
  if (
    !SuapApiSettings.SUAP_URL ||
    !SuapApiSettings.CLIENT_ID ||
    !SuapApiSettings.REDIRECT_URI ||
    !SuapApiSettings.SCOPE
  ) {
    throw new Error("As configurações da API SUAP não foram definidas corretamente, ou estão faltando.");
  }

  const NewSuapClient = SuapClient({
    authHost: SuapApiSettings.SUAP_URL as string,
    clientID: SuapApiSettings.CLIENT_ID as string,
    redirectURI: SuapApiSettings.REDIRECT_URI as string,
    scope: SuapApiSettings.SCOPE as string,
  });

  NewSuapClient.init();
  setTimeout(() => {
    window.opener && window.opener.postMessage("reload")
    var daddy = window.self;
    daddy.opener = window.self;
    daddy.close();
    window.location.href = "/sys/"
  }, 200)
  return (
    <div className="content">
      <LoadingPage/>
    </div>
  );
}
