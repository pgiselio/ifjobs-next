import { isTheme } from "../../../../contexts/AppOptionsContext";
import { useAppOptions } from "../../../../hooks/useAppOptions";
import { themes } from "../../../../styles/themes";
import styled from "../../../../styles/_Pages/sys/settings-themes.module.scss";
import SettingsLayout from "../../../../components/Layouts/settings";
import { useEffect, useState } from "react";

export default function SettingThemesPage() {
  const AppOptions = useAppOptions();
  const [mounted, setMounted] = useState(false);
  const toggleTheme = (themeName: keyof typeof themes) => {
    AppOptions.setTheme(themeName);
  };
  const themeKeys = Object.keys(themes);
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <SettingsLayout headerTitle="Temas">
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
