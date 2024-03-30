import { usePathname } from "next/navigation";
import { SystemLayout } from "../../../../components/Layouts/_sysLayout";
import SettingsLayout from "../../../../components/Layouts/settings";
import SettingsHeader from "../../../../components/SystemLayout/settingsHeader";

export default function NotificationSettingsPage() {
  const pathname = usePathname();
  return (
    <>
      {pathname != "/sys/settings" && <SettingsHeader title="Notificações" />}
      <div className="content">
        <h1>Notificações</h1>
      </div>
    </>
  );
}

NotificationSettingsPage.getLayout = (page: any) => (
  <SystemLayout>
    <SettingsLayout headerTitle="Notificações">{page}</SettingsLayout>
  </SystemLayout>
);
