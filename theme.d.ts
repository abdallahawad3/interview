import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
    sidebar: {
      main: string;
      contrastText: string;
    };
  }

  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
    sidebar?: {
      main: string;
      contrastText: string;
    };
  }
}
