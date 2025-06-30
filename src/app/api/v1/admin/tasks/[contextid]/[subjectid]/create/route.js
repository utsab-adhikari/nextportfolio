import Topic from "@/app/models/Topic.model";
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { subject, title, description } = body;

    if (!subject || !title || !description) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: ["ALl fields are required"],
      });
    }

    const existingTopic = await Topic.findOne({ title: title });

    if (existingTopic) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "subject already exists",
      });
    }

    const newTopic = new Topic({
      subject,
      title,
      description,
    });

    const topicid = await newTopic._id;

    await newTopic.save();

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
