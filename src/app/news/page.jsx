"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { usePathname } from "next/navigation";
import NewsGrid from "./NewsGrid";
import NewsNavbar from "./NewsNavbar";

const News = () => {
  const pathname = usePathname();
  const [ktmPosts, setKtmPosts] = useState([]);
  const [ekantipurPosts, setEkantipurPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const toastId = toast.loading("Fetching News...");

    const getNews = async () => {
      try {
        const [ktm, ekantipur] = await Promise.all([
          axios.get(`/api/v1/news/thektmpost`),
          axios.get(`/api/v1/news/ekantipur`),
        ]);

        setKtmPosts(ktm.data.news.slice(0, 3));
        setEkantipurPosts(ekantipur.data.news.slice(0, 3));
        toast.success("News Loaded Successfully", { id: toastId });
      } catch (error) {
        console.error("Error fetching news:", error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, []);

  return (
    <div className="min-h-screen">
      <NewsNavbar pathname={pathname} />
      {isLoading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <p className="text-3xl text-gray-400 flex items-center gap-2">
            <AiOutlineLoading3Quarters className="animate-spin" />
            Loading...
          </p>
        </div>
      ) : (
        <>
          <NewsGrid posts={ktmPosts} buttonLabel="Read at The Kathmandu Post" />
          <NewsGrid posts={ekantipurPosts} buttonLabel="Read at eKantipur" />
        </>
      )}
    </div>
  );
};

export default News;
