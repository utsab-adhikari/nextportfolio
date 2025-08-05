import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

// यो GET endpoint हो जुन Annapurna Post बाट राष्ट्रिय समाचार scrape गर्छ
export async function GET(request) {
  try {
    // Annapurna Post को राष्ट्रिय पृष्ठबाट HTML ल्याउने
    const response = await axios.get(
      "https://www.wionews.com/latest-news",
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

    $(".ui-componets_card__A64eM").each((_, el) => {
      const headline = $(el).find(".content .ui-componets_headingH3__beR_u a h3").text().trim();
      console.log(headline);
      const slug = $(el).find(".content .summaryCardText p").text().trim();
      const link = $(el).find(".content .ui-componets_headingH3__beR_u a").attr("href");
      const image =
        $(el).find(".ui-componets_image__IsFnl a img").attr("data-src") ||
        $(el).find(".ui-componets_image__IsFnl a img").attr("src");

      newsList.push({
        headline,
        slug,
        image,
        source: "wionnews",
        link: link?.startsWith("http")
          ? link
          : `https://www.wionews.com/${link}`,
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
