import { SuapClient } from "./suapapi/client";
import { SuapApiSettings } from "./suapapi/settings";

if (
  !SuapApiSettings.SUAP_URL ||
  !SuapApiSettings.CLIENT_ID ||
  !SuapApiSettings.REDIRECT_URI ||
  !SuapApiSettings.SCOPE
) {
  throw new Error(
    "As configurações da API SUAP não foram definidas corretamente, ou estão faltando."
  );
}

export const suapClient = SuapClient({
  authHost: SuapApiSettings.SUAP_URL,
  clientID: SuapApiSettings.CLIENT_ID || "",
  redirectURI: SuapApiSettings.REDIRECT_URI,
  scope: SuapApiSettings.SCOPE,
});
suapClient.init();
