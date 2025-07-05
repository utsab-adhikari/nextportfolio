"use client";
import { useEffect, useState } from "react";
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
    <main className="relative min-h-screen p-6 font-sans bg-white text-gray-800">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700">
          ⭐ नेपाली राशिफल ⭐
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          आजको आफ्नो आध्यात्मिक यात्रा पत्ता लगाउनुहोस्
          <br className="hidden sm:block" />
          (Discover your spiritual journey today)
        </p>
      </header>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-20 text-indigo-500">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-400 mx-auto mb-4" />
          <p className="text-lg">राशिफल लोड हुँदैछ... Please wait</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10 text-xl">
          <p>राशिफल प्राप्त गर्न समस्या भयो।</p>
          <p className="text-sm text-gray-600 mt-2">
            (Error fetching rashifal. Please try again later.)
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pb-12">
          {rashifals.map(({ sign, rashifal }) => (
            <div
              key={sign}
              className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition-all"
            >
              <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
                {sign}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {rashifal}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Credit / Disclaimer Section */}
      <div className="max-w-3xl mx-auto mt-8">
        <WarnCard />
      </div>
    </main>
  );
}
