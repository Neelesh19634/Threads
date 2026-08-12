import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Check API key
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    // Check prompt
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "Please provide a topic or prompt." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const fullPrompt = `
You are an expert social media content writer creating content for a Threads-style platform.

The user has given you this topic:

"${prompt.trim()}"

Write a high-quality, engaging Threads post about this topic.

Follow these requirements strictly:

- Start with a strong hook that immediately grabs attention.
- Do not simply describe the topic or give generic praise.
- Include specific insights, observations, examples, facts, or useful details.
- If the topic is a person, focus on their journey, achievements, mindset, impact, interesting facts, or lessons people can learn from them.
- If the topic is technology, explain the idea clearly and include practical insights or examples.
- Make the post feel original, thoughtful, and human-written.
- Use short paragraphs for easy reading.
- Create a natural flow from the hook to the main idea and conclusion.
- Make the reader curious and interested in continuing.
- End with a memorable thought, lesson, or engaging question.
- Use emojis only when they genuinely improve the post.
- Do not use unnecessary headings.
- Do not say "Here is your post", "Sure", "As an AI", or similar phrases.
- Do not explain your writing process.
- Return ONLY the final post.
- Keep the final post between 700 and 950 characters.
- Make sure the content stays relevant to the exact topic provided.

Generate the final Threads post now.
`;

    const modelsToTry = [
      "gemini-flash-lite-latest",
      "gemini-2.5-flash-lite",
      "gemini-flash-latest",
      "gemini-2.5-flash",
    ];

    let responseText = "";
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: fullPrompt,
          config: {
            systemInstruction: `
You are a professional social media content writer.

Transform simple topics into high-quality Threads posts.

Write like an experienced human creator, not like an AI assistant.

Prioritize:
- Strong hooks
- Specific insights
- Originality
- Storytelling
- Natural language
- Emotional connection
- Reader engagement

Avoid:
- Generic statements
- Empty praise
- Repetition
- Filler
- AI-style introductions
- Unnecessary explanations

Always return only the finished post.
`,
            temperature: 0.85,
            maxOutputTokens: 600,
          },
        });

        if (response?.text) {
          responseText = response.text.trim();

          if (responseText) {
            break;
          }
        }
      } catch (err: any) {
        lastError = err;

        console.warn(
          `Gemini model ${modelName} failed:`,
          err?.message || err
        );
      }
    }

    // If all models failed
    if (!responseText) {
      if (
        lastError?.status === 429 ||
        lastError?.message?.includes("429") ||
        lastError?.message?.toLowerCase()?.includes("quota")
      ) {
        return NextResponse.json(
          {
            error:
              "AI generation is temporarily unavailable. Please try again later.",
          },
          { status: 429 }
        );
      }

      console.error("All Gemini models failed:", lastError);

      return NextResponse.json(
        {
          error:
            "Failed to generate content with Gemini AI. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      text: responseText,
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);

    return NextResponse.json(
      {
        error: "Gemini AI generation error. Please try again later.",
      },
      { status: 500 }
    );
  }
}