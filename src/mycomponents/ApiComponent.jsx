import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
export default function App() {
  return (
    <div className="text-white font-inter p-4 sm:p-8 flex items-center justify-center">
      <ApiComponent />
    </div>
  );
}

const ApiComponent = () => {
  return (
    <>
      <div className="w-full font-noto-devanagari max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <section className="relative overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-5 sm:p-7 flex flex-col justify-between">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl"></div>
          <div className="relative z-10 flex flex-col gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-400 mb-3 leading-tight">
                📰 Latest News & Updates
              </h2>
              <p className="text-gray-300 text-base sm:text-lg max-w-xl">
                Discover the newest trends in tech, development best practices,
                and community highlights. Stay informed with what’s happening in
                the dev world.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                ...sectionVariants,
                transition: {
                  delay: 0.2,
                  ...sectionVariants.visible.transition,
                },
              }}
              className="shrink-0 mt-4"
            >
              <Link
                href="/news"
                className="inline-flex items-center justify-center bg-indigo-600 bg-opacity-90 text-white px-7 py-3 rounded-full font-medium hover:bg-indigo-500 shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
              >
                View All News <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
        <section
          id="rashifal"
          className="relative overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-yellow-700 to-amber-800 p-5 sm:p-7 flex flex-col justify-between"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl"></div>
          <div className="relative z-10 flex flex-col gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-300 mb-3 leading-tight">
                आजको राशिफल
              </h2>
              <p className="text-gray-200 text-base sm:text-lg max-w-xl">
                तपाईंको दैनिक राशिफल पढ्नुहोस् — प्रेम, करियर, स्वास्थ्य र सफलता
                सम्बन्धी भविष्यवाणीहरू। १२ राशिका लागि नयाँ अपडेटहरू!
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                ...sectionVariants,
                transition: {
                  delay: 0.2,
                  ...sectionVariants.visible.transition,
                },
              }}
              className="shrink-0 mt-4"
            >
              <Link
                href="/rashifal"
                className="inline-flex items-center justify-center bg-gradient-to-br from-yellow-500 to-amber-600 text-white px-7 py-3 rounded-full font-semibold hover:from-yellow-600 hover:to-amber-700 shadow-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75"
              >
                हेर्नुहोस् सबै राशिफल <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
        <section className="relative overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-blue-700 to-cyan-800 p-5 sm:p-7 flex flex-col justify-between">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl"></div>
          <div className="relative z-10 flex flex-col gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
              className="flex-1"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-300 mb-3 leading-tight">
                ☀️ Live Weather Updates
              </h2>
              <p className="text-gray-200 text-base sm:text-lg max-w-md">
                Check real-time weather information for major cities including
                Kathmandu and more—powered by Open-Meteo APIs.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                ...sectionVariants,
                transition: {
                  delay: 0.2,
                  ...sectionVariants.visible.transition,
                },
              }}
              className="shrink-0 mt-4"
            >
              <Link
                href="/weather"
                className="inline-flex items-center justify-center px-7 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              >
                View Weather <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};
