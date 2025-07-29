import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Education() {
  return (
    <section id="education" className="py-12 px-6 w-full">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between bg-slate-900/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 lg:p-10 border border-indigo-700"
        >
          <div className="w-full lg:w-1/2 text-left">
            <h3 className="text-2xl sm:text-3xl font-bold gradient-text mb-5 border-b-2 border-indigo-500 pb-2 inline-block">
              BEIT
            </h3>
            <ul className="text-gray-300 space-y-3 text-base">
              <li><span className="font-semibold text-gray-400">Level:</span> Undergraduate</li>
              <li><span className="font-semibold text-gray-400">Started:</span> 2024</li>
              <li><span className="font-semibold text-gray-400">Current:</span> 2nd Semester</li>
              <li><span className="font-semibold text-gray-400">Course:</span> Bachelor of Engineering in Information Technology</li>
            </ul>
          </div>
          <div className="hidden lg:block w-px h-64 bg-gray-600 rounded-full"></div>
          <div className="block lg:hidden w-full h-px bg-gray-600 rounded-full"></div>
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
            <img
              src="https://ncit.edu.np/images/logo.png"
              alt="NCIT Logo"
              className="h-24 w-auto bg-white/80 rounded-lg p-3 object-contain shadow-md"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/128x128/334155/E2E8F0?text=NCIT+Logo";
              }}
            />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-200 mt-4 text-left">Nepal College of Information Technology</h2>
            <Link
              href="https://ncit.edu.np"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-400 hover:text-indigo-300 text-base sm:text-lg underline-offset-4 hover:underline transition duration-300 mt-4"
            >
              Visit Official Site <ArrowRight className="ml-2 w-4 h-4 transform rotate-[-45deg]" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}