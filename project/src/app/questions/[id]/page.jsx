'use client';

import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'; 

export default function Edit_QuestionPage() {
  const [answer, setAnswer] = useState(""); 
  const [answers, setAnswers] = useState([]); 
  const [borders, setBorders] = useState([]);

  const handleSubmit = () => {
    if (answer.trim() !== "") {
      
      setAnswers([...answers, answer]);
      setBorders([...borders, true]); 
      setAnswer(""); 
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
        justifyContent: "center",
        height: "100vh",
        maxWidth: 600,
        mx: "auto",
        px: 3,
        mt: 8,
      }}
    >
   
      <Typography variant="h3" fontWeight="bold">
        Next.js
      </Typography>


      <Typography variant="subtitle1" color="text.secondary">
        What is SSR in Next.js?
      </Typography>


      <Typography variant="h6">Answers:</Typography>

      
      <Box sx={{ mt: 3 }}>
        {answers.map((answer, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: borders[index] ? "2px solid #1976d2" : "1px solid #ccc", // بوردری برای هر جواب
            }}
          >
            {/* پاسخ‌های قابل ویرایش */}
            <TextField
              value={answer}
              fullWidth
              variant="outlined"
              multiline
              minRows={4}
              onChange={(e) => handleChange(e, index)} 
              sx={{
                backgroundColor: "#fff",
                border: "none",
              }}
            />

         
            <IconButton onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <TextField
        placeholder="Write your answer..."
        multiline
        minRows={4}
        fullWidth
        variant="outlined"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        sx={{
          marginBottom: "16px",
          border: answer.trim() !== "" ? "2px solid #1976d2" : "1px solid #ccc", // بوردری که برای ورودی فعلی اضافه می‌شود
        }}
      />

      <Button
        variant="contained"
        size="large"
        sx={{
          bgcolor: "#1976d2",
          ":hover": { bgcolor: "#1565c0" },
          borderRadius: 0.5,
        }}
        onClick={handleSubmit}
      >
        SUBMIT
      </Button>
    </Box>
  );
}
