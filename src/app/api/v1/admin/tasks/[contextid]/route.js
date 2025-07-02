import Context from "@/app/models/Context.model";
import Subject from "@/app/models/Subject.model";
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { contextid } = await params;

    const context = await Context.findOne({ _id: contextid });
    const contextName = context.context;
    const subject = await Subject.find({ context: contextid });

    if (!subject || subject.length === 0) {
      return NextResponse.json({
        status: 400,
        success: false,
        contextName,
        message: "subject not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "subject loaded successfully",
      subject,
      contextName,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: ["Server Error", error.message],
    });
  }
}
