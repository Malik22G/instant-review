import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: `${process.env.OPENAI_API_KEY}`,
});

export async function POST(req: Request) {
  const data = await req.json();

  try {
    {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: data.prompt }],
        model: "gpt-3.5-turbo",
      });

      return completion;
    }
  } catch (error) {
    console.error("Error processing the OpenAI API:", error);
    return new Response(
      JSON.stringify({ error: "Error processing your request" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
