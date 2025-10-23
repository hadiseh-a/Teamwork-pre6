'use client';
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import {useForm, SubmitHandler} from "react-hook-form"
export default function QuestionPage(){
    const router=useRouter();
    const handleClick = (e) => {
    e.preventDefault()
    // router.push("/")
  }
  const{register,
    handleSubmit,
    formState: { errors }}=useForm();

 const onSubmit = (data) => {
    console.log("سوال شما ثبت شد", data);
    alert(`سوال شما با عنوان "${data.Title}" ثبت شد!`);
  };
    return(

<Box
      sx={{
        mt:"5",
        display: "flex",
        justifyContent: "center", 
        // alignItems: "center", 
        // minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        textAlign: "center",
        p: 2,
      }}
    >
<Grid container
 spacing={2}
        justifyContent="center"
        alignItems="center"
        maxWidth="md"
   >
  <Grid size={{ xs: 6, md: 8 }}>
    
        <Typography style={{margin:5}}>
            Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Praesentium laudantium
            pariatur at, nihil possimus sint dolores 
            explicabo officiis, accusantium quis in non. 
        </Typography>
   <Button variant="contained"onClick={handleClick} >go to guestions</Button>
  </Grid>
  <Grid size={{ xs: 6, md: 4 }}>
    
   <Image
    src="/download.jpg"
      width={300}
      height={100}
      alt="Picture of the author"
      style={{padding:4}}/>
  </Grid>
  <Grid size={{ xs:12, md: 12}}>
      <Box sx={{ fontSize: 'h6.fontSize', m: 1 }}>Ask Your Question </Box>
  </Grid>
  <Grid size={{ xs:12, md: 12}} sx={{  display: "flex",justifyContent:"center"} }>
   <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{  display: "flex",flexDirection: 'column', alignItems: 'flex-start',justifyContent:"center",p:2} }
      noValidate
      autoComplete="off"
      
    >
    
        <TextField
          id="title"
          label="title"
          type="password"
          autoComplete="title"
           {...register("Title", { required: true })}
        />
          {errors.Title && <p>Last name is required.</p>}
       <TextField
          id="Description"
          label="Description"
          multiline
          rows={4}
          defaultValue="Description"
           {...register("Description", { required: true })}
       />
             {errors.Description && <p>Last name is required.</p>}
        <button type="submit" variant="contained">onSubmit</button>
     
   </Box>
  </Grid>
</Grid>
</Box>
 
    );
}