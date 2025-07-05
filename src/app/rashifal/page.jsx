"use client";
import { useEffect, useState } from "react";
import WarnCard from "./WarnCard";

export default function HomePage() {
  const [rashifals, setRashifals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Function to fetch rashifal data
    const fetchRashifal = async () => {
      try {
        const res = await fetch("/api/v1/rashifal");
        if (!res.ok) {
          // If the response is not OK (e.g., 404, 500), throw an error
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setRashifals(data.rashifals);
      } catch (err) {
        console.error("Error loading rashifal:", err);
        setError(true); // Set error state to true if fetching fails
      } finally {
        setLoading(false); // Always set loading to false after attempt
      }
    };

    fetchRashifal(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Main container with a deep, spiritual gradient background and overflow hidden
    // Changed main background to black/indigo tones
    <main className="relative min-h-screen p-6 font-serif overflow-hidden
                     bg-gradient-to-br from-black via-indigo-950 to-gray-900
                     text-gray-100"> {/* Default text color for the whole page */}

      {/* Spiritual Background Elements: Subtle, animated glowing orbs */}
      {/* These elements create a dynamic, ethereal backdrop without distracting from content */}
      <div className="absolute inset-0 z-0 opacity-30 animate-pulse-slower">
        {/* Adjusted orb colors to fit the darker theme, still using purples and indigos */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-700 rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-indigo-700 rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-700 rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>
      </div>

      {/* Header section: Prominent title and spiritual message */}
      <header className="relative z-10 text-center mb-12 pt-8 animate-fade-in-down-smoother">
        <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 drop-shadow-2xl">
          {/* Star icons for spiritual emphasis, with subtle rotation */}
          <span className="inline-block mr-4 transform rotate-12 text-yellow-200 text-5xl md:text-6xl">⭐</span>
          नेपाली राशिफल
          <span className="inline-block ml-4 transform -rotate-12 text-yellow-200 text-5xl md:text-6xl">⭐</span>
        </h1>
        {/* Adjusted subtitle text color for better contrast on dark background */}
        <p className="mt-4 text-2xl md:text-3xl text-yellow-100 drop-shadow-lg animate-fade-in-smoother delay-700">
          आजको आफ्नो आध्यात्मिक यात्रा पत्ता लगाउनुहोस् (Discover your spiritual journey today)
        </p>
      </header>

      {/* Conditional rendering for loading, error, or content display */}
      {loading ? (
        // Loading state: Spinning cosmic-themed loader with spiritual message
        <div className="relative z-10 flex flex-col justify-center items-center h-64 text-yellow-200">
          <div className="animate-spin-slow rounded-full h-24 w-24 border-t-4 border-b-4 border-yellow-400 border-opacity-75"></div>
          <p className="mt-6 text-2xl animate-pulse">ब्रह्माण्डका रहस्यहरू खुल्दैछन्... (Unveiling cosmic mysteries...)</p>
        </div>
      ) : error ? (
        // Error state: Clear message in Nepali and English
        <div className="relative z-10 text-center text-red-400 text-2xl mt-16">
          <p>ओहो! राशिफल प्राप्त गर्न समस्या भयो। कृपया पछि फेरि प्रयास गर्नुहोस्।</p>
          <p className="text-lg mt-2">(Oops! Had trouble getting the rashifal. Please try again later.)</p>
        </div>
      ) : (
        // Main content: Grid of rashifal cards
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto pb-12">
          {rashifals.map(({ sign, rashifal }) => (
            // Individual rashifal card with spiritual styling and hover effects
            // Adjusted card background, border, and text colors for the new theme
            <div
              key={sign}
              className="bg-indigo-900/40 backdrop-blur-sm rounded-3xl p-7 shadow-2xl border border-indigo-700/50
                         hover:border-yellow-400 transition-all duration-700 ease-out-expo
                         transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden
                         group flex flex-col justify-between"
            >
              {/* Subtle radial glow effect on card hover, creating an "illumination" */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                              {/* Custom radial gradient for card hover effect, keeping yellow for highlight */}
                              <div className="absolute inset-0 rounded-3xl bg-radial-gradient from-yellow-500/20 via-transparent to-transparent"></div>
              </div>

              {/* Card content, positioned relatively to appear above the hover glow */}
              <div className="relative z-10">
                {/* Sign text remains yellow for emphasis */}
                <h2 className="text-3xl font-bold mb-4 text-yellow-300 drop-shadow-md">
                  {sign}
                </h2>
                {/* Rashifal text adjusted to lighter gray for readability */}
                <p className="text-lg leading-relaxed text-gray-200 opacity-90">
                  {rashifal}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <WarnCard/>

    </main>
  );
}
