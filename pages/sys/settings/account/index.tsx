import { usePathname } from "next/navigation";
import { SystemLayout } from "../../../../components/Layouts/_sysLayout";
import SettingsLayout from "../../../../components/Layouts/settings";
import SettingsHeader from "../../../../components/SystemLayout/settingsHeader";



export default function AccountSettingsPage (){
    const pathname = usePathname();
    return (
      <>
        {pathname != "/sys/settings" && <SettingsHeader title="Conta e Segurança" />}
        <div className="content">
          <h1>Conta e Segurança</h1>
        </div>
      </>
    );
  }

AccountSettingsPage.getLayout = (page: any) => <SystemLayout><SettingsLayout headerTitle="Conta e Segurança">{page}</SettingsLayout></SystemLayout>;