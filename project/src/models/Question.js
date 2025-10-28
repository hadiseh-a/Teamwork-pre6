import mongoose from "mongoose";

const mongooseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const Question = mongoose.model("question", mongooseSchema);

module.exports = { Question };
