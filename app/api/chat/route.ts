import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "@/lib/chatSystemPrompt";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "GROQ_API_KEY is not configured. Please add GROQ_API_KEY to your .env.local file.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const groq = new Groq({ apiKey });

    // Format chat history for Groq API
    const formattedMessages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; content: string }) => ({
        role: (m.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
        content: m.content,
      })),
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
      temperature: 0.5,
      max_completion_tokens: 1024,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of chatCompletion) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("Error in Groq chat route:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Failed to generate chat response." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
