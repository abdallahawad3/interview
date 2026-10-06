import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#a5b4fc",
      main: "#4f46e5",
      dark: "#312e81",
      contrastText: "#f8fafc",
    },
    secondary: {
      light: "#99f6e4",
      main: "#14b8a6",
      dark: "#0f766e",
      contrastText: "#ecfeff",
    },
    accent: {
      light: "#dbeafe",
      main: "#3b82f6",
      dark: "#1d4ed8",
      contrastText: "#eff6ff",
    },
    background: {
      default: "#f3f6fb",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
    sidebar: {
      main: "#0f172a",
      contrastText: "#e2e8f0",
    },
  },
  direction: "rtl",
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '"Tajawal", "Segoe UI", sans-serif',
    h4: {
      fontWeight: 800,
    },
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#000",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
          borderBottom: "1px solid rgba(148, 163, 184, 0.18)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#1d4ed8",
          border: "none",
          boxShadow: "12px 0 32px rgba(15, 23, 42, 0.18)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#1e293b",
          fontWeight: 700,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 700,
        },
      },
    },
  },
});
