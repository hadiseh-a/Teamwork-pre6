"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";

export default function Edit_QuestionPage() {
  const [answers, setAnswers] = useState([]);
  const [borders, setBorders] = useState([]);
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newAnswer: "",
    },
  });

  const onSubmit = (data) => {
    const answer = data.newAnswer.trim();
    if (answer !== "") {
      setAnswers([...answers, answer]);
      setBorders([...borders, true]);
      reset();
    }
  };

  const handleDelete = (index) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    const newBorders = borders.filter((_, i) => i !== index);
    setAnswers(newAnswers);
    setBorders(newBorders);
  };

  const handleChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

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
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
        Next.js
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        What is SSR in Next.js?
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }} color="secondary">
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
              border: borders[index]
                ? `2px solid ${theme.palette.primary.main}`
                : `1px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[1],
              transition: "all 0.2s ease",
            }}
          >
            <TextField
              value={answer}
              fullWidth
              variant="outlined"
              multiline
              minRows={4}
              onChange={(e) => handleChange(e, index)}
              sx={{
                backgroundColor: theme.palette.background.default,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" },
                },
              }}
            />

            <IconButton
              color="secondary"
              onClick={() => handleDelete(index)}
              sx={{
                ml: 1,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Controller
          name="newAnswer"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Write your answer..."
              multiline
              minRows={4}
              fullWidth
              variant="outlined"
              error={!!errors.newAnswer}
              helperText={errors.newAnswer ? errors.newAnswer.message : ""}
              sx={{
                marginBottom: "16px",
                bgcolor: theme.palette.background.paper,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: field.value.trim()
                      ? theme.palette.primary.main
                      : theme.palette.divider,
                    borderWidth: field.value.trim() ? 2 : 1,
                  },
                },
              }}
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
