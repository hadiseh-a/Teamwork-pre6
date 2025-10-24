import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#87469fff" : "#280a33ff",
      },
      background: {
        default: mode === "light" ? "#fff" : "#101010ff",
      },
    },
  });
