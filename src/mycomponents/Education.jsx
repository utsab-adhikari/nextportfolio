import React from "react";
import Link from "next/link"; // Keeping as per user's original code
import { motion } from "framer-motion"; // For subtle animations
import { ArrowRight } from "lucide-react"; // Assuming lucide-react is available for the icon

// Variants for section animations
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Main application component wrapper for Canvas environment
export default function App() {
  return (
    <div className="text-white font-inter p-4 sm:p-8 flex items-center justify-center">
      <Education />
    </div>
  );
}

const Education = () => {
  return (
    <section
      id="education"
      className="py-12 sm:py-16 px-4 w-full"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between
                     bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-700" 
        >
          <div className="w-full lg:w-1/2 text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-indigo-400 mb-5 sm:mb-6 border-b-2 border-indigo-500 pb-2 inline-block">
              BEIT
            </h3>
            <ul className="text-gray-300 text-left space-y-2 text-base">
              <li>
                <span className="font-medium font-semibold text-gray-400">
                  Level:
                </span>{" "}
                Undergraduate
              </li>

              <li>
                <span className="font-medium font-semibold text-gray-400">
                  Started At:
                </span>{" "}
                2024 onwards
              </li>

              <li>
                <span className="font-medium font-semibold text-gray-400">
                  Current:
                </span>{" "}
                2nd Semester
              </li>

              <li>
                <span className="font-medium font-semibold text-gray-400">
                  Course:
                </span>{" "}
                <b>Bachelor of Engineering in Information Technology</b>
              </li>
            </ul>
          </div>
          <div className="hidden lg:block w-px h-64 bg-gray-600 rounded-full shadow-inner"></div>
          <div className="block lg:hidden w-full h-px bg-gray-600 rounded-full shadow-inner "></div>{" "}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
            <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-5 w-full">
              <img
                src="https://ncit.edu.np/images/logo.png"
                alt="NCIT Logo"
                className="h-20 sm:h-24 w-auto bg-white/70 rounded-lg p-2 sm:p-3 object-contain shadow-md mx-auto block" 
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/128x128/334155/E2E8F0?text=NCIT+Logo";
                  e.currentTarget.onerror = null; 
                }}
              />
              <Link
                href="https://ncit.edu.np"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-base sm:text-lg
                           underline-offset-4 hover:underline transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 rounded text-left" /* Added text-left for the link */
              >
                Visit Official Site{" "}
                <ArrowRight className="ml-2 w-4 h-4 transform rotate-[-45deg]" />
              </Link>
              <h2 className="text-xl sm:text-2xl font-semibold text-left text-gray-200 mt-2">
                Innovations on the Front Lines
              </h2>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
