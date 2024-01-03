import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: "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",
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
