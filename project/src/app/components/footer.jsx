'use client'

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Footer(){
    const theme = useTheme();
    return (
        <Box 
            component='footer'
            sx={{
                mt:'auto',
                py:2,
                px:3,
                textAlign:'center',
                backgroundColor: theme.palette.background.default,
                borderTop:`1px solid ${theme.palette.divider}`
            }}>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} MyRedditClone — Built with Next.js & MUI
                </Typography>
            </Box>
    )
}