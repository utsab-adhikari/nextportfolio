"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import WarnCard from "./WarnCard";
import Link from "next/link";
import { Menu, X } from "lucide-react";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HomePage() {
  const [rashifals, setRashifals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>नेपाली राशिफल | Utsab Adhikari</title>
        <meta name="description" content="Explore your daily Nepali horoscope (Rashifal) with insights on love, career, health, and more, powered by real-time API data." />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&family=Inter:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .font-noto-devanagari { font-family: 'Noto Sans Devanagari', sans-serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
          .gradient-text { background: linear-gradient(90deg, #4f46e5, #7c3aed); -webkit-background-clip: text; background-clip: text; color: transparent; }
        `}</style>
      </Head>

      <div className="min-h-screen bg-slate-950 text-gray-100 font-inter">

        <main className="relative pt-24 pb-12 px-6 text-gray-100 font-sans">
          <motion.header
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text font-noto-devanagari">
              नेपाली राशिफल
            </h1>
            <p className="mt-3 text-lg text-gray-300 font-noto-devanagari">
              आजको आफ्नो आध्यात्मिक यात्रा पत्ता लगाउनुहोस्
              <br className="hidden sm:block" />
              <span className="text-sm text-gray-400 font-inter">
                (Discover your spiritual journey today)
              </span>
            </p>
          </motion.header>

          {loading ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-400 mx-auto mb-4" />
              <p className="text-lg font-noto-devanagari text-indigo-400">
                राशिफल लोड हुँदैछ... Please wait
              </p>
            </motion.div>
          ) : error ? (
            <motion.div
              className="text-center py-20 text-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl font-noto-devanagari">
                राशिफल प्राप्त गर्न समस्या भयो।
              </p>
              <p className="text-sm text-gray-400 mt-2 font-inter">
                (Error fetching rashifal. Please try again later.)
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {rashifals.map(({ sign, rashifal }) => (
                <motion.div
                  key={sign}
                  className="group bg-slate-900/50 backdrop-blur-lg border border-indigo-700 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
                  variants={cardVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <h2 className="text-2xl font-semibold gradient-text mb-3 font-noto-devanagari group-hover:text-indigo-300 transition-colors duration-300">
                    {sign}
                  </h2>
                  <p className="text-sm text-gray-200 leading-relaxed font-noto-devanagari group-hover:text-gray-100 transition-colors duration-300">
                    {rashifal}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            className="max-w-5xl mx-auto mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <WarnCard />
          </motion.div>
        </main>
      </div>
    </>
  );
}