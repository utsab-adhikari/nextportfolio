"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// --- Custom useCountdown Hook (Included directly for completeness) ---
const getRemainingTime = (endTime) => {
  const now = new Date().getTime();
  const distance = endTime.getTime() - now;

  if (distance < 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    hours,
    minutes,
    seconds,
    isExpired: false,
  };
};

const useCountdown = (targetDate) => {
  const [countdown, setCountdown] = useState(getRemainingTime(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getRemainingTime(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
};

// Helper: Format time to "HH:MM AM/PM" and add "Tomorrow" if on next day
const formatTimeDisplay = (timeStr, referenceDate = new Date()) => {
  if (!timeStr) return "";
  try {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    // Check if the date is tomorrow relative to referenceDate
    const isTomorrow =
      date.getDate() !== referenceDate.getDate() ||
      date.getMonth() !== referenceDate.getMonth() ||
      date.getFullYear() !== referenceDate.getFullYear();

    const timeFormatted = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return isTomorrow ? `Tomorrow ${timeFormatted}` : timeFormatted;
  } catch (err) {
    console.error("Error formatting time:", timeStr, err);
    return timeStr;
  }
};

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

  // Helper: Convert "{starts_at:..., ends_at:...}" → JS object
  const parseTimeData = (dataStr) => {
    if (!dataStr) return null;
    try {
      const fixed = dataStr.replace(/([a-z_]+):/gi, '"$1":').replace(/'/g, '"');
      return JSON.parse(fixed);
    } catch (err) {
      console.error("Parsing failed for:", dataStr);
      return null;
    }
  };

  // Helper: Convert snake_case to Title Case
  const formatLabel = (str) =>
    str
      .replace("_data", "")
      .replace("_kaalam", " Kaal")
      .replace("_kalam", " Kaal")
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // Tiny descriptions for each time slot
  const timeDescriptions = {
    abhijit: "Most auspicious moment of the day",
    amrit: "Time of purity & blessings",
    brahma: "Sacred hour for meditation & learning",
    rahu: "Avoid important tasks",
    yama: "Not good for auspicious beginnings",
    gulika: "Neutral but often avoided",
    varjyam: "Considered void of results",
    dur: "Very inauspicious, avoid major activities",
  };

  // Icons for each time slot
  const timeIcons = {
    abhijit: "✨",
    amrit: "🕊️",
    brahma: "🧘",
    rahu: "🌑",
    yama: "💀",
    gulika: "⚖️",
    varjyam: "🚫",
    dur: "⛔",
  };

  // Progress Bar with animation
  const ProgressBar = ({ percentage, color }) => (
    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
      <motion.div
        className={`${color} h-2 rounded-full`}
        initial={{ width: "0%" }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      ></motion.div>
    </div>
  );

  // Card component for consistent styling
  const AstroCard = ({ children, className = "", icon, title }) => (
    <motion.div
      className={`p-5 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900 border border-slate-700 shadow-lg backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl">{icon}</div>
        <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );

  // Time slot component for good/bad times
  const TimeSlotCard = ({ data, type, label, description, icon }) => {
    // Current date and time
    const now = new Date();
    // Create Date objects for the start and end times
    const [startHours, startMinutes] = data.starts_at.split(":").map(Number);
    const [endHours, endMinutes] = data.ends_at.split(":").map(Number);

    const startTime = new Date();
    startTime.setHours(startHours, startMinutes, 0, 0);

    let endTime = new Date();
    endTime.setHours(endHours, endMinutes, 0, 0);

    // If the end time is before the start time, it means it's on the next day
    if (endTime < startTime && now < startTime) {
      endTime.setDate(endTime.getDate() + 1);
    } else if (endTime < startTime && now >= startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }

    const isCurrent = now >= startTime && now < endTime;
    const isPast = now >= endTime;
    const countdown = useCountdown(endTime);

    return (
      <motion.div
        className={`p-3 rounded-lg ${
          type === "good"
            ? "bg-emerald-900/30 border border-emerald-800/50"
            : "bg-rose-900/30 border border-rose-800/50"
        } relative overflow-hidden`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {isCurrent && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            className={`absolute top-0 left-0 h-full w-full ${
              type === "good" ? "bg-emerald-800/20" : "bg-rose-800/20"
            }`}
          ></motion.div>
        )}
        <div className="relative z-10 flex items-start gap-3">
          <div className="text-xl mt-0.5">{icon}</div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-slate-100">{label}</h3>
              {isPast ? (
                <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-400">
                  Completed
                </span>
              ) : (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    type === "good"
                      ? "bg-emerald-800/50 text-emerald-200"
                      : "bg-rose-800/50 text-rose-200"
                  }`}
                >
                  {formatTimeDisplay(data.starts_at, now)} -{" "}
                  {formatTimeDisplay(data.ends_at, now)}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">{description}</p>
            {isCurrent && !countdown.isExpired && (
              <motion.div
                className="mt-2 text-sm font-mono text-white"
                initial={{ opacity: 0 }}
                animate遵1
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Remaining:{" "}
                <span className="font-bold">
                  {countdown.hours.toString().padStart(2, "0")}:
                  {countdown.minutes.toString().padStart(2, "0")}:
                  {countdown.seconds.toString().padStart(2, "0")}
                </span>
              </motion.div>
            )}
            {isPast && (
              <p className="mt-2 text-xs text-slate-500">
                This period has ended.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 flex items-center justify-center bg-slate-900 font-inter">
      <div className="w-full max-w-4xl">
        {/* Header with animated title */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-500 mb-2">
            Kathmandu Astrological Dashboard
          </h1>
          <p className="text-slate-400 max-w-md mx-auto">
            Today's planetary positions and auspicious timings for the Kathmandu
            Valley
          </p>
        </motion.div>

        {/* Loading state */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">🌙</span>
                </div>
              </div>
              <p className="mt-4 text-slate-400 animate-pulse">
                Loading astrological data...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error state */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-rose-900/30 border border-rose-800 rounded-xl p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-xl font-semibold text-rose-200 mb-2">
                Data Loading Failed
              </h3>
              <p className="text-slate-300 mb-4">
                Could not retrieve astrological information. Please check your
                connection.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-600 rounded-lg text-white transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        {astroData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Tithi Section */}
            <AstroCard
              icon="🌙"
              title="Tithi (Lunar Day)"
              className="md:col-span-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-300 font-medium text-lg">
                      {astroData.tithi.name}
                    </span>
                    <span className="text-xs bg-slate-700 px-2 py-1 rounded-full">
                      {astroData.tithi.paksha} paksha
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Completes at:{" "}
                    <span className="text-amber-200">
                      {formatTimeDisplay(astroData.tithi.completes_at.split(" ")[1])}
                    </span>
                  </p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className="text-amber-300">
                      {astroData.tithi.left_precentage}%
                    </span>
                  </div>
                  <ProgressBar
                    percentage={astroData.tithi.left_precentage}
                    color="bg-gradient-to-r from-amber-500 to-orange-500"
                  />
                  <p className="text-slate-500 text-xs mt-2">
                    Represents the current phase of the moon
                  </p>
                </div>
              </div>
            </AstroCard>

            {/* Nakshatra Section */}
            <AstroCard icon="✨" title="Nakshatra (Constellation)">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-purple-300 font-medium">
                        {astroData.nakshatra.name}
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Number: {astroData.nakshatra.number}
                      </p>
                    </div>
                    <span className="text-xs bg-purple-900/50 px-2 py-1 rounded-full">
                      {astroData.nakshatra.remaining_percentage_at_given_time.toFixed(
                        2
                      )}
                      % remaining
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">
                      Starts: {formatTimeDisplay(astroData.nakshatra.starts_at.split(" ")[1])}
                    </span>
                    <span className="text-slate-400">
                      Ends: {formatTimeDisplay(astroData.nakshatra.ends_at.split(" ")[1])}
                    </span>
                  </div>
                  <ProgressBar
                    percentage={
                      astroData.nakshatra.remaining_percentage_at_given_time
                    }
                    color="bg-gradient-to-r from-purple-500 to-indigo-500"
                  />
                </div>

                <p className="text-slate-500 text-xs">
                  Current constellation influencing planetary energies
                </p>
              </div>
            </AstroCard>

            {/* Brahma Muhurat Section */}
            <AstroCard icon="🧘" title="Brahma Muhurat">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1">
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-slate-400">Starts</span>
                        <p className="text-emerald-300 font-medium">
                          {formatTimeDisplay(astroData.brahmaMuhurat.starts_at)}
                        </p>
                      </div>
                      <div className="w-px h-8 bg-slate-700 mx-2"></div>
                      <div>
                        <span className="text-xs text-slate-400">Ends</span>
                        <p className="text-rose-300 font-medium">
                          {formatTimeDisplay(astroData.brahmaMuhurat.ends_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl">⏳</div>
                  <p className="text-xs text-slate-500 mt-1">Duration</p>
                </div>
              </div>
              <p className="text-slate-500 text-xs mt-3">
                Ideal time for meditation, yoga, and spiritual practices
              </p>
            </AstroCard>

            {/* Auspicious Times Section */}
            <AstroCard icon="✅" title="Auspicious Times">
              <div className="space-y-3">
                {["abhijit_data", "amrit_kaal_data", "brahma_muhurat_data"].map(
                  (key) => {
                    const data = parseTimeData(astroData.goodbad[key]);
                    if (!data) return null;
                    const label = formatLabel(key);
                    const descKey = label.toLowerCase().split(" ")[0];

                    return (
                      <TimeSlotCard
                        key={key}
                        data={data}
                        type="good"
                        label={label}
                        description={timeDescriptions[descKey]}
                        icon={timeIcons[descKey] || "⏱️"}
                      />
                    );
                  }
                )}
              </div>
            </AstroCard>

            {/* Inauspicious Times Section */}
            <AstroCard icon="⚠️" title="Inauspicious Times">
              <div className="space-y-3">
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
                    <TimeSlotCard
                      key={key}
                      data={data}
                      type="bad"
                      label={label}
                      description={timeDescriptions[descKey]}
                      icon={timeIcons[descKey] || "⏱️"}
                    />
                  );
                })}

                {/* Dur Muhurat Special Case */}
                {astroData.goodbad.dur_muhurat_data && (
                  <motion.div
                    className="p-3 rounded-lg bg-rose-900/30 border border-rose-800/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-xl">⛔</div>
                      <div>
                        <h3 className="font-medium text-slate-100">
                          Dur Muhurat
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Very inauspicious, avoid major activities
                        </p>
                        <div className="mt-2 space-y-2">
                          {Object.entries(
                            parseTimeData(astroData.goodbad.dur_muhurat_data) ||
                              {}
                          ).map(([slot, data]) => {
                            const [startH, startM] = data.starts_at
                              .split(":")
                              .map(Number);
                            const [endH, endM] = data.ends_at
                              .split(":")
                              .map(Number);
                            const now = new Date();

                            const startTime = new Date();
                            startTime.setHours(startH, startM, 0, 0);

                            let endTime = new Date();
                            endTime.setHours(endH, endM, 0, 0);

                            if (endTime < startTime && now < startTime) {
                              endTime.setDate(endTime.getDate() + 1);
                            } else if (
                              endTime < startTime &&
                              now >= startTime
                            ) {
                              endTime.setDate(endTime.getDate() + 1);
                            }

                            const isCurrent = now >= startTime && now < endTime;
                            const countdown = isCurrent
                              ? useCountdown(endTime)
                              : null;
                            const isPast = now >= endTime;

                            return (
                              <div
                                key={slot}
                                className="flex text-xs text-rose-200"
                              >
                                <span className="w-16">Slot {slot}:</span>
                                <span>
                                  {formatTimeDisplay(data.starts_at, now)} -{" "}
                                  {formatTimeDisplay(data.ends_at, now)}{" "}
                                  {isCurrent && !countdown.isExpired && (
                                    <span className="font-bold text-white ml-2">
                                      (
                                      {countdown.hours
                                        .toString()
                                        .padStart(2, "0")}
                                      :
                                      {countdown.minutes
                                        .toString()
                                        .padStart(2, "0")}
                                      :
                                      {countdown.seconds
                                        .toString()
                                        .padStart(2, "0")}
                                      )
                                    </span>
                                  )}
                                  {isPast && (
                                    <span className="ml-2 text-slate-400">
                                      (Completed)
                                    </span>
                                  )}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </AstroCard>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          className="mt-8 text-center text-slate-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Data for Kathmandu, Nepal | Updated daily at sunrise</p>
          <p className="mt-1">
            © {new Date().getFullYear()} Astrological Institute of Nepal
          </p>
        </motion.div>
      </div>
    </div>
  );
}

