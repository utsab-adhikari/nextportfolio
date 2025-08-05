"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { usePathname } from "next/navigation";
import NewsNavbar from "../../../components/news/NewsNavbar";
import NewsGrid from "../../../components/news/NewsGrid";
import CreditCard from "../../../components/news/CreditCard";

const EkantipurPage = () => {
  const pathname = usePathname();
  const [newses, setNews] = useState([]); // Always initialized as an empty array
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      const toastId = toast.loading("Fetching News...");

      try {
        const response = await axios.get("/api/v1/news/wion");
        const safeNews = Array.isArray(response?.data?.news) ? response.data.news : [];
        setNews(safeNews);
        toast.success("News Loaded Successfully", { id: toastId });
      } catch (error) {
        console.error("Fetching error:", error);
        toast.error(error?.message || "Failed to fetch news", { id: toastId });
        setNews([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen">
      <NewsNavbar pathname={pathname} />

      <div className="p-4 flex justify-center items-center flex-col text-center">
        <h1 className="text-2xl font-bold text-indigo-800 dark:text-indigo-400">WION News</h1>
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
          {Array.isArray(newses) && newses.length > 0 ? (
            <NewsGrid posts={newses} buttonLabel="Read at WION News" />
          ) : (
            <p className="text-center text-gray-500 text-lg py-10">No news available at the moment.</p>
          )}
          <div className="p-3">
            <CreditCard />
          </div>
        </>
      )}
    </div>
  );
};

export default EkantipurPage;
