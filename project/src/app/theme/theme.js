import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>createTheme({
    palette: {
        mode,
        primary:{
            main: mode === 'Light'?'#1976d2' : '#90caf9'
        },
        background : {
            default: mode=== 'Light'? '#fff' : '#121212'
        }
    }
})