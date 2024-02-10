import { isTheme } from "../../../../contexts/AppOptionsContext";
import { useAppOptions } from "../../../../hooks/useAppOptions";
import { themes } from "../../../../styles/themes";
import styled from "../../../../styles/_Pages/sys/settings-themes.module.scss";
import SettingsLayout from "../../../../components/Layouts/settings";

export default function SettingThemesPage() {
  const AppOptions = useAppOptions();
  const toggleTheme = (themeName: keyof typeof themes) => {
    window.localStorage.setItem("theme", themeName);
    AppOptions.setTheme(themeName);
  };
  const themeKeys = Object.keys(themes);

  return (
    <SettingsLayout>
      <div className={styled.themesContainer}>
        {themeKeys.length > 0 &&
          themeKeys.map(
            (theme) =>
              isTheme(theme) && (
                <button
                  type="button"
                  key={theme}
                  className={
                    styled.themeOption +
                    (AppOptions.theme === theme ? " active" : "")
                  }
                  onClick={() => toggleTheme(theme)}
                >
                  {themes[theme].name}
                  <span></span>
                </button>
              )
          )}
      </div>
    </SettingsLayout>
  );
}
