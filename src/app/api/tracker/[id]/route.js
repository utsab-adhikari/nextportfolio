import Tracker from "@/models/Tracker.model";
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectDB();
  try {
    const { id } = await params;
    const tracker = await Tracker.findById(id);
    if (!tracker) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(tracker);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const body = await request.json();
  try {
    const { id } = await params;
    const tracker = await Tracker.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json(tracker);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request, { params }) {
  await connectDB();
  const body = await request.json();
  try {
    const { id } = await params;
    const tracker = await Tracker.findById(id);
    if (!tracker)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    tracker.reportSubmitted = true;
    tracker.reportHtml = body.reportHtml;
    await tracker.save();
    return NextResponse.json(tracker);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
