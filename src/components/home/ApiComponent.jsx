import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Head from "next/head";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
    transition: { duration: 0.3 },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

const buttonVariants = {
  hover: { scale: 1.05, x: 5 },
  tap: { scale: 0.95 },
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
          .gradient-text {
            background: linear-gradient(to right, #6366f1, #a855f7);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
        `}</style>
      </Head>

      <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center font-inter">
        <motion.div
          className="max-w-7xl mx-auto w-full"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center gradient-text mb-12"
            variants={textVariants}
          >
            Explore APIs
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "📰 Latest News",
                description: "Stay updated with the latest tech trends, development tips, and community insights.",
                href: "/news",
                borderColor: "border-indigo-700/50",
                bgColor: "bg-indigo-600",
                hoverBgColor: "hover:bg-indigo-500",
                ringColor: "ring-indigo-500",
              },
              {
                title: "आजको राशिफल",
                description: "तपाईंको दैनिक राशिफल — प्रेम, करियर, स्वास्थ्य र सफलताका लागि भविष्यवाणी।",
                href: "/rashifal",
                borderColor: "border-yellow-700/50",
                bgColor: "bg-gradient-to-br from-yellow-500 to-amber-600",
                hoverBgColor: "hover:from-yellow-600 hover:to-amber-700",
                ringColor: "ring-yellow-500",
                fontClass: "font-noto-devanagari",
              },
              {
                title: "☀️ Live Weather",
                description: "Real-time weather updates for major cities, powered by Open-Meteo APIs.",
                href: "/weather",
                borderColor: "border-blue-700/50",
                bgColor: "bg-blue-600",
                hoverBgColor: "hover:bg-blue-500",
                ringColor: "ring-blue-500",
              },
            ].map((item, index) => (
              <motion.section
                key={index}
                className={`relative overflow-hidden rounded-xl shadow-lg p-6 sm:p-8 flex flex-col justify-between bg-gray-800/30 backdrop-blur-md border ${item.borderColor}`}
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="relative z-10 flex flex-col gap-6">
                  <motion.h2
                    className={`text-2xl sm:text-3xl font-extrabold mb-3 ${item.fontClass || ""} ${
                      index === 1 ? "text-yellow-300" : index === 2 ? "text-blue-300" : "gradient-text"
                    }`}
                    variants={textVariants}
                  >
                    {item.title}
                  </motion.h2>
                  <motion.p
                    className={`text-gray-200 text-base sm:text-lg max-w-xl ${item.fontClass || ""}`}
                    variants={textVariants}
                  >
                    {item.description}
                  </motion.p>
                  <motion.div variants={textVariants}>
                    <Link
                      href={item.href}
                      className={`inline-flex items-center justify-center ${item.bgColor} ${item.hoverBgColor} text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-${item.ringColor} ${item.fontClass || ""}`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {item.title.includes("राशिफल") ? "हेर्नुहोस्" : "View"} <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.section>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}