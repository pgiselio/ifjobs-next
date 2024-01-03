export const defaultColors = {
  green: {
    1: "#e4f2e4",
    2: "#cfe6d0",
    3: "#a0d9a6",
    4: "#76cc82",
    5: "#50bf63",
    6: "#2eb348",
    7: "#1d8c37",
    8: "#106627",
    9: "#074018",
    10: "#031a0a",
  },
  red: {
    1: "#fff2f0",
    2: "#fccfc7",
    3: "#f0a097",
    4: "#e3736b",
    5: "#d64742",
    6: "#c91f1f",
    7: "#a31015",
    8: "#7d060e",
    9: "#7d060e",
    10: "#570009",
  },
  neutral: {
    1: "#ffffff",
    2: "#fafafa",
    3: "#f5f5f5",
    4: "#f0f0f0",
    5: "#d9d9d9",
    6: "#bfbfbf",
    7: "#8c8c8c",
    8: "#595959",
    9: "#434343",
    10: "#262626",
    11: "#1f1f1f",
    12: "#141414",
    13: "#000000",
  },
};
export const themes = {
  systemDefault: {
    name: "Padrão do seu sistema",
    borderRadius: "",
    pallets: {
      ...defaultColors,
    },
    colors: {
      main: "",
      mainActive: "",
      insideMain: "",
      secondary: "",
      bodyBackground: "",
      systemMenu: {
        border: "",
        background: "",
        linkActive: "",
        linkHover: "",
        linkOnClick: "",
        icon: "",
      },
      textA: "",
      textB: "",
      textC: "",
      primaryBg: "",
      secondaryBg: "",
      outlineColor: "",
    },
  },
  light: {
    name: "Claro",
    borderRadius: "5px",
    pallets: {
      ...defaultColors,
    },
    colors: {
      main: defaultColors.green[7],
      mainActive: defaultColors.green[8],
      insideMain: "#FFFFFF",
      secondary: "#888695",
      bodyBackground: "243 243 243",
      systemMenu: {
        border: "#ced4da",
        background: "#ffffff",
        linkActive: defaultColors.green[7],
        linkHover: "#888695",
        linkOnClick: "#ced4da",
        icon: "",
      },
      textA: "#000",
      textB: "#666",
      textC: "#4e5860",
      primaryBg: "#fff",
      secondaryBg: "#f9f9f9",
      outlineColor: "#ced4da",
    },
  },
  dark: {
    name: "Escuro",
    borderRadius: "5px",
    pallets: {
      ...defaultColors,
    },
    colors: {
      main: defaultColors.green[6],
      mainActive: defaultColors.green[7],
      insideMain: "#EEEEEE",
      secondary: "#48474f",
      bodyBackground: "20 19 24",
      systemMenu: {
        border: "#2b2936",
        background: "#1c1b22",
        linkActive: defaultColors.green[7],
        linkHover: "#888695",
        linkOnClick: "#ced4da",
        icon: "",
      },
      textA: "#fafafa",
      textB: "#888",
      textC: "#fff",
      primaryBg: "#212126",
      secondaryBg: "#26252b",
      outlineColor: "#2b2936",
    },
  },

  darkGray: {
    name: "Escuro acinzentado",
    borderRadius: "5px",
    pallets: {
      ...defaultColors,
    },
    colors: {
      main: defaultColors.green[6],
      mainActive: defaultColors.green[7],
      insideMain: "#EEEEEE",
      secondary: "#48474f",
      bodyBackground: "24 24 24",
      systemMenu: {
        border: "#2b2936",
        background: "#212121",
        linkActive: defaultColors.green[7],
        linkHover: "#888695",
        linkOnClick: "#ced4da",
        icon: "",
      },
      textA: "#fafafa",
      textB: "#888",
      textC: "#fff",
      primaryBg: "#333",
      secondaryBg: "#444",
      outlineColor: "#555",
    },
  },
  altoContraste: {
    name: "Alto contraste",
    borderRadius: "5px",
    pallets: {
      ...defaultColors,
    },
    colors: {
      main: "#33FF33",
      mainActive: "#33FF11",
      insideMain: "#000000",
      secondary: "#48474f",
      bodyBackground: "00 00 00",
      systemMenu: {
        border: "#444444",
        background: "#000000",
        linkActive: defaultColors.green[7],
        linkHover: "#888695",
        linkOnClick: "#ced4da",
        icon: "",
      },
      textA: "#FFFF00",
      textB: "#FFFF00",
      textC: "#FFFFFF",
      primaryBg: "#111111",
      secondaryBg: "#222222",
      outlineColor: "#444444",
    },
  },
};