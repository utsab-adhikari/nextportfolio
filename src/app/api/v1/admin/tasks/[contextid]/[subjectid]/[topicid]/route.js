import Topic from "@/app/models/Topic.model";
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const topicid = await params;

    const { done } = await request.json();

    const topic = await Topic.findOne({ _id: topicid });

    if (!topic) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Topic not found",
      });
    }

    await Topic.findByIdAndUpdate(topicid, {
      done: done,
    });

    return NextResponse.json({
      status: 201,
      success: true,
      message: "subject created successfully",
      topicid,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: ["Server Error", error.message],
    });
  }
}
