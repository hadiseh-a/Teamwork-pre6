import mongoose from "mongoose";

const URI="";
if (!URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}
  async function connectDb(){
  try {
      const db = await mongoose.Connection(URI);
     alert(`mongodb connect}`);
  } catch (error) {
    alert(`mongodb connect error ${error.message}`)
  }
}