import Plan from "@/models/Plan.model";
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const plans = await Plan.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: plans }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch plans" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    if (!data.title || !data.category) {
      return NextResponse.json(
        { success: false, error: "Title and category are required" },
        { status: 400 }
      );
    }
    const plan = new Plan(data);
    await plan.save();
    return NextResponse.json({ success: true, data: plan }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
