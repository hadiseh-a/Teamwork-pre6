"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "next/navigation";

export default function QuestionDetailPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAnswer, setNewAnswer] = useState("");

  
  useEffect(() => {
    async function fetchQuestion() {
      const res = await fetch(`/api/question/${id}`);
      if (!res.ok) {
        setQuestion(null);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setQuestion(data);
      setAnswers(data.answers || []);
      setLoading(false);
    }
    fetchQuestion();
  }, [id]);

  // متد به‌روزرسانی دیتابیس
  const updateQuestion = async (newAnswers) => {
    try {
      const res = await fetch(`/api/question/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: newAnswers }),
      });
      if (res.ok) {
        const updated = await res.json();
        setAnswers(updated.answers);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };


  const handleAddAnswer = async () => {
    if (!newAnswer.trim()) return;
    const newAnswers = [...answers, newAnswer.trim()];
    await updateQuestion(newAnswers);
    setNewAnswer("");
  };


  const handleDeleteAnswer = async (index) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    await updateQuestion(newAnswers);
  };


  const handleAnswerBlur = async (index, value) => {
    const updated = [...answers];
    updated[index] = value.trim();
    await updateQuestion(updated);
  };

  if (loading)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
      }}
    >
      <CircularProgress />
    </Box>
  );
  if (!question)
    return (
      <Typography variant="h5" color="error" align="center" sx={{ mt: 10 }}>
        ❌ Question not found
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {question.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {question.description}
      </Typography>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Answers
      </Typography>

      {answers.map((ans, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 1,
          }}
        >
          <TextField
            fullWidth
            multiline
            defaultValue={ans}
            onBlur={(e) => handleAnswerBlur(index, e.target.value)}
          />
          <IconButton
            onClick={() => handleDeleteAnswer(index)}
            sx={{ color: "red", ml: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          multiline
          label="Add a new answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleAddAnswer}>
          Submit Answer
        </Button>
      </Box>
    </Box>
  );
}
