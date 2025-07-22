import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
  const VERCEL_ANALYTICS_TOKEN = process.env.VERCEL_ANALYTICS_TOKEN;

  if (!VERCEL_PROJECT_ID || !VERCEL_ANALYTICS_TOKEN) {
    return NextResponse.json(
      { error: "Missing VERCEL_PROJECT_ID or VERCEL_ANALYTICS_TOKEN env vars" },
      { status: 500 }
    );
  }

  try {
    const response = await axios.get(
      `https://api.vercel.com/v6/analytics/reports/${VERCEL_PROJECT_ID}`,
      {
        headers: {
          Authorization: `Bearer ${VERCEL_ANALYTICS_TOKEN}`,
        },
        params: {
          from: Date.now() - 7 * 24 * 60 * 60 * 1000, // last 7 days
          resolution: "1d",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Analytics API error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
