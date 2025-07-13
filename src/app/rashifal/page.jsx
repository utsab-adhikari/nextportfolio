"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import WarnCard from "./WarnCard";

export default function HomePage() {
  const [rashifals, setRashifals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRashifal = async () => {
      try {
        const res = await fetch("/api/v1/rashifal");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setRashifals(data.rashifals);
      } catch (err) {
        console.error("Error loading rashifal:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRashifal();
  }, []);

  return (
    <>
      <Head>
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
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-indigo-400 font-noto-devanagari">
            नेपाली राशिफल
          </h1>
          <p className="mt-3 text-lg text-gray-300 font-noto-devanagari">
            आजको आफ्नो आध्यात्मिक यात्रा पत्ता लगाउनुहोस्
            <br className="hidden sm:block" />
            <span className="text-sm text-gray-400 font-inter">
              (Discover your spiritual journey today)
            </span>
          </p>
        </header>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-indigo-400">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-300 mx-auto mb-4" />
            <p className="text-lg font-noto-devanagari">
              राशिफल लोड हुँदैछ... Please wait
            </p>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-10 text-xl">
            <p className="font-noto-devanagari">
              राशिफल प्राप्त गर्न समस्या भयो।
            </p>
            <p className="text-sm text-gray-400 mt-2 font-inter">
              (Error fetching rashifal. Please try again later.)
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pb-12">
            {rashifals.map(({ sign, rashifal }) => (
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
          </div>
        )}

        <div>
          <WarnCard />
        </div>
      </main>
    </>
  );
}
