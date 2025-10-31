"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

export default function Edit_QuestionPage() {
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = useTheme();
  const params = useParams();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { newAnswer: "" },
  });


  useEffect(() => {
    if (!params?.id) return;

    const fetchQuestion = async () => {
      try {
        const res = await fetch(`/api/questions/${params.id}`);
        if (res.status === 404) {
          setError("Question not found");
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch question");
        const data = await res.json();
        setQuestion(data);
        setAnswers(data.answers || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load question");
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [params?.id]);


  const patchAnswers = async (newAnswers) => {
    if (!question?.id) return false;
    try {
      const res = await fetch(`/api/questions/${question.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: newAnswers }),
      });
      if (!res.ok) throw new Error("Failed to update question");
      return true;
    } catch (err) {
      console.error("❌ Error updating:", err);
      return false;
    }
  };

  const handleAddAnswer = async (data) => {
    const answer = data.newAnswer.trim();
    if (!answer) return;

    const newAnswers = [...answers, answer];
    const success = await patchAnswers(newAnswers);
    if (success) {
      setAnswers(newAnswers);
      reset();
    } else {
      alert("Failed to add answer. Please try again.");
    }
  };

  const handleDelete = async (index) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    const success = await patchAnswers(newAnswers);
    if (success) setAnswers(newAnswers);
    else alert("Failed to delete answer. Please try again.");
  };

  const handleChange = async (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    const success = await patchAnswers(newAnswers);
    if (success) setAnswers(newAnswers);
    else alert("Failed to update answer. Please try again.");
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
        <Button onClick={() => router.push("/questions")} sx={{ mt: 2 }}>
          Back to Questions
        </Button>
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 600,
        mx: "auto",
        px: 3,
        py: 10,
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        {question.tag}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {question.title}
      </Typography>

      <Typography variant="body2" color="text.disabled" gutterBottom>
        {new Date(question.date).toLocaleString()}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }} color="secondary">
        Answers:
      </Typography>

      <Box sx={{ mt: 3, width: "100%" }}>
        {answers.map((answer, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: theme.palette.background.paper,
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[1],
            }}
          >
            <TextField
              value={answer}
              fullWidth
              variant="outlined"
              multiline
              minRows={3}
              onChange={(e) => handleChange(e, index)}
              sx={{
                backgroundColor: theme.palette.background.default,
                "& .MuiOutlinedInput-root": { "& fieldset": { border: "none" } },
              }}
            />

            <IconButton
              onClick={() => handleDelete(index)}
              sx={{
                ml: 1,
                color: "#f44336",
                "&:hover": { backgroundColor: "rgba(244,67,54,0.1)" },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <form onSubmit={handleSubmit(handleAddAnswer)} style={{ width: "100%" }}>
        <Controller
          name="newAnswer"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Write your answer..."
              multiline
              minRows={3}
              fullWidth
              variant="outlined"
              error={!!errors.newAnswer}
              helperText={errors.newAnswer ? errors.newAnswer.message : ""}
              sx={{ marginBottom: "16px", bgcolor: theme.palette.background.paper }}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          sx={{
            borderRadius: 0.5,
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: theme.shadows[2],
          }}
        >
          SUBMIT
        </Button>
      </form>
    </Box>
  );
}
