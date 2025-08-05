"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { usePathname } from "next/navigation";
import NewsGrid from "../../components/news/NewsGrid";
import NewsNavbar from "../../components/news/NewsNavbar";
import CreditCard from "../../components/news/CreditCard";

const News = () => {
  const pathname = usePathname();
  const [ktmPosts, setKtmPosts] = useState([]);
  const [annapurna, setAnnapurna] = useState([]);
  const [wion, setWion] = useState([]);
  const [nagarik, setNagarik] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      const toastId = toast.loading("Fetching News...");

      try {
        const [ktmRes, annaRes, nagarikRes, wionRes] = await Promise.all([
          axios.get("/api/v1/news/thektmpost"),
          axios.get("/api/v1/news/annapurna"),
          axios.get("/api/v1/news/nagarik"),
          axios.get("/api/v1/news/wion"),
        ]);

        setKtmPosts(ktmRes.data.news.slice(0, 3));
        setAnnapurna(annaRes.data.news.slice(0, 3));
        setNagarik(nagarikRes.data.news.slice(0, 3));
        setWion(wionRes.data.news.slice(0, 3));

        toast.success("News Loaded Successfully", { id: toastId });
      } catch (error) {
        console.error("Error fetching news:", error);
        toast.error("Failed to fetch news", { id: toastId });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
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
          {Array.isArray(ktmPosts) && (
            <NewsGrid
              posts={ktmPosts}
              buttonLabel="Read at The Kathmandu Post"
            />
          )}

          {Array.isArray(annapurna) && (
            <NewsGrid posts={annapurna} buttonLabel="Read at Annapurna Post" />
          )}
          {Array.isArray(nagarik) && (
            <NewsGrid posts={nagarik} buttonLabel="Read at Nagarik News" />
          )}
          {Array.isArray(wion) && (
            <NewsGrid posts={wion} buttonLabel="Read at WION News" />
          )}
          <div className="p-3">
            <CreditCard />
          </div>
        </>
      )}
    </div>
  );
};

export default News;
