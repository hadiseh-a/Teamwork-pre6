"use client";
import { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { getTheme } from "./theme/theme";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navbar toggleTheme={toggleTheme} />
            <Box component={"main"} sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
