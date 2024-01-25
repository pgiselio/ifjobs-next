import SettingsLayout from "../../../components/Layouts/settings";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import AccountSettingsPage from "./account";


export default function SettingsMenu (){
  const mediaQueryMatches = useMediaQuery("(min-width: 1000px)");
    if (mediaQueryMatches) {
      return (
        <AccountSettingsPage />
      );
    }
    return (
        <SettingsLayout>
          <></>
        </SettingsLayout>
    )
}