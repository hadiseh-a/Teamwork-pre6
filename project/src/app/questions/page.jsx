"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Stack,
  Container,
  InputAdornment,
  Button,
} from "@mui/material";
import { Search, Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

// Styled Components
const StyledSearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 4,
    backgroundColor:
      theme.palette.mode === "light" ? "#fff" : "rgba(255, 255, 255, 0.08)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    "& fieldset": { borderColor: "transparent" },
    "&:hover fieldset": { borderColor: "transparent" },
    "&.Mui-focused fieldset": { borderColor: "transparent" },
  },
  "& .MuiInputBase-input": { padding: theme.spacing(1.5) },
}));

const StyledFilterButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  minWidth: "auto",
  padding: theme.spacing(0.5, 1),
  borderRadius: 4,
  marginLeft: theme.spacing(1),
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
  "&.active": { backgroundColor: "rgba(0,0,0,0.08)" },
}));

const QuestionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 4,
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  transition: "all 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    transform: "translateY(-1px) scale(1.02)",
  },
}));

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newer");
  const router = useRouter();

  // Fetch questions from API
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/question");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchQuestions();
  }, []);

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    try {
      await fetch(`/api/question/${id}`, { method: "DELETE" });
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuestionClick = (id) => {
    router.push(`/questions/${id}`);
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortBy === "Newer" ? dateB - dateA : dateA - dateB;
  });

  const filteredQuestions = sortedQuestions.filter(
    (q) =>
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      (q.description &&
        q.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600} align="center" gutterBottom>
        Questions
      </Typography>

      <StyledSearchField
        fullWidth
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "action.active" }} />
            </InputAdornment>
          ),
        }}
        sx={{ maxWidth: 600, mb: 2, mx: "auto", display: "block" }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
          Filter By:
        </Typography>
        <StyledFilterButton
          className={sortBy === "Newer" ? "active" : ""}
          onClick={() => setSortBy("Newer")}
        >
          ▼ Newer
        </StyledFilterButton>
        <StyledFilterButton
          className={sortBy === "Older" ? "active" : ""}
          onClick={() => setSortBy("Older")}
        >
          ▼ Older
        </StyledFilterButton>
      </Box>

      <Stack spacing={1}>
        {filteredQuestions.map((q) => (
          <QuestionCard
            key={q._id}
            elevation={0}
            onClick={() => handleQuestionClick(q._id)}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {q.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.primary"
                  gutterBottom
                >
                  {q.description}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ minWidth: 160, textAlign: "right" }}
                >
                  {new Date(q.createdAt).toLocaleString()}
                </Typography>
                <IconButton
                  onClick={(event) => handleDelete(q._id, event)}
                  sx={{ "&:hover": { bgcolor: "action.hover" } }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </QuestionCard>
        ))}
      </Stack>
    </Container>
  );
}
