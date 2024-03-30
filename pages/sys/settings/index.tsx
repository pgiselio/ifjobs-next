import { SystemLayout } from "../../../components/Layouts/_sysLayout";
import SettingsLayout from "../../../components/Layouts/settings";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import AccountSettingsPage from "./account";


export default function SettingsMenu (){
    return (
        <div className="content"></div>
    )
}

SettingsMenu.getLayout = (page: any) => <SystemLayout><SettingsLayout>{page}</SettingsLayout></SystemLayout>;