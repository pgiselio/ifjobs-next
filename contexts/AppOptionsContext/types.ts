import { themes } from "../../styles/themes";

export interface AppOptionsContextType {
  theme: string | undefined;
  setTheme: (theme: keyof typeof themes) => void;
  sidebarState: boolean;
  toggleSidebar: () => void;
};
