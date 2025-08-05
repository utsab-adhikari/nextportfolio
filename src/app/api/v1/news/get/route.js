import News from "@/models/News.model";
import connectDB from "@/db/ConnectDB";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  try {
    await connectDB();

    const savedNews = await News.find({});

    if (!savedNews) {
      return NextResponse.json({
        success: false,
        status: 500,
        message: "News not found",
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message: "News Loaded Successfully",
      news: savedNews,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Server Error:", error.message],
    });
  }
}
