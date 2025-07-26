import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const username = "utsab-adhikari"; 

    const query = `
      query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  date
                  weekday
                }
              }
            }
          }
        }
      }
    `;

    const response = await axios.post(
      "https://api.github.com/graphql",
      { query },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const calendar =
      response.data.data.user.contributionsCollection.contributionCalendar;

    return NextResponse.json({
      success: true,
      total: calendar.totalContributions,
      weeks: calendar.weeks,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
