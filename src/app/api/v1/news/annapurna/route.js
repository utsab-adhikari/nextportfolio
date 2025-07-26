import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

// यो GET endpoint हो जुन Annapurna Post बाट राष्ट्रिय समाचार scrape गर्छ
export async function GET(request) {
  try {
    // Annapurna Post को राष्ट्रिय पृष्ठबाट HTML ल्याउने
    const response = await axios.get(
      "https://annapurnapost.com/category/latest-news",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          Referer: "https://www.google.com/",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          Connection: "keep-alive",
        },
      }
    );
    const html = response.data;
    const $ = cheerio.load(html);

    const newsList = [];

    // प्रत्येक समाचार article को लागि headline, summary, image, र link निकाल्ने
    $(".grid__card").each((_, el) => {
      const headline = $(el).find(".card__title a").text().trim();
      const slug = $(el).find(".card__desc").text().trim(); // छोटकरीमा विवरण
      const link = $(el).find("a").attr("href");
      const image =
        $(el).find(".card__img img").attr("data-src") ||
        $(el).find(".card__img img").attr("src");

      newsList.push({
        headline,
        slug,
        image,
        source: "annapurnapost",
        link: link?.startsWith("http")
          ? link
          : `https://annapurnapost.com${link}`,
      });
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "समाचार सफलतापूर्वक लोड भयो",
      total: newsList.length,
      news: newsList,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["समाचार ल्याउँदा समस्या आयो:", error.message],
    });
  }
}
