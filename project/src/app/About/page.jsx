'use client';
import { Box, Typography, Link, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';

export default function AboutPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          About the Web
        </Typography>
        <Typography variant="body1" paragraph>
          this is a site like reddit that you can ask your questions and people can answer them .
        </Typography>
        <Typography variant="h6" gutterBottom>
          Connect with us
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center', pb: 4 }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Link
            href="https://instagram.com/sample"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <InstagramIcon fontSize="large" />
          </Link>
          <Link
            href="https://facebook.com/sample"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <FacebookIcon fontSize="large" />
          </Link>
          <Link
            href="https://x.com/sample"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <TwitterIcon fontSize="large" />
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}