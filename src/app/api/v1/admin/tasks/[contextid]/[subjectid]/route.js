
import Subject from "@/app/models/Subject.model";
import Topic from "@/app/models/Topic.model";
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
  try {
    await connectDB();

    const {subjectid} = await params;

    const topics = await Topic.find({subject: subjectid});
    const subject = await Subject.findOne({_id: subjectid});
    const subjectName = subject.subject;

    if (!topics || topics.length === 0) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Topics not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Topic loaded successfully",
      topics,
      subjectName,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: ["Server Error", error.message],
    });
  }
}
