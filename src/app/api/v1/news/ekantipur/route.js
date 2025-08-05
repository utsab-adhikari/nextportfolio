// app/api/news/route.js
import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

// In-memory cache (use Vercel KV for production)
const cache = {};
const CACHE_DURATION = 5 * 60 * 1000; // Cache for 5 minutes

export async function GET() {
  try {
    const url = "https://ekantipur.com/news";
    const cacheKey = url;

    // Check cache
    if (
      cache[cacheKey] &&
      Date.now() - cache[cacheKey].timestamp < CACHE_DURATION
    ) {
      console.log(`Serving from cache: ${url}`);
      const $ = cheerio.load(cache[cacheKey].html);
      const newsList = processNews($);
      return NextResponse.json({
        success: true,
        status: 200,
        message: "News loaded successfully from cache",
        total: newsList.length,
        news: newsList,
      });
    }

    // Try static HTML first
    console.log(`Fetching: ${url}`);
    let html;
    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Upgrade-Insecure-Requests": "1",
        },
        timeout: 7000, // Stay under Vercel’s 10-second limit
      });
      html = response.data;
      console.log("Static fetch successful, HTML length:", html.length);
    } catch (error) {
      console.error("Static fetch failed:", error.message);
      // Fallback to Browserless for dynamic content
      if (process.env.BROWSERLESS_API_KEY) {
        console.log("Attempting Browserless fallback...");
        const browserlessResponse = await axios.post(
          `https://chrome.browserless.io/content?token=${process.env.BROWSERLESS_API_KEY}`,
          { url, waitFor: 5000 },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 7000,
          }
        );
        html = browserlessResponse.data;
        console.log("Browserless fetch successful, HTML length:", html.length);
      } else {
        throw new Error(
          "Static fetch failed and no Browserless API key provided"
        );
      }
    }

    cache[cacheKey] = { html, timestamp: Date.now() };
    const $ = cheerio.load(html);
    const newsList = processNews($);

    if (newsList.length === 0) {
      console.warn(
        "No articles found. Possible selector mismatch or dynamic content."
      );
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message: "News loaded successfully",
      total: newsList.length,
      news: newsList,
    });
  } catch (error) {
    console.error("Error fetching news:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data?.substring?.(0, 200), // Log first 200 chars of response
    });
    return NextResponse.json(
      {
        success: false,
        status: error.response?.status || 500,
        message: `Error while fetching news: ${error.message}`,
        errorDetails:
          error.response?.data?.substring?.(0, 200) ||
          "No additional error data",
      },
      { status: error.response?.status || 500 }
    );
  }
}

function processNews($) {
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
  console.log(`Found ${newsList.length} articles`);
  return newsList;
}
