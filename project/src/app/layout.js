'use client'
import { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme/theme";
import Navbar from "./components/NavBar";

export default function RootLayout({children}){
  const [mode, setMode] = useState('Light');
  const theme = useMemo(()=>getTheme(mode),[mode]);

  const toggleTheme=()=>{
    setMode((prev)=>(prev==='Light'?'Dark':'Light'));
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Navbar toggleTheme={toggleTheme}/>
      {children}
    </ThemeProvider>
  )
}