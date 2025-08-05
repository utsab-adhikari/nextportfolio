import News from "@/models/News.model";
import connectDB from "@/db/ConnectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { newsid } = await params;
    await News.findByIdAndDelete({ _id: newsid });

    return NextResponse.json({
      message: "News Deleted",
      success: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Server Error", error.message],
    });
  }
}
