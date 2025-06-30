import Subject from "@/app/models/Subject.model";
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { context, subject, description } = body;

    if (!subject || !description) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: ["ALl fields are required"],
      });
    }

    const existingSubject = await Subject.findOne({ subject: subject });

    if (existingSubject) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "subject already exists",
      });
    }

    const newSubject = new Subject({
      context,
      subject,
      description,
    });

    const subjectid = await newSubject._id;

    await newSubject.save();

    return NextResponse.json({
      status: 201,
      success: true,
      message: "subject created successfully",
      subjectid,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: ["Server Error", error.message],
    });
  }
}
