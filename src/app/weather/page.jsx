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
    // Main container with a professional gradient background and padding
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-950 dark:to-indigo-900 p-4 md:p-8 text-gray-800 dark:text-gray-100 font-sans flex flex-col items-center">

      {/* Page Title */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-center text-indigo-700 dark:text-blue-400 mb-8 md:mb-12 drop-shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="inline-block mr-3 transform rotate-6">🌦️</span>
        Weather
      </motion.h1>

      {/* Main Content Area - Grid for Kathmandu and Search */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

        {/* Kathmandu's Current Weather Section - Prominent Display (2/3 width on large screens) */}
        <section className="lg:col-span-2 bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-indigo-800 dark:to-gray-900 shadow-2xl rounded-3xl p-6 md:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background pattern for visual interest */}
          <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 1 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM26 2a2 2 1 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 1 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM46 2a2 2 1 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 1 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

          <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 dark:text-blue-200 mb-4 text-center relative z-10">
            <span className="inline-block mr-2">📍</span> Kathmandu, Nepal
          </h2>
          <AnimatePresence mode="wait">
            {kathmanduWeather && kathmanduLocation ? (
              <motion.div
                key="kathmandu-weather-display"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-center text-gray-900 dark:text-gray-100 relative z-10"
              >
                <p className="text-8xl md:text-9xl font-extrabold text-indigo-700 dark:text-blue-300 drop-shadow-lg mb-4">
                  {kathmanduWeather.temperature}°C
                </p>
                <p className="text-5xl md:text-6xl mb-6 font-semibold text-indigo-600 dark:text-blue-400">
                  {getWeatherDisplay(kathmanduWeather.temperature).icon} {getWeatherDisplay(kathmanduWeather.temperature).condition}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xl md:text-2xl font-medium mb-6">
                  <p>💨 {kathmanduWeather.windspeed} km/h</p>
                  <p>🧭 {kathmanduWeather.winddirection}°</p>
                  <p>🕒 {kathmanduLocalTime}</p>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Last Updated: {new Date(kathmanduWeather.time).toLocaleTimeString()}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="kathmandu-loading-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center text-gray-700 dark:text-gray-400 text-xl md:text-2xl p-10 relative z-10"
              >
                {loading ? (
                  <span className="flex flex-col items-center">
                    <span className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mb-4"></span>
                    Loading Kathmandu weather...
                  </span>
                ) : (
                  "Could not load Kathmandu weather data. Please check your connection."
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Global Weather Search Section (1/3 width on large screens) */}
        <section className="lg:col-span-1 bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6 md:p-8 space-y-6 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-blue-300 text-center mb-4">
            Search Other Cities
          </h2>

          {/* City Selector */}
          <div>
            <label htmlFor="city-select" className="block text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
              Select a City
            </label>
            <div className="flex flex-col gap-4">
              <select
                id="city-select"
                value={selectedCityForSearch}
                onChange={(e) => setSelectedCityForSearch(e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none pr-10"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%236B7280' d='M9.293 12.95l.707.707L15 9.707l-1.414-1.414L10 11.586l-3.586-3.586L5 9.707l4.293 3.243z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <button
                onClick={() => fetchWeatherData(selectedCityForSearch, false)}
                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                disabled={loading}
              >
                {loading && selectedCityForSearch === (searchLocation?.name || "Loading...") ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                    Fetching...
                  </span>
                ) : (
                  "Get Weather"
                )}
              </button>
            </div>
          </div>

          {/* Weather Display for Search Results */}
          <AnimatePresence mode="wait">
            {searchWeather && searchLocation ? (
              <motion.div
                key={searchLocation.name}
                className="text-center text-gray-800 dark:text-gray-200 mt-6 bg-blue-50 dark:bg-indigo-700 rounded-xl p-6 shadow-inner border border-blue-100 dark:border-indigo-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h3 className="text-3xl font-bold mb-4 text-indigo-700 dark:text-blue-300 flex items-center justify-center gap-3">
                  {getWeatherDisplay(searchWeather.temperature).icon} {searchLocation.name}
                </h3>
                <p className="text-xl mb-2">
                  <span className="font-semibold">Temperature:</span> {searchWeather.temperature}°C
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Windspeed:</span> {searchWeather.windspeed} km/h
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Wind Direction:</span> {searchWeather.winddirection}°
                </p>
                <p className="text-base text-gray-600 dark:text-gray-300 mt-4">
                  As of: {new Date(searchWeather.time).toLocaleString()}
                </p>
              </motion.div>
            ) : (
              !loading && hasFetchedSearchInitial && (
                <motion.p
                  key="no-search-weather-data"
                  className="text-center text-gray-500 dark:text-gray-400 text-lg p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  No weather data available for this city. Please try another.
                </motion.p>
              )
            )}
            {!loading && !hasFetchedSearchInitial && (
              <motion.p
                key="initial-search-prompt"
                className="text-center text-gray-500 dark:text-gray-400 text-lg p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Select a city from the dropdown to get its weather forecast.
              </motion.p>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
