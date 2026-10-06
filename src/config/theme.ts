import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },

    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },

    accent: {
      light: "#90caf9",
      main: "#2196f3",
      dark: "#1976d2",
      contrastText: "#fff",
    },

    sidebar: {
      main: "#1e293b",
      contrastText: "#fff",
    },
  },
});
