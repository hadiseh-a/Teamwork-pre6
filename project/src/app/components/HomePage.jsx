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

      <>
      <Box
       sx={{
         mt:"5",
         display: "flex",
         justifyContent: "center", 
         alignItems: "center", 
         flexDirection:"column",
         // minHeight: "100vh",
         bgcolor: "background.default",
         color: "text.primary",
         textAlign: "center",
         p: 2,
       }}
     >
 <Grid container
 //  spacing={2}
         justifyContent="center"
         alignItems="center"
         // maxWidth="md"
         mb={5}
    >
   <Grid size={{ xs: 12, md: 5}}>
     
         <Typography style={{margin:5}}>
             Lorem ipsum dolor sit, amet consectetur
             adipisicing elit. Praesentium laudantium
             pariatur at, nihil possimus sint dolores 
             explicabo officiis, accusantium quis in non. 
         </Typography>
    <Button variant="contained" onClick={handleClick} >go to questions</Button>
   </Grid>
   <Grid size={{ xs: 12, md: 4 }}>
     
    <Image
     src="/download.jpg"
       width={300}
       height={100}
       alt="Picture of the author"
       style={{padding:4}}/>
       <Box sx={{ fontSize: 'h6.fontSize', m: 1 }}>Ask Your Question </Box>
   </Grid>
  {/* <Grid size={{ xs:12, md: 4}}>
       
  </Grid> */}
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
       } }
       noValidate
       autoComplete="off"
       
     >
       
     <TextField
     sx={{ width: "80%" }}
           id="title"
           label="title"
           type="password"
           autoComplete="title"
            {...register("Title", { required: true })}
         />
   {/* <input {...register("Title", { required: true })} />  */}
   {errors.Title && <p>Last name is required.</p>}
   <TextField
   sx={{ width: "80%" }}
           id="Description"
           label="Description"
           multiline
           rows={4}
           // defaultValue="Description"
            {...register("Description", { required: true })}
         />
   {/* <input {...register("Description", { required: true })} /> */}
   {errors.Description && <p>Last name is required.</p>}
   <Button type="submit" variant="contained" style={{ width: "80%" }}>onSubmit</Button>
   
   </Box>
 </Box>
         </>
     )
 }