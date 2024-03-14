"use client";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    positive: true;
    negative: true;
  }
}

interface ExtendedTypographyOptions extends TypographyOptions {
  positive: React.CSSProperties;
  negative: React.CSSProperties;
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#5DF591",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      light: "#ed7b7e",
      main: "#f95d5d",
      dark: "#fe4d44",
    },
    success: {
      light: "#4ad363",
      main: "#00CA45",
      dark: "#00ba3a",
    },
  },
  typography: {
    positive: {
      color: "#00CA45",
      fontFamily: [
        "Noto Sans Thai",
        "Poppins",
        "Bai Jamjuree",
        "sans-serif",
      ].join(","),
    },
    negative: {
      color: "#f95d5d",
      fontFamily: [
        "Noto Sans Thai",
        "Poppins",
        "Bai Jamjuree",
        "sans-serif",
      ].join(","),
    },

    fontFamily: [
      "Noto Sans Thai",
      "Poppins",
      "Bai Jamjuree",
      "sans-serif",
    ].join(","),
  } as ExtendedTypographyOptions,
} as ThemeOptions);

export default theme;
