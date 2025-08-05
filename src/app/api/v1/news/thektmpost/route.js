import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  try {
    const response = await axios.get("https://kathmandupost.com/national", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.google.com/",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        Connection: "keep-alive",
      },
    });
    const html = response.data;
    const $ = cheerio.load(html);
    const newsList = [];

    $("article").each((_, el) => {
      const headline = $(el).find("h3").text().trim();
      const slug = $(el).find("p").text().trim();
      const link = $(el).find("a").attr("href");
      const image =
        $(el).find("figure img").attr("data-src") ||
        $(el).find("figure img").attr("src");

      newsList.push({
        headline,
        slug,
        image,
        source: "kathmandupost",
        link: link?.startsWith("http")
          ? link
          : `https://kathmandupost.com${link}`,
      });
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "News Loaded successfully",
      total: newsList.length,
      news: newsList,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Error while fetching news: ", error.message],
    });
  }
}
