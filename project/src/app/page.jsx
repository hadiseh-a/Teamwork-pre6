"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
export default function QuestionPage() {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/questions");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.Title,
          description: data.Description,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }
      reset();
      router.push("/questions");
    } catch (error) {
      alert(error.message);
    }
  };

  const theme = useTheme();
  return (
    <Box
      sx={{
        mt: "5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        bgcolor: "background.default",
        color: "text.primary",
        textAlign: "center",
        p: 2,
      }}
    >
      <Grid container justifyContent="center" alignItems="center" mb={5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography style={{ margin: 5 }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Praesentium laudantium pariatur at, nihil possimus sint dolores
            explicabo officiis, accusantium quis in non.
          </Typography>
          <Button
            sx={{
              color: theme.palette.secondary.button,
              fontWeight: "bold",
              border: "Background",
            }}
            onClick={handleClick}
          >
            go to Questions
          </Button>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Image
            src="/unnamed.jpg"
            width={300}
            height={200}
            alt="Picture of the author"
            style={{ padding: 4 }}
          />
        </Grid>
      </Grid>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mt: 5,
          width: "100%",
          maxWidth: 700,
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            fontSize: "h6.fontSize",
            m: 1,
            color: theme.palette.secondary.title,
          }}
        >
          Ask Your Question{" "}
        </Box>
        <TextField
          sx={{ width: "80%", background: theme.palette.secondary.main }}
          id="title"
          label="title"
          autoComplete="title"
          {...register("Title", { required: true })}
        />
        {errors.Title && (
          <p
            style={{
              color: theme.palette.secondary.danger,
              fontWeight: "bold",
            }}
          >
            {" "}
            * title is required *
          </p>
        )}
        <TextField
          sx={{ width: "80%", background: theme.palette.secondary.main }}
          id="Description"
          label="Description"
          multiline
          rows={4}
          {...register("Description", { required: true })}
        />
        {errors.Description && (
          <p
            style={{
              color: theme.palette.secondary.danger,
              fontWeight: "bold",
            }}
          >
            {" "}
            * Description is required *
          </p>
        )}
        <Button
          type="submit"
          sx={{
            color: theme.palette.secondary.button,
            border: `2px solid ${theme.palette.secondary.button}`,
            width: "80%",
            "&:hover": {
              backgroundColor: theme.palette.secondary.button,
              color: "white",
            },
          }}
        >
          onSubmit
        </Button>
      </Box>
    </Box>
  );
}
