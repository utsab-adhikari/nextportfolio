"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import WarnCard from "./WarnCard";
import axios from "axios";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/rashifal", {
          withCredentials: true,
        });
        console.log(res.data.dateNepali);
        setData(res.data.rashifals);
        setDate(res.data.dateNepali);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>नेपाली राशिफल र पञ्चाङ्ग</title>
        <meta
          name="description"
          content="Discover your daily Nepali horoscope and panchanga details."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .font-noto-devanagari {
            font-family: 'Noto Sans Devanagari', sans-serif;
          }
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </Head>

      <main className="relative min-h-screen p-6 text-gray-100 font-sans">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-indigo-400 font-noto-devanagari">
            नेपाली राशिफल र पञ्चाङ्ग
          </h1>
          <p className="mt-3 text-lg text-gray-300 font-noto-devanagari">
            आजको आफ्नो आध्यात्मिक यात्रा र पञ्चाङ्ग विवरण पत्ता लगाउनुहोस्
            <br className="hidden sm:block" />
            <span className="text-sm text-gray-400 font-inter">
              (Discover your spiritual journey and panchanga details today)
            </span>
          </p>
        </header>

        {/* Loading / Error / Content */}
        {loading ? (
          <div className="text-center py-20 text-indigo-400">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-300 mx-auto mb-4" />
            <p className="text-lg font-noto-devanagari">
              डाटा लोड हुँदैछ... कृपया पर्खनुहोस्
            </p>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-10 text-xl">
            <p className="font-noto-devanagari">
              डाटा प्राप्त गर्न समस्या भयो।
            </p>
            <p className="text-sm text-gray-400 mt-2 font-inter">
              (Error fetching data. Please try again later.)
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center p-2 bg-white/10 mb-3 rounded-md">
              <p className="font-noto-devanagari mb-2 text-xl text-gray-300 font-bold">{date.nepaliDate}</p>
              <p className="font-noto-devanagari mb-2 text-sm font-semibold text-gray-400">{date.currentTime}</p>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pb-12">
              {data.map(({ sign, rashifal }) => (
                <div
                  key={sign}
                  className="group bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
                >
                  <h2 className="text-2xl font-semibold text-indigo-400 mb-2 font-noto-devanagari group-hover:text-indigo-300 transition-colors duration-300">
                    {sign}
                  </h2>
                  <p className="text-sm text-gray-200 leading-relaxed font-noto-devanagari group-hover:text-gray-100 transition-colors duration-300">
                    {rashifal}
                  </p>
                </div>
              ))}
            </section>
          </>
        )}

        {/* Footer Warning Card */}
        <div className="mt-12">
          <WarnCard />
        </div>
        
      </main>
    </>
  );
}
