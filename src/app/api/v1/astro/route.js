import axios from "axios";

export async function POST() {
  try {
    // 📆 Get current date & time dynamically
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const latitude = 27.7172;
    const longitude = 85.324;
    const timezone = 5.75;

    const [tithiRes, brahmaRes, nakshatraRes, goodbadRes, geoRes] =
      await Promise.all([
        fetch("https://json.freeastrologyapi.com/tithi-durations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ASTRO_API_KEY,
          },
          body: JSON.stringify({
            year,
            month,
            date,
            hours,
            minutes,
            seconds,
            latitude,
            longitude,
            timezone,
            config: {
              observation_point: "topocentric",
              ayanamsha: "lahiri",
            },
          }),
        }),
        fetch("https://json.freeastrologyapi.com/brahma-muhurat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ASTRO_API_KEY,
          },
          body: JSON.stringify({
            year,
            month,
            date,
            hours,
            minutes,
            seconds,
            latitude,
            longitude,
            timezone,
            config: {
              observation_point: "topocentric",
              ayanamsha: "lahiri",
            },
          }),
        }),
        fetch("https://json.freeastrologyapi.com/nakshatra-durations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ASTRO_API_KEY,
          },
          body: JSON.stringify({
            year,
            month,
            date,
            hours,
            minutes,
            seconds,
            latitude,
            longitude,
            timezone,
            config: {
              observation_point: "topocentric",
              ayanamsha: "lahiri",
            },
          }),
        }),
        fetch("https://json.freeastrologyapi.com/good-bad-times", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ASTRO_API_KEY,
          },
          body: JSON.stringify({
            year,
            month,
            date,
            hours,
            minutes,
            seconds,
            latitude,
            longitude,
            timezone,
            config: {
              observation_point: "topocentric",
              ayanamsha: "lahiri",
            },
          }),
        }),
        fetch("https://json.freeastrologyapi.com/geo-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ASTRO_API_KEY,
          },
          body: JSON.stringify({
            location: "Kathmandu",
          }),
        }),
      ]);

    if (!tithiRes.ok || !brahmaRes.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch astrology data" }),
        { status: 500 }
      );
    }

    const tithiRaw = await tithiRes.json();
    const brahmaRaw = await brahmaRes.json();
    const geoDetail = await geoRes.json();
    const nakshatraRaw = await nakshatraRes.json();
    const goodbadRaw = await goodbadRes.json();


    const tithiOutput = JSON.parse(tithiRaw.output);
    const brahmaOutput = JSON.parse(brahmaRaw.output);
    const nakshatraOutput = nakshatraRaw.output;

    return Response.json({
      tithi: tithiOutput,
      brahmaMuhurat: brahmaOutput,
      nakshatra: nakshatraOutput,
      goodbad: goodbadRaw,
    });
  } catch (error) {
    console.error("Astrology API error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
