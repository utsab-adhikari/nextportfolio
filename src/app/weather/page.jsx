"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WeatherPage() {
  const [selectedCityForSearch, setSelectedCityForSearch] = useState("Kathmandu");
  const [searchWeather, setSearchWeather] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const [kathmanduWeather, setKathmanduWeather] = useState(null);
  const [kathmanduLocation, setKathmanduLocation] = useState(null);
  const [kathmanduLocalTime, setKathmanduLocalTime] = useState("");
  const [kathmanduError, setKathmanduError] = useState(null);

  const [loadingKathmandu, setLoadingKathmandu] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [hasFetchedSearchInitial, setHasFetchedSearchInitial] = useState(false);

  const cities = [
    "Kathmandu",
    "Pokhara",
    "Lalitpur",
    "Biratnagar",
    "Butwal",
    "Chitwan",
    "New York",
    "Tokyo",
    "London",
    "Delhi",
    "Sydney",
    "Paris",
    "Berlin",
    "Dubai",
    "Cairo",
  ];

  const getWeatherDisplay = (temp) => {
    let icon = "❓";
    let condition = "Unknown";

    if (temp >= 30) {
      icon = "☀️";
      condition = "Hot & Sunny";
    } else if (temp >= 25) {
      icon = "🌞";
      condition = "Warm & Clear";
    } else if (temp >= 18) {
      icon = "🌤️";
      condition = "Mild & Partly Cloudy";
    } else if (temp >= 10) {
      icon = "☁️";
      condition = "Cool & Cloudy";
    } else if (temp >= 0) {
      icon = "🥶";
      condition = "Chilly";
    } else {
      icon = "❄️";
      condition = "Freezing";
    }
    return { icon, condition };
  };

  const fetchWeatherData = async (cityToFetch, isKathmandu = false) => {
    const setLoading = isKathmandu ? setLoadingKathmandu : setLoadingSearch;
    const setError = isKathmandu ? setKathmanduError : setSearchError;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/v1/weather?city=${encodeURIComponent(cityToFetch)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch weather data.");
      }

      if (isKathmandu) {
        setKathmanduLocation(data.location);
        setKathmanduWeather(data.weather);
        const updateLocalTime = () => {
          const date = new Date();
          const options = {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            timeZone: "Asia/Kathmandu",
          };
          setKathmanduLocalTime(date.toLocaleString("en-US", options));
        };
        updateLocalTime();
        const intervalId = setInterval(updateLocalTime, 1000);
        return () => clearInterval(intervalId);
      } else {
        setSearchLocation(data.location);
        setSearchWeather(data.weather);
        setHasFetchedSearchInitial(true);
      }
    } catch (err) {
      if (isKathmandu) {
        setKathmanduLocation(null);
        setKathmanduWeather(null);
        setKathmanduLocalTime("");
      } else {
        setSearchLocation(null);
        setSearchWeather(null);
      }
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("Kathmandu", true);
  }, []);

  useEffect(() => {
    if (selectedCityForSearch && hasFetchedSearchInitial) {
      fetchWeatherData(selectedCityForSearch, false);
    }
  }, [selectedCityForSearch, hasFetchedSearchInitial]);

  return (
    <main className="min-h-screen text-gray-200 font-sans p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-300 mb-8 md:mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌦️ Weather Dashboard
      </motion.h1>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        {/* Kathmandu Section */}
        <section className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-gray-700/50">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-300 mb-4 md:mb-6">
            📍 Kathmandu, Nepal
          </h2>

          <AnimatePresence mode="wait">
            {kathmanduWeather ? (
              <motion.div
                key="ktm-weather"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 md:space-y-6"
              >
                <div className="flex items-baseline justify-center space-x-3 md:space-x-4">
                  <span className="text-5xl md:text-6xl font-bold text-blue-400">
                    {kathmanduWeather.temperature}°C
                  </span>
                  <span className="text-3xl md:text-4xl">
                    {getWeatherDisplay(kathmanduWeather.temperature).icon}
                  </span>
                </div>
                <p className="text-lg md:text-xl text-center font-medium">
                  {getWeatherDisplay(kathmanduWeather.temperature).condition}
                </p>
                <div className="flex flex-wrap justify-between text-gray-300 text-sm md:text-base gap-2">
                  <span>💨 {kathmanduWeather.windspeed} km/h</span>
                  <span>🧭 {kathmanduWeather.winddirection}°</span>
                  <span>🕒 {kathmanduLocalTime}</span>
                </div>
                <p className="text-xs md:text-sm text-gray-400 text-center">
                  Updated: {new Date(kathmanduWeather.time).toLocaleTimeString()}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="ktm-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center text-gray-500 py-6 md:py-10"
              >
                {loadingKathmandu ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="h-8 w-8 border-4 border-t-blue-400 border-gray-600 rounded-full animate-spin" />
                    <span className="text-sm md:text-base">Fetching Kathmandu weather...</span>
                  </div>
                ) : (
                  <span className="text-sm md:text-base">{kathmanduError || "Unable to load Kathmandu’s weather."}</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Global City Search Section */}
        <section className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-gray-700/50">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-300 mb-4 md:mb-6">
            Search By City
          </h2>
          <div className="space-y-4">
            <select
              value={selectedCityForSearch}
              onChange={(e) => setSelectedCityForSearch(e.target.value)}
              className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition text-gray-200 text-sm md:text-base"
              aria-label="Select a city"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              onClick={() => fetchWeatherData(selectedCityForSearch)}
              disabled={loadingSearch}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-lg font-medium transition disabled:bg-blue-500/50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              {loadingSearch ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="h-5 w-5 border-2 border-t-white border-gray-300 rounded-full animate-spin" />
                  <span>Loading...</span>
                </span>
              ) : (
                "Get Weather"
              )}
            </button>

            <AnimatePresence mode="wait">
              {searchWeather && searchLocation ? (
                <motion.div
                  key={searchLocation.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 bg-gray-700/50 rounded-lg p-4 md:p-6 space-y-4 text-center"
                >
                  <div className="flex justify-center items-center space-x-2 text-lg md:text-2xl">
                    <span>
                      {getWeatherDisplay(searchWeather.temperature).icon}
                    </span>
                    <span className="font-semibold text-blue-300">{searchLocation.name}</span>
                  </div>
                  <p className="text-3xl md:text-4xl font-bold">{searchWeather.temperature}°C</p>
                  <p className="text-sm md:text-lg">
                    <span className="font-medium">Wind:</span> {searchWeather.windspeed} km/h, {searchWeather.winddirection}°
                  </p>
                  <p className="text-xs md:text-sm text-gray-400">
                    As of {new Date(searchWeather.time).toLocaleString()}
                  </p>
                </motion.div>
              ) : (
                hasFetchedSearchInitial && !loadingSearch && (
                  <motion.p
                    key="search-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 text-center text-gray-500 text-sm md:text-base"
                  >
                    {searchError || "No data available. Try a different city."}
                  </motion.p>
                )
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}