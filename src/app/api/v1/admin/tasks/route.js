import Context from "@/app/models/Context.model";
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    const contexts = await Context.find({});

    if (!contexts || contexts.length === 0) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Context not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Context loaded successfully",
      contexts,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: ["Server Error", error.message],
    });
  }
}
