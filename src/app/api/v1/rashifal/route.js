// app/api/rashifal/route.ts
import { getHoroscope } from 'hamro-patro-scraper';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await getHoroscope(); 
    // Data is an array: each object has `rashi` (1–12), `name` (Nepali sign), `text`
    
    return NextResponse.json({
      status: 200,
      success: true,
      rashifals: data.map(item => ({
        sign: item.name,
        rashifal: item.text,
      })),
    });
  } catch (err) {
    console.error('Error fetching rashifal:', err);
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Internal server error',
    });
  }
}
