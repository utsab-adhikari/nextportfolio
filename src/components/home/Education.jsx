import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
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
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

export default function Education() {
  return (
    <section
      id="education"
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8 flex items-center"
    >
      <motion.div
        className="max-w-7xl mx-auto w-full"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Education
           <div className="w-40 h-2 bg-indigo-500 mx-auto rounded-full"></div>
        </motion.h2>

        <motion.div
          variants={cardVariants}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-indigo-700/30"
          whileHover={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)" }}
        >
          <div className="w-full lg:w-1/2 text-left">
            <motion.h3
              className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-5 border-b-2 border-indigo-500 pb-2 inline-block"
              variants={itemVariants}
            >
              BEIT
            </motion.h3>
            <ul className="text-gray-200 space-y-4 text-base sm:text-lg">
              {[
                { label: "Level", value: "Undergraduate" },
                { label: "Started", value: "2024" },
                { label: "Current", value: "2nd Semester" },
                { label: "Course", value: "Bachelor of Engineering in Information Technology" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-2"
                >
                  <span className="font-semibold text-indigo-200">{item.label}:</span>
                  <span>{item.value}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            className="hidden lg:block w-px h-64 bg-indigo-700/50 rounded-full"
            initial={{ height: 0 }}
            animate={{ height: "16rem" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          <motion.div
            className="block lg:hidden w-full h-px bg-indigo-700/50 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />

          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
            <motion.img
              src="https://ncit.edu.np/images/logo.png"
              alt="NCIT Logo"
              className="h-24 sm:h-28 w-auto bg-white/90 rounded-lg p-3 object-contain shadow-md hover:shadow-lg transition-shadow duration-300"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/128x128/334155/E2E8F0?text=NCIT+Logo";
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            />
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-100 mt-4 text-center lg:text-left"
              variants={itemVariants}
            >
              Nepal College of Information Technology
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Link
                href="https://ncit.edu.np"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-300 hover:text-indigo-200 text-base sm:text-lg font-medium underline-offset-4 hover:underline transition-all duration-300 mt-4"
              >
                Visit Official Site
                <motion.div
                  className="ml-2"
                  whileHover={{ x: 5, rotate: -45 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}