'use client';

import React, { useState } from 'react';
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
} from '@mui/material';
import { Search, Delete } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

// Styled Components for exact shape match
const StyledSearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 4, // Slight radius like in photo
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5),
  },
}));

const StyledFilterButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 'auto',
  padding: theme.spacing(0.5, 1),
  borderRadius: 4, // Slight radius
  marginLeft: theme.spacing(1),
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  '&.active': {
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
}));

const QuestionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 4, // Exact card shape
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)', // Increased shadow
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)', // Increased hover shadow
    transform: 'translateY(-1px) scale(1.02)', // Added scale for enlargement
  },
}));

// Fake Data (exactly like in your screenshot)
const fakeQuestions = [
  {
    id: 1,
    tag: 'JS',
    title: 'what is js?',
    date: '11/1/2024, 5:52:14 PM',
  },
  {
    id: 2,
    tag: 'React',
    title: 'what is React?',
    date: '10/15/2024, 4:34:54 PM',
  },
  {
    id: 3,
    tag: 'Redux',
    title: 'how to handle global state wit...',
    date: '11/8/2024, 8:17:44 PM',
  },
];

export default function QuestionsPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Newer');
  const [questions, setQuestions] = useState(fakeQuestions);
  const router = useRouter();

  const handleDelete = (id, event) => {
    event.stopPropagation(); // Prevent click from propagating to card
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleQuestionClick = (id) => {
    router.push(`/questions/${id}`); // Navigate to /questions/:id
  };

  // Sort questions based on sortBy
  const sortedQuestions = [...questions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortBy === 'Newer' ? dateB - dateA : dateA - dateB;
  });

  // Filter based on search
  const filteredQuestions = sortedQuestions.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase()) ||
    q.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Title */}
      <Typography variant="h4" fontWeight={600} align="center" gutterBottom>
        Questions
      </Typography>

      {/* Search Bar (exact shape: white rect with light shadow, slight radius) */}
      <StyledSearchField
        fullWidth
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: 'action.active' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          maxWidth: 600,
          mb: 2,
          mx: 'auto',
          display: 'block',
        }}
      />

      {/* Filter/Sorting Buttons (centered as requested) */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
          Filter By:
        </Typography>
        <StyledFilterButton
          className={sortBy === 'Newer' ? 'active' : ''}
          onClick={() => setSortBy('Newer')}
        >
          ▼ Newer
        </StyledFilterButton>
        <StyledFilterButton
          className={sortBy === 'Older' ? 'active' : ''}
          onClick={() => setSortBy('Older')}
        >
          ▼ Older
        </StyledFilterButton>
      </Box>

      {/* Questions List */}
      <Stack spacing={1}>
        {filteredQuestions.map((q) => (
          <QuestionCard 
            key={q.id} 
            elevation={0}
            onClick={() => handleQuestionClick(q.id)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color="text.primary" gutterBottom>
                  {q.tag}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {q.title}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 160, textAlign: 'right' }}>
                  {q.date}
                </Typography>
                <IconButton
                  onClick={(event) => handleDelete(q.id, event)}
                  sx={{
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
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