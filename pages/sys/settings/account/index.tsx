import { SystemLayout } from "../../../../components/Layouts/_sysLayout";
import SettingsLayout from "../../../../components/Layouts/settings";



export default function AccountSettingsPage (){
    return (
        <h1>Conta e Segurança</h1>
    )
}

AccountSettingsPage.getLayout = (page: any) => <SystemLayout><SettingsLayout headerTitle="Conta e Segurança">{page}</SettingsLayout></SystemLayout>;