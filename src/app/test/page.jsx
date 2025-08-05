"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
// Remaining Astro Info Rendering (Dur Muhurat, TimeSlots, etc.)

import React from "react";
import dayjs from "dayjs";

const formatTime = (timeString) => {
  const time = new Date(`1970-01-01T${timeString}`);
  return time.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
};

const AstroInfo = ({ astroData }) => {
  return (
    <div className="space-y-6">
      {/* Choghadiya Times */}
      <div className="glass-card">
        <h2 className="text-xl font-semibold mb-2">Choghadiya</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {astroData?.choghadiya?.map((slot, i) => (
            <div
              key={i}
              className="border rounded-xl p-3 shadow-md bg-white/5 backdrop-blur-md"
            >
              <p className="font-semibold text-base">{slot.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatTime(slot.start)} - {formatTime(slot.end)}
              </p>
              <p className="text-sm capitalize">{slot.mood}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dur Muhurat */}
      {astroData?.dur_muhurat && (
        <div className="glass-card">
          <h2 className="text-xl font-semibold mb-2">Dur Muhurat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {astroData?.dur_muhurat.map((item, i) => (
              <div
                key={i}
                className="border rounded-xl p-3 shadow-md bg-white/5 backdrop-blur-md"
              >
                <p className="font-semibold text-base">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatTime(item.start)} - {formatTime(item.end)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rahu Kaal, GuliKaal, Yamagand */}
      <div className="glass-card grid grid-cols-1 sm:grid-cols-3 gap-4">
        {astroData?.rahukaal && (
          <div className="rounded-xl p-3 shadow-md bg-white/5 backdrop-blur-md">
            <p className="font-semibold text-base">Rahu Kaal</p>
            <p className="text-sm text-muted-foreground">
              {formatTime(astroData.rahukaal.start)} - {formatTime(astroData.rahukaal.end)}
            </p>
          </div>
        )}
        {astroData?.guliKaal && (
          <div className="rounded-xl p-3 shadow-md bg-white/5 backdrop-blur-md">
            <p className="font-semibold text-base">Guli Kaal</p>
            <p className="text-sm text-muted-foreground">
              {formatTime(astroData.guliKaal.start)} - {formatTime(astroData.guliKaal.end)}
            </p>
          </div>
        )}
        {astroData?.yamagand && (
          <div className="rounded-xl p-3 shadow-md bg-white/5 backdrop-blur-md">
            <p className="font-semibold text-base">Yamagand</p>
            <p className="text-sm text-muted-foreground">
              {formatTime(astroData.yamagand.start)} - {formatTime(astroData.yamagand.end)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


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

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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

const formatTimeDisplay = (timeStr, referenceDate = new Date()) => {
  if (!timeStr) return "";
  try {
    const [hours, minutes] = timeStr.split(":" ).map(Number);
    const date = new Date(referenceDate);
    date.setHours(hours, minutes, 0, 0);

    const now = new Date();
    const isTomorrow = date.getDate() !== now.getDate() || date.getMonth() !== now.getMonth() || date.getFullYear() !== now.getFullYear();

    const timeFormatted = date.toLocaleTimeString("en-US", {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="max-w-4xl w-full p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-500">
            Kathmandu Astrological Dashboard
          </h1>
          <p className="text-slate-400 mt-2">Today's planetary positions and auspicious timings</p>
        </motion.div>

        {loading && (
          <div className="text-center py-10 animate-pulse">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading astrological data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-xl p-6 text-center">
            <p className="text-xl text-red-300">⚠️ Error fetching data</p>
            <p className="text-slate-300 mt-2">Please try again later.</p>
          </div>
        )}

        <AstroInfo astroData={astroData} />

        
        <div className="mt-10 text-center text-sm text-slate-500">
          <p>Data for Kathmandu, Nepal | Updated daily at sunrise</p>
          <p className="mt-1">© {new Date().getFullYear()} Astrological Institute of Nepal</p>
        </div>
      </div>
    </div>
  );
}
