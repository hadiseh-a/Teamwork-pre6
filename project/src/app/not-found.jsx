"use client";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";


export default function notFunction(){
    const router=useRouter();
   return(
    <>
    <Typography mt={5} variant="h2" textAlign={"center"} sx={{color:theme.palette.secondary.danger,fontWeight:"bold"}}>
       Error 404
    </Typography>
    <Typography mt={3} variant="h2" textAlign={"center"} sx={{color:theme.palette.secondary.danger}}>
     This page could not be found!
    </Typography>
    <Button 
           onClick={router.push("/")} 
           sx={{
            color: theme.palette.secondary.button,
            border: `2px solid ${theme.palette.secondary.button}`,
            width: "80%",
            '&:hover': {
            backgroundColor: theme.palette.secondary.button,
            color: 'white',
           },}}
           >back to homePage</Button>
    </>
   )
}