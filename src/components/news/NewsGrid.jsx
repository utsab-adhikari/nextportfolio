import React, { useState } from "react";
import Link from "next/link";
import { MdSaveAlt } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

// Reusable button component
const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Google fonts using style tag (note: ideally move to _app.js or global CSS)
const GlobalStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
      .font-noto-devanagari {
        font-family: 'Noto Sans Devanagari', sans-serif;
      }
      .font-inter {
        font-family: 'Inter', sans-serif;
      }
    `}
  </style>
);

const NewsGrid = ({ posts, buttonLabel }) => {
  const [isSaveLoading, setIsSaveLoading] = useState(null);

  // Filter out duplicates based on slug or link
  const uniquePosts = posts.filter((post, index, self) => {
    const identifier = post.slug ?? post.link;
    return index === self.findIndex((p) => (p.slug ?? p.link) === identifier);
  });

  const saveNews = async (news) => {
    const id = news.slug ?? news.link;
    setIsSaveLoading(id);

    const toastId = toast.loading("Saving News...");

    try {
      const response = await axios.post(
        "/api/v1/news/save",
        {
          headline: news.headline,
          slug: news.slug,
          link: news.link,
          source: news.source,
          image: news.image,
        },
        { withCredentials: true }
      );

      toast.success(response.data.message, { id: toastId });
    } catch (error) {
      console.error("Error while saving news:", error);
      toast.error(error.message, { id: toastId });
    } finally {
      setIsSaveLoading(null);
    }
  };

  return (
    <div className="w-full text-white font-inter p-4 sm:p-8">
      <GlobalStyles />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 max-w-7xl mx-auto">
        {uniquePosts.map((news) => (
          <div
            key={news.slug ?? news.link}
            className="flex flex-col bg-gray-800/60 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden
                       hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-700 relative"
          >
            {/* Save Button */}
            <div className="absolute top-3 right-3 z-10">
              {isSaveLoading === (news.slug ?? news.link) ? (
                <button
                  disabled
                  className="text-indigo-400 animate-spin cursor-not-allowed p-2 rounded-full bg-gray-700/50"
                >
                  <AiOutlineLoading3Quarters size={20} />
                </button>
              ) : (
                <button
                  onClick={() => saveNews(news)}
                  className="text-green-400 hover:text-green-300 transition-colors duration-200 p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                  aria-label="Save News"
                >
                  <MdSaveAlt size={20} />
                </button>
              )}
            </div>

            {/* News Image */}
            <img
              src={
                news.image ||
                "https://placehold.co/600x400/334155/E2E8F0?text=No+Image"
              }
              alt={news.headline || "News Image"}
              className="w-full h-48 sm:h-56 object-cover rounded-t-xl"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x400/334155/E2E8F0?text=Image+Error";
                e.currentTarget.onerror = null;
              }}
            />

            {/* Source Tag */}
            <div className="absolute top-3 left-3 bg-indigo-600 px-3 py-1 rounded-full shadow-md text-sm font-semibold text-white z-10">
              {news.source}
            </div>

            {/* Headline and Slug */}
            <div className="p-4 sm:p-5 flex flex-col flex-grow">
              <h2 className="font-noto-devanagari text-xl sm:text-2xl font-semibold text-white mb-2 line-clamp-3">
                {news.headline}
              </h2>

              {news.slug && (
                <p className="font-noto-devanagari text-sm text-gray-400 border-l-4 border-green-500 pl-3 mb-4 line-clamp-2">
                  {news.slug}
                </p>
              )}

              {/* Read More Button */}
              <div className="mt-auto pt-2">
                <Link
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
