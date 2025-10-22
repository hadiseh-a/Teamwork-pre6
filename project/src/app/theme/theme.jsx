import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>createTheme({
    palette: {
        mode,
        primary:{
            main: mode === 'light'?'#1976d2' : '#90caf9'
        },
        background : {
            default: mode=== 'light'? '#fff' : '#121212'
        }
    }
})