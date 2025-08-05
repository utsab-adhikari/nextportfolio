// app/api/weather/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  const city = req.nextUrl.searchParams.get("city");
  if (!city) return NextResponse.json({ error: "City is required" }, { status: 400 });

  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await geoRes.json();

    if (!geoData.results || !geoData.results.length) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    const { latitude, longitude } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    return NextResponse.json({ location: geoData.results[0], weather: weatherData.current_weather });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Server error while fetching weather" }, { status: 500 });
  }
}
