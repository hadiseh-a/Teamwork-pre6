import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/mydb";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("Connected to MongoDB locally");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
