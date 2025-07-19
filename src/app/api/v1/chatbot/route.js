import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize OpenAI client for OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// POST handler
export async function POST(req) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json(
        { success: false, message: "Message is required" },
        { status: 400 }
      );
    }

    const assistantProfile = `
You are a portfolio assistant for Utsab Adhikari.
- He is a BEIT student from Nepal.
- Currently he is in second semester of the bachelor of engineering in IT (BEIT), College: NCIT, Balkumari Kathmandu, University: Pokhara.
- He knows MERN stack, Express, JS, C, C++, etc.
- He’s building backend skills and AI chatbot systems.
- His contact no is: 9867508725 and his email is: utsabadhikari075@gmail.com
- You can provide this if someone asks for contact or email.
- He is from Nepal, Lumbini Province, district: Arghakhanchi, Panini rural municipality, ward no-4.
`;

    const chatCompletion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: assistantProfile },
        { role: "user", content: userMessage },
      ],
    });

    const aiMessage = chatCompletion.choices[0].message.content;

    return NextResponse.json({
      from: "ai",
      message: aiMessage.trim(),
    });
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
