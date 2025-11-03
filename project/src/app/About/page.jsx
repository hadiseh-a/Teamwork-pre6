"use client";
import { Box, Typography, Link, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";

export default function AboutPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        px: 4,
        py: 6,
        gap: "50px",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          About the Web
        </Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          textAlign: "center",
        }}
      >
        <Typography variant="body1" sx={{ maxWidth: 600 }}>
          This is a site like Reddit where you can ask your questions and people
          can answer them.
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Connect with us
        </Typography>
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
