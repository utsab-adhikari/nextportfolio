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
      // Convert to JSON by quoting keys
      const fixed = dataStr
        .replace(/([a-z_]+):/gi, '"$1":')
        .replace(/'/g, '"');
      return JSON.parse(fixed);
    } catch (err) {
      console.error("Parsing failed for:", dataStr);
      return null;
    }
  };

  // ✅ Reusable Progress Bar
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

        {/* LOADING / ERROR */}
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
              <h2 className="text-xl font-semibold text-green-400 mb-2">🌙 Tithi</h2>
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

            {/* ✨ Nakshatra Section */}
            <div className="p-4 rounded-md bg-slate-800 shadow">
              <h2 className="text-xl font-semibold text-indigo-400 mb-2">✨ Nakshatra</h2>
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

            {/* 🌅 Brahma Muhurat Section */}
            <div className="p-4 rounded-md bg-slate-800 shadow">
              <h2 className="text-xl font-semibold text-orange-400 mb-2">🌅 Brahma Muhurat</h2>
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

            {/* ✅ Good/Bad Times Section */}
            {astroData.goodbad && (
              <div className="p-4 rounded-md bg-slate-800 shadow">
                <h2 className="text-xl font-semibold text-yellow-400 mb-3">
                  🌟 Good & Bad Times
                </h2>

                
                <div className="space-y-2 mb-4">
                  <h3 className="text-lg text-green-400 font-semibold">✅ Auspicious</h3>
                  {["abhijit_data", "amrit_kaal_data", "brahma_muhurat_data"].map((key) => {
                    const data = parseTimeData(astroData.goodbad[key]);
                    if (!data) return null;
                    const label = key.replace("_data", "").replace("_", " ");
                    return (
                      <p key={key} className="text-sm text-gray-300">
                        🌿 {label}:{" "}
                        <span className="text-green-300">{data.starts_at}</span> ➡️{" "}
                        <span className="text-red-300">{data.ends_at}</span>
                      </p>
                    );
                  })}
                </div>

                {/* ⚠️ Bad Times */}
                <div className="space-y-2">
                  <h3 className="text-lg text-red-400 font-semibold">⚠️ Inauspicious</h3>
                  {["rahu_kaalam_data", "yama_gandam_data", "gulika_kalam_data", "varjyam_data"].map((key) => {
                    const data = parseTimeData(astroData.goodbad[key]);
                    if (!data) return null;
                    const label = key.replace("_data", "").replace("_", " ");
                    return (
                      <p key={key} className="text-sm text-gray-300">
                        🔴 {label}:{" "}
                        <span className="text-green-300">{data.starts_at}</span> ➡️{" "}
                        <span className="text-red-300">{data.ends_at}</span>
                      </p>
                    );
                  })}

                  {/* Dur Muhurat (multiple slots) */}
                  {astroData.goodbad.dur_muhurat_data && (
                    <div className="text-sm text-gray-300">
                      🔴 Dur Muhurat:
                      {Object.entries(parseTimeData(astroData.goodbad.dur_muhurat_data) || {}).map(
                        ([slot, data]) => (
                          <div key={slot} className="ml-4">
                            Slot {slot}:{" "}
                            <span className="text-green-300">{data.starts_at}</span> ➡️{" "}
                            <span className="text-red-300">{data.ends_at}</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
