'use client'
import { Box, Typography, Link, Stack } from "@mui/material"
import { Instagram as InstagramIcon, Facebook as FacebookIcon, Twitter as TwitterIcon } from "@mui/icons-material"

export default function AboutPage(){
    return (
        <Box 
            sx={{
                minHeight:'100vh',
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-between',
                p:4
            }}> 
            <Box display={'flex'}  flexDirection={'column'} justifyContent={'center'}>
                <Typography variant="h4" gutterBottom>
                    About the Web
                </Typography>
                <Typography variant="body1" paragraph>
                    tesssssssssssssssssssssssssssst
                </Typography>
            </Box>
            <Box sx={{textAlign:'center', mt:4}}>
                <Typography variant="h6" gutterBottom>
                    connect with us
                </Typography>
                <Stack direction='row' display={'flex'} justifyContent={'center'} spacing={2}>
                    <Link href='https://instagram.com/sample' target='blank' rel='noopener' color="inherit">
                    <InstagramIcon fontSize="large"/>
                    </Link>
                    <Link href='https://facebook.com/sample' target='blank' rel='noopener' color="inherit">
                    <FacebookIcon fontSize="large"/>
                    </Link>
                    <Link href='https://x.com/sample' target='blank' rel='noopener' color="inherit">
                    <TwitterIcon fontSize="large"/>
                    </Link>

                </Stack>
            </Box>
        </Box>
    )
}