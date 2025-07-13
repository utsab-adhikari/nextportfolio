"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function WeatherPage() {
  // State for the selected city in the dropdown (for global search)
  const [selectedCityForSearch, setSelectedCityForSearch] = useState("Kathmandu");
  // State for weather data of the selected city in the dropdown
  const [searchWeather, setSearchWeather] = useState(null);
  // State for location data of the selected city in the dropdown
  const [searchLocation, setSearchLocation] = useState(null);

  // State for Kathmandu's current weather data
  const [kathmanduWeather, setKathmanduWeather] = useState(null);
  // State for Kathmandu's location data
  const [kathmanduLocation, setKathmanduLocation] = useState(null);
  // State for Kathmandu's local time string
  const [kathmanduLocalTime, setKathmanduLocalTime] = useState("");

  // Loading state for any weather fetch operation
  const [loading, setLoading] = useState(false);
  // State to track if an initial fetch for the search section has occurred
  const [hasFetchedSearchInitial, setHasFetchedSearchInitial] = useState(false);

  // List of pre-defined cities for the dropdown
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

  // Helper function to get a simple weather icon and condition based on temperature
  // Note: For real-world apps, you'd map Open-Meteo's 'weathercode' to more precise conditions.
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

  // Function to fetch weather data for a given city
  const fetchWeatherData = async (cityToFetch, isKathmandu = false) => {
    setLoading(true);
    const toastId = toast.loading(`Fetching weather for ${cityToFetch}...`);

    try {
      const res = await fetch(`/api/v1/weather?city=${encodeURIComponent(cityToFetch)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch weather data.");
      }

      if (isKathmandu) {
        setKathmanduLocation(data.location);
        setKathmanduWeather(data.weather);
        // For Kathmandu, also set a continuously updating local time
        const updateLocalTime = () => {
          const date = new Date();
          // Assuming Kathmandu is UTC+5:45, adjust as needed or fetch timezone from API
          const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kathmandu' // Specify Kathmandu's timezone
          };
          setKathmanduLocalTime(date.toLocaleString('en-US', options));
        };
        updateLocalTime(); // Set initially
        const intervalId = setInterval(updateLocalTime, 1000); // Update every second
        return () => clearInterval(intervalId); // Cleanup on unmount
      } else {
        setSearchLocation(data.location);
        setSearchWeather(data.weather);
        setHasFetchedSearchInitial(true);
      }
      toast.success(`Weather loaded for ${data.location.name}!`, { id: toastId });
    } catch (err) {
      if (isKathmandu) {
        setKathmanduLocation(null);
        setKathmanduWeather(null);
        setKathmanduLocalTime("");
      } else {
        setSearchLocation(null);
        setSearchWeather(null);
      }
      toast.error(err.message || "Something went wrong!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch Kathmandu weather on initial load
  useEffect(() => {
    fetchWeatherData("Kathmandu", true);
  }, []);

  // Effect to fetch weather for the selected city in the search dropdown
  useEffect(() => {
    if (selectedCityForSearch && hasFetchedSearchInitial) {
      fetchWeatherData(selectedCityForSearch, false);
    }
  }, [selectedCityForSearch, hasFetchedSearchInitial]);


  return (
    <main className="min-h-screen bg-gray-900 text-gray-200 font-sans p-6 md:p-10 flex flex-col items-center">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-blue-300 mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌦️ Weather Dashboard
      </motion.h1>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* | Section 1 | Kathmandu Overview */}
        <section className="bg-gray-800 rounded-xl p-8 shadow-lg relative overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-300 mb-6">
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
                className="space-y-4"
              >
                <div className="flex items-baseline justify-center space-x-4">
                  <span className="text-6xl font-bold text-blue-400">
                    {kathmanduWeather.temperature}°C
                  </span>
                  <span className="text-4xl">
                    {getWeatherDisplay(kathmanduWeather.temperature).icon}
                  </span>
                </div>
                <p className="text-xl text-center">
                  {getWeatherDisplay(kathmanduWeather.temperature).condition}
                </p>
                <div className="flex justify-between text-gray-300">
                  <span>💨 {kathmanduWeather.windspeed} km/h</span>
                  <span>🧭 {kathmanduWeather.winddirection}°</span>
                  <span>🕒 {kathmanduLocalTime}</span>
                </div>
                <p className="text-sm text-gray-400 text-center">
                  Updated: {new Date(kathmanduWeather.time).toLocaleTimeString()}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="ktm-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center text-gray-500 py-10"
              >
                {loading ? (
                  <span className="inline-flex items-center space-x-2">
                    <span className="spinner h-6 w-6 border-4 border-t-blue-300 rounded-full animate-spin" />
                    <span>Fetching Kathmandu weather...</span>
                  </span>
                ) : (
                  "Unable to load Kathmandu’s weather."
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* | Section 2 | Global City Search */}
        <section className="bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-300 mb-6">
            Search By City
          </h2>
          <div className="space-y-4">
            <select
              value={selectedCityForSearch}
              onChange={(e) => setSelectedCityForSearch(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              onClick={() => fetchWeatherData(selectedCityForSearch)}
              disabled={loading}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-lg font-medium transition"
            >
              {loading ? "Loading..." : "Get Weather"}
            </button>

            <AnimatePresence mode="wait">
              {searchWeather && searchLocation ? (
                <motion.div
                  key={searchLocation.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 bg-gray-700 rounded-lg p-6 space-y-4 text-center"
                >
                  <div className="flex justify-center items-center space-x-2 text-3xl">
                    <span>
                      {getWeatherDisplay(searchWeather.temperature).icon}
                    </span>
                    <span className="font-semibold text-blue-300">{searchLocation.name}</span>
                  </div>
                  <p className="text-4xl font-bold">{searchWeather.temperature}°C</p>
                  <p className="text-lg">
                    <span className="font-medium">Wind:</span> {searchWeather.windspeed} km/h, {searchWeather.winddirection}°
                  </p>
                  <p className="text-sm text-gray-400">
                    As of {new Date(searchWeather.time).toLocaleString()}
                  </p>
                </motion.div>
              ) : (
                hasFetchedSearchInitial && !loading && (
                  <motion.p
                    key="search-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-center text-gray-500"
                  >
                    No data available. Try a different city.
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
