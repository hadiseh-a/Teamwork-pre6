import { connectDB } from "@/lib/mongodb";
import { Question } from "@/models/Question.js";

export async function GET() {
  await connectDB();
  try {
    const questions = await Question.find();
    return new Response(JSON.stringify(questions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify([]), { status: 400 });
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const { title, description } = await req.json();
    const newQuestion = await Question.create({ title, description });
    return new Response(JSON.stringify({ question: newQuestion }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
