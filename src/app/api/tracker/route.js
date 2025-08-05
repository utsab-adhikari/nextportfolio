import Tracker from "@/models/Tracker.model";
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";

// GET /api/tracker?date=YYYY-MM-DD returns one tracker for that day, or all trackers if no date param
export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (date) {
    // Find tracker by date (ISO string, ignore time part)
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);
    const tracker = await Tracker.findOne({
      date: { $gte: dayStart, $lte: dayEnd },
    });
    if (!tracker) {
      return NextResponse.json({});
    }
    return NextResponse.json(tracker);
  } else {
    // All trackers
    const trackers = await Tracker.find({}).sort({ date: -1 });
    return NextResponse.json(trackers);
  }
}

// POST /api/tracker - create tracker
export async function POST(request) {
  await connectDB();
  const body = await request.json();
  if (!body.title || body.title.trim() === "") {
    body.title = "Daily Tracker";
  }
  // Defensive: set default names for tasks
  if (Array.isArray(body.tasks)) {
    body.tasks = body.tasks.map((task) =>
      !task.name || task.name.trim() === ""
        ? { ...task, name: "Untitled Task" }
        : task
    );
  }
  try {
    // Defensive: don't allow duplicate tracker for the same day
    const dayStart = new Date(body.date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(body.date);
    dayEnd.setHours(23, 59, 59, 999);
    const existing = await Tracker.findOne({
      date: { $gte: dayStart, $lte: dayEnd },
    });
    if (existing) {
      return NextResponse.json(existing, { status: 200 });
    }
    const tracker = await Tracker.create(body);
    return NextResponse.json(tracker, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
