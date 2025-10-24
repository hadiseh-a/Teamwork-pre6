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
      //for ask your question
      secondary: {
        main: mode === "light" ? "#fff" : "#252525ff",
        contrastText: mode === "light" ? "#090808ff" : "#9b9494ff",
      },
    },
  });
