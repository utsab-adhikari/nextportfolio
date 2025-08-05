
import News from "@/models/News.model";
import connectDB from "@/db/ConnectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { headline, slug, image, link, source } = body;

    const existingNews =
      (await News.findOne({ slug: slug })) &&
      (await News.findOne({ headline: headline }));

    if (existingNews) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Already saved",
      });
    }

      const newNews = new News({
        headline,
        slug,
        image,
        link,
        source,
      });

      await newNews.save();

      return NextResponse.json({
        success: true,
        status: 200,
        message: "News Saved",
      });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Server Error:", error.message],
    });
  }
}
