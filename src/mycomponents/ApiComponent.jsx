import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Head from "next/head";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function ApiComponent() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
              .font-noto-devanagari {
                font-family: 'Noto Sans Devanagari', sans-serif;
              }
              .font-inter {
                font-family: 'Inter', sans-serif;
              }
            `}</style>
      </Head>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        <motion.section
          className="relative overflow-hidden rounded-xl shadow-lg p-6 flex flex-col justify-between bg-slate-900/50 backdrop-blur-lg border border-indigo-700"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="relative z-10 flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold gradient-text mb-3">
              📰 Latest News
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl">
              Stay updated with the latest tech trends, development tips, and
              community insights.
            </p>
            <Link
              href="/news"
              className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              View All News <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </motion.section>
        <motion.section
          id="rashifal"
          className="relative overflow-hidden rounded-xl shadow-lg p-6 flex flex-col justify-between bg-slate-900/50 backdrop-blur-lg border border-yellow-700"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="relative z-10 flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-yellow-300 mb-3 font-noto-devanagari">
              आजको राशिफल
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl font-noto-devanagari">
              तपाईंको दैनिक राशिफल — प्रेम, करियर, स्वास्थ्य र सफलताका लागि
              भविष्यवाणी।
            </p>
            <Link
              href="/rashifal"
              className="inline-flex items-center justify-center bg-gradient-to-br font-noto-devanagari from-yellow-500 to-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              हेर्नुहोस् <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </motion.section>
        <motion.section
          className="relative overflow-hidden rounded-xl shadow-lg p-6 flex flex-col justify-between bg-slate-900/50 backdrop-blur-lg border border-blue-700"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="relative z-10 flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-300 mb-3">
              ☀️ Live Weather
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-md">
              Real-time weather updates for major cities, powered by Open-Meteo
              APIs.
            </p>
            <Link
              href="/weather"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              View Weather <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </motion.section>
      </div>
    </>
  );
}
