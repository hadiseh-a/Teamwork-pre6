import { connectDB } from "@/lib/mongodb";
import { Question } from "@/models/Question.js";


export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const question = await Question.findById(id);

    if (!question)
      return new Response(JSON.stringify({ message: "Question not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(question), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}


export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();

    const updated = await Question.findByIdAndUpdate(id, body, { new: true });

    if (!updated)
      return new Response(JSON.stringify({ message: "Question not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const deleted = await Question.findByIdAndDelete(params.id);
    if (!deleted) {
      return new Response(JSON.stringify({ message: "Question not found" }), {
        status: 404,
      });
    }
    return new Response(
      JSON.stringify({ message: "Question deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
