
import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  try {
    const response = await axios.get("https://ekantipur.com/news");
    const html = response.data;
    const $ = cheerio.load(html);
    const newsList = [];

    $("article.normal").each((_, el) => {
      const headline = $(el).find("h2 a").text().trim();
      const anchor = $(el).find("h2 a").attr("href");
      const link = anchor ? `https://ekantipur.com${anchor}` : undefined;
      const slug = $(el).find("p").text().trim();
      const image =
        $(el).find(".image figure a img").attr("src") ||
        $(el).find(".image figure a img").attr("data-src");

      newsList.push({
        headline,
        slug,
        image,
        link,
         source: "ekantipur",
      });
    });

    console.log(newsList);

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
    })
  }
}
