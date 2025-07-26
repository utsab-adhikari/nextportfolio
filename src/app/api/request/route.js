import connectDB from "@/db/ConnectDB";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    const requests = await User.find({ family: "member" });

    if (!requests) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Requests Not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Requests Loaded",
      requests,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "UserId Required",
      });
    }

    await User.findByIdAndUpdate(
      userId,
      {
        family: "family",
      },
      { new: true }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Requests Accepted",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
