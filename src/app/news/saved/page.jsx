"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import NewsNavbar from "../../../components/news/NewsNavbar";
import CreditCard from "../../../components/news/CreditCard";
import { Button } from "@mui/material";

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

const KtmPost = () => {
  const pathname = usePathname();
  const [newses, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(null);
  const [isDeleted, setIsDeleted] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const toastId = toast.loading("Fetching News...");
    const getNews = async () => {
      try {
        const response = await axios.get(`/api/v1/news/get`);
        setNews(response.data.news);
        console.log(response.data.news);
        toast.success("News Loaded Successfully", { id: toastId });
      } catch (error) {
        console.error("Fetching error:", error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, []);

  const handleDelete = async (newsid) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this News?"
    );
    if (!confirm) return;
    setIsDeleteLoading(newsid);

    const toastId = toast.loading("Deleting News...");
    try {
      const response = await axios.get(`/api/v1/news/delete/${newsid}`, {
        withCredentials: true,
      });

      toast.success(response.data.message, { id: toastId });

      setNews((prev) => prev.filter((item) => item._id !== newsid));
    } catch (error) {
      console.error("Error while Deleting news:", error);
      toast.error(error.message, { id: toastId });
    } finally {
      setIsDeleteLoading(null);
      setIsDeleted(newsid);
    }
  };

  return (
    <div className="min-h-screen">
      <GlobalStyles/>
      <NewsNavbar pathname={pathname} />
      <div>
        <div className="p-4 flex justify-center items-center flex-col text-center">
          <h1 className="text-2xl font-bold text-indigo-800">Saved News</h1>
        </div>
      </div>
      {isLoading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <p className="text-3xl text-gray-400 flex items-center gap-2">
            <AiOutlineLoading3Quarters className="animate-spin" />
            Loading...
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 p-4 sm:p-8 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 max-w-7xl mx-auto">
            {newses.map(
              (news) =>
                news.headline &&
                news.link && (
                  <div
                    key={news.slug ?? news.link}
                    className="flex flex-col bg-gray-800/60 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden
                                    hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-700 relative" // Added scale on hover
                  >
                    <div className="absolute top-3 right-3 z-10">
                      {isDeleteLoading === (news._id) ? (
                        <button
                          disabled
                          className="text-indigo-400 animate-spin cursor-not-allowed p-2 rounded-full bg-gray-700/50"
                        >
                          <AiOutlineLoading3Quarters size={20} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete(news._id)}
                          className="text-red-600 hover:text-red-400 transition-colors duration-200 p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-75"
                          aria-label="Save News"
                        >
                          <FaRegTrashAlt size={20} />
                        </button>
                      )}
                    </div>
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

                    <div className="absolute top-3 left-3 bg-indigo-600 px-3 py-1 rounded-full shadow-md text-sm font-semibold text-white z-10">
                      {news.source}
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <h2
                        className="font-noto-devanagari text-xl sm:text-2xl font-semibold text-white mb-2 line-clamp-3" // Added line-clamp for truncation
                      >
                        {news.headline}
                      </h2>

                      {news.slug && (
                        <p
                          className="font-noto-devanagari text-sm text-gray-400 border-l-4 border-green-500 pl-3 mb-4 line-clamp-2" // Adjusted border color, added line-clamp
                        >
                          {news.slug}
                        </p>
                      )}

                      <div className="mt-auto pt-2">
                        {news.link && (
                          <Link href={news.link} target="_blank">
                            <button className="w-full cursor-pointer bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
                              Read at{" "}
                              {news.source}
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="p-3">
            <CreditCard />
          </div>
        </>
      )}
    </div>
  );
};

export default KtmPost;
