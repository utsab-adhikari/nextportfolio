import Context from "@/app/models/Context.model";
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { contextid } = await params;

    await Context.findByIdAndDelete({ _id: contextid });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Context Deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: ["Server Error", error.message],
    });
  }
}
