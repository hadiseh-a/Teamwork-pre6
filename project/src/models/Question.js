import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    answers: { type: [String], default: [] }
  },
  { timestamps: true }
);

export const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);
