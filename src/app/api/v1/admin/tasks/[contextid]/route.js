
import Subject from "@/app/models/Subject.model";
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
  try {
    await connectDB();

    const contextid = await params;

    const subjects = await Subject.find({context: contextid});

    if (!subjects || subjects.length === 0) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "subject not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "subject loaded successfully",
      subjects,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: ["Server Error", error.message],
    });
  }
}
