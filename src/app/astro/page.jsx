"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function KathmanduAstro() {
  const [astroData, setAstroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAstro = async () => {
      try {
        const res = await axios.post("/api/v1/astro");
        setAstroData(res.data);
      } catch (err) {
        console.error("Error fetching astro data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAstro();
  }, []);

  // 🔧 Helper for progress bar component
  const ProgressBar = ({ percentage, color }) => (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="bg-slate-900 p-6 rounded-lg shadow-xl w-full max-w-lg border border-slate-800">
        <h1 className="text-2xl font-bold text-yellow-400 text-center mb-6">
          🌙 Today’s Astrology – Kathmandu
        </h1>

        {/* LOADING / ERROR HANDLING */}
        {loading && (
          <p className="text-gray-400 text-center">⏳ Loading data...</p>
        )}
        {error && (
          <p className="text-red-400 text-center">
            ⚠️ Failed to load data. Try again later.
          </p>
        )}

        {astroData && (
          <div className="space-y-6">
            {/* 🌙 Tithi Section */}
            <div className="p-4 rounded-md bg-slate-800 shadow">
              <h2 className="text-xl font-semibold text-green-400 mb-2 flex items-center gap-2">
                🌙 Tithi
              </h2>
              <p className="text-lg font-semibold">
                {astroData.tithi.name}{" "}
                <span className="text-sm text-gray-400">
                  ({astroData.tithi.paksha} paksha)
                </span>
              </p>
              <p className="text-sm text-gray-300">
                Completes at:{" "}
                <span className="text-blue-300">{astroData.tithi.completes_at}</span>
              </p>
              <p className="text-sm text-gray-400 mb-1">
                Left:{" "}
                <span className="text-pink-400">
                  {astroData.tithi.left_precentage}%
                </span>
              </p>

              {/* ✅ Progress Bar for Tithi */}
              <ProgressBar
                percentage={astroData.tithi.left_precentage}
                color="bg-green-500"
              />
            </div>

            {/* ✨ Nakshatra Section */}
            <div className="p-4 rounded-md bg-slate-800 shadow">
              <h2 className="text-xl font-semibold text-indigo-400 mb-2 flex items-center gap-2">
                ✨ Nakshatra
              </h2>
              <p className="text-sm text-gray-300">
                Number:{" "}
                <span className="text-purple-300">{astroData.nakshatra.number}</span>
              </p>
              <p className="text-lg font-semibold">
                {astroData.nakshatra.name}
              </p>
              <p className="text-sm text-gray-300">
                Starts:{" "}
                <span className="text-green-300">{astroData.nakshatra.starts_at}</span>
              </p>
              <p className="text-sm text-gray-300">
                Ends:{" "}
                <span className="text-red-300">{astroData.nakshatra.ends_at}</span>
              </p>
              <p className="text-sm text-gray-400 mb-1">
                Remaining:{" "}
                <span className="text-pink-400">
                  {astroData.nakshatra.remaining_percentage_at_given_time.toFixed(2)}%
                </span>
              </p>

              {/* ✅ Progress Bar for Nakshatra */}
              <ProgressBar
                percentage={astroData.nakshatra.remaining_percentage_at_given_time}
                color="bg-indigo-500"
              />
            </div>

            {/* 🌅 Brahma Muhurat Section */}
            <div className="p-4 rounded-md bg-slate-800 shadow">
              <h2 className="text-xl font-semibold text-orange-400 mb-2 flex items-center gap-2">
                🌅 Brahma Muhurat
              </h2>
              <p className="text-sm text-gray-300">
                Starts at:{" "}
                <span className="text-green-300">
                  {astroData.brahmaMuhurat.starts_at}
                </span>
              </p>
              <p className="text-sm text-gray-300">
                Ends at:{" "}
                <span className="text-red-300">{astroData.brahmaMuhurat.ends_at}</span>
              </p>
              <p className="text-sm text-gray-400">
                🕉 The most auspicious time for meditation & study.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
