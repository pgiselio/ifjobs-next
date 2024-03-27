import { SystemLayout } from "../../../../components/Layouts/_sysLayout";
import SettingsLayout from "../../../../components/Layouts/settings";

export default function NotificationSettingsPage (){
    return (
        <h1>Notificações</h1>
    )
}

NotificationSettingsPage.getLayout = (page: any) => <SystemLayout><SettingsLayout headerTitle="Notificações">{page}</SettingsLayout></SystemLayout>;