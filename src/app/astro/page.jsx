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

  // ✅ Helper: Convert "{starts_at:..., ends_at:...}" → JS object
  const parseTimeData = (dataStr) => {
    if (!dataStr) return null;
    try {
      const fixed = dataStr
        .replace(/([a-z_]+):/gi, '"$1":')
        .replace(/'/g, '"');
      return JSON.parse(fixed);
    } catch (err) {
      console.error("Parsing failed for:", dataStr);
      return null;
    }
  };

  // ✅ Helper: Convert snake_case to Title Case
  const formatLabel = (str) =>
    str
      .replace("_data", "")
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // ✅ Tiny descriptions for each time slot
  const timeDescriptions = {
    abhijit: "Most auspicious moment of the day.",
    amrit: "Time of purity & blessings.",
    brahma: "Sacred hour for meditation & learning.",
    rahu: "Avoid important tasks.",
    yama: "Not good for auspicious beginnings.",
    gulika: "Neutral but often avoided.",
    varjyam: "Considered void of results.",
    dur: "Very inauspicious, avoid major activities.",
  };

  // ✅ Progress Bar with animation
  const ProgressBar = ({ percentage, color }) => (
    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
      <div
        className={`${color} h-2 rounded-full transition-all duration-700 ease-in-out`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4 sm:p-6">
      <div className="bg-slate-900 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-3xl border border-slate-800">
        {/* 🌟 Title */}
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6 drop-shadow-lg">
          🌙 Today’s Astrology – Kathmandu
        </h1>

        {/* LOADING / ERROR */}
        {loading && (
          <p className="text-gray-400 text-center animate-pulse">
            ⏳ Loading today’s Panchang...
          </p>
        )}
        {error && (
          <p className="text-red-400 text-center">
            ⚠️ Failed to load data. Try again later.
          </p>
        )}

        {astroData && (
          <div className="space-y-6">
            {/* 🌙 Tithi */}
            <div className="p-4 rounded-md bg-gradient-to-r from-green-900/40 to-green-700/20 shadow hover:scale-[1.01] transition-transform">
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
              <ProgressBar
                percentage={astroData.tithi.left_precentage}
                color="bg-green-500"
              />
            </div>

            {/* ✨ Nakshatra */}
            <div className="p-4 rounded-md bg-gradient-to-r from-indigo-900/40 to-indigo-700/20 shadow hover:scale-[1.01] transition-transform">
              <h2 className="text-xl font-semibold text-indigo-400 mb-2">
                ✨ Nakshatra
              </h2>
              <p className="text-sm text-gray-300">
                Number:{" "}
                <span className="text-purple-300">{astroData.nakshatra.number}</span>
              </p>
              <p className="text-lg font-semibold">{astroData.nakshatra.name}</p>
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
              <ProgressBar
                percentage={astroData.nakshatra.remaining_percentage_at_given_time}
                color="bg-indigo-500"
              />
            </div>

            {/* 🌅 Brahma Muhurat */}
            <div className="p-4 rounded-md bg-gradient-to-r from-orange-900/40 to-orange-700/20 shadow hover:scale-[1.01] transition-transform">
              <h2 className="text-xl font-semibold text-orange-400 mb-2">
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
            </div>

            {/* 🌟 Good/Bad Times */}
            {astroData.goodbad && (
              <div className="p-4 rounded-md bg-slate-800/50 shadow hover:scale-[1.01] transition-transform">
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">
                  🌟 Good & Bad Times
                </h2>

                {/* ✅ Good Times Grid */}
                <div className="mb-4">
                  <h3 className="text-lg text-green-400 font-semibold mb-2">
                    ✅ Auspicious
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {["abhijit_data", "amrit_kaal_data", "brahma_muhurat_data"].map(
                      (key) => {
                        const data = parseTimeData(astroData.goodbad[key]);
                        if (!data) return null;
                        const label = formatLabel(key);
                        const descKey = label.toLowerCase().split(" ")[0];
                        return (
                          <div
                            key={key}
                            className="p-2 rounded-md bg-green-900/30 hover:bg-green-800/40 transition"
                          >
                            <p className="text-sm font-semibold text-green-300">
                              🌿 {label}
                            </p>
                            <p className="text-xs text-gray-400 mb-1">
                              {timeDescriptions[descKey] || ""}
                            </p>
                            <p className="text-xs text-gray-300">
                              {data.starts_at} ➡ {data.ends_at}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* ⚠️ Bad Times Grid */}
                <div>
                  <h3 className="text-lg text-red-400 font-semibold mb-2">
                    ⚠️ Inauspicious
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      "rahu_kaalam_data",
                      "yama_gandam_data",
                      "gulika_kalam_data",
                      "varjyam_data",
                    ].map((key) => {
                      const data = parseTimeData(astroData.goodbad[key]);
                      if (!data) return null;
                      const label = formatLabel(key);
                      const descKey = label.toLowerCase().split(" ")[0];
                      return (
                        <div
                          key={key}
                          className="p-2 rounded-md bg-red-900/30 hover:bg-red-800/40 transition"
                        >
                          <p className="text-sm font-semibold text-red-300">
                            🔴 {label}
                          </p>
                          <p className="text-xs text-gray-400 mb-1">
                            {timeDescriptions[descKey] || ""}
                          </p>
                          <p className="text-xs text-gray-300">
                            {data.starts_at} ➡ {data.ends_at}
                          </p>
                        </div>
                      );
                    })}

                    {/* Dur Muhurat Special Case */}
                    {astroData.goodbad.dur_muhurat_data && (
                      <div className="p-2 rounded-md bg-red-900/30 hover:bg-red-800/40 transition">
                        <p className="text-sm font-semibold text-red-300">
                          🔴 Dur Muhurat
                        </p>
                        <p className="text-xs text-gray-400 mb-1">
                          Very inauspicious, avoid major activities.
                        </p>
                        {Object.entries(
                          parseTimeData(astroData.goodbad.dur_muhurat_data) || {}
                        ).map(([slot, data]) => (
                          <p key={slot} className="text-xs text-gray-300">
                            Slot {slot}: {data.starts_at} ➡ {data.ends_at}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
