'use client'
import { Box, Typography, Link, Stack } from "@mui/material"
import { Instagram as InstagramIcon, Facebook as FacebookIcon, Twitter as TwitterIcon } from "@mui/icons-material"

export default function AboutPage(){
    return (
        <Box sx={{p:4}}>
            <Typography variant="h4" gutterBottom>
                About the Web
            </Typography>
            <Typography variant="body1" paragraph>
                tesssssssssssssssssssssssssssst
            </Typography>
            <Typography variant="h6" gutterBottom>
                connect with us
            </Typography>
            <Stack direction='row' spacing={2}>
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
    )
}