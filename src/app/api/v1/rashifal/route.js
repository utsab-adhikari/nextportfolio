import { NextResponse } from "next/server";
import { getHoroscope, hamroPatro } from "hamro-patro-scraper";

export async function GET() {
  try {
    const horoscopeData = await getHoroscope(); // Array: { rashi, name,
    const dateNepali = await hamroPatro();

    return NextResponse.json({
      status: 200,
      success: true,
      rashifals: horoscopeData.map((item) => ({
        sign: item.name,
        rashifal: item.text,
      })),
      dateNepali,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
}
