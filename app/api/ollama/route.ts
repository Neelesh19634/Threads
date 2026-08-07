import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, draft, action = "generate", model = "llama3.2" } = await req.json();

    let fullPrompt = "";

    if (action === "improve") {
      fullPrompt = `You are a helpful AI writing assistant for a social media thread app. Please polish, fix grammar, and improve the following draft to make it engaging, well-written, and clear. Return ONLY the improved post text without any intros, quotes, or markdown wrappers.\n\nDraft: ${draft}`;
    } else if (action === "concise") {
      fullPrompt = `You are a helpful AI writing assistant for a social media thread app. Make the following text concise, punchy, and short. Return ONLY the shortened text without any intros or quotes.\n\nText: ${draft || prompt}`;
    } else if (action === "expand") {
      fullPrompt = `You are a helpful AI writing assistant for a social media thread app. Expand slightly on the following text to add interesting details and depth for a thread post. Return ONLY the expanded post text without intros or quotes.\n\nText: ${draft || prompt}`;
    } else {
      fullPrompt = `You are a helpful AI writing assistant for a social media thread app. Write an engaging, well-formatted thread post based on the following topic. Return ONLY the post text without any intros, headers, or quotes.\n\nTopic: ${prompt}`;
    }

    // Call local Ollama API
    const ollamaUrl = process.env.OLLAMA_URL || "http://127.0.0.1:11434/api/generate";

    const response = await fetch(ollamaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model || "llama3.2",
        prompt: fullPrompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: `Ollama error (${response.status}): ${errorText || "Failed to generate text."}`,
          isOffline: false,
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedText = data.response?.trim() || "";

    return NextResponse.json({ text: generatedText });
  } catch (error: any) {
    console.error("Ollama connection error:", error);
    return NextResponse.json(
      {
        error: "Ollama is not running locally. Please start Ollama on your Mac.",
        isOffline: true,
        details: error.message,
      },
      { status: 503 }
    );
  }
}
