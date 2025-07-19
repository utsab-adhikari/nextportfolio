"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Education from "@/mycomponents/Education";
import Skills from "@/mycomponents/Skills";
import ReportDrawer from "@/mycomponents/ReportDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ApiComponent from "@/mycomponents/ApiComponent";
import Head from "next/head";
import BlogCard from "@/mycomponents/ProjectModel";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div className="text-gray-100 min-h-screen font-noto-devanagari">
        <section className="max-w-7xl mx-auto px-6 py-32 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-indigo-400 leading-tight mb-6">
              Hi, I'm Utsab 👋
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
              A passionate IT student from Nepal 🇳🇵
              <br className="hidden sm:block" />
              Specialized in backend development, APIs, databases, and practical
              problem-solving.
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-start justify-center items-center gap-4">
              <Link
                href="/hireme"
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-base font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105"
              >
                🚀 Hire Me
              </Link>
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3 border-2 border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white text-base font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105"
              >
                🎯 Contact Me
              </a>
            </div>
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <img
                src="https://github.com/shadcn.png"
                alt="Utsab's Profile"
                className="w-72 h-72 rounded-full object-cover border-4 border-indigo-500 shadow-2xl transition duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-indigo-600 opacity-0 hover:opacity-10 transition duration-300"></div>
            </div>
          </motion.div>
        </section>

        <section id="skills" className="max-w-5xl mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl font-bold text-indigo-400 mb-6 text-center flex items-center justify-evenly"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technical Skills
          </motion.h2>
          <motion.div
            className="text-center text-lg flex flex-col text-gray-300 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Skills />
            <Link
              href="/skills"
              className="mt-2 text-sm bg-blue-700 text-white mx-auto p-2 px-8 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Explore more
            </Link>
          </motion.div>
        </section>

        <section id="about" className="max-w-5xl mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-6 text-indigo-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-center text-lg text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I'm a Bachelor of Engineering student in Information Technology from
            Nepal 🇳🇵.
            <br />
            I am deeply passionate about backend development, API design,
            authentication systems, and database management.
            <br />
            My focus is on building scalable, real-world applications that solve
            practical problems.
          </motion.p>
        </section>

        <section className="">
          <BlogCard />
        </section>

        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-6 mt-6 text-indigo-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          API Exploration
        </motion.h2>
        <ApiComponent />

        <section id="interests" className="max-w-5xl mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-6 text-indigo-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            🎯 Interests
          </motion.h2>
          <motion.p
            className="text-center text-lg text-gray-300 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I enjoy backend development, cloud deployment, and building
            efficient APIs.
            <br />
            Besides coding, I'm interested in open-source contributions,
            learning new technologies, and exploring AI tools.
          </motion.p>
        </section>

        <section id="education">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-indigo-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            🎓 Education
          </motion.h2>
          <motion.div
            className=""
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Education />
          </motion.div>
        </section>

        <section
          id="contact"
          className="max-w-5xl mx-auto px-6 py-16 text-center"
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-6 text-indigo-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            📞 Contact Me
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I'm open to freelance work, collaborations, or just a friendly chat.
            <br />
            Reach out to me anytime!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="mailto:utasb1adhikari@gmail.com"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              ✉️ Email Me
            </a>
            <a
              href="https://github.com/utsab-adhikari"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              🌟 GitHub
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              🔗 LinkedIn
            </a>
          </motion.div>
        </section>

        <div className="p-4 m-3 gap-3 flex flex-col sm:flex-row justify-center items-center text-center">
          <p className="font-semibold text-gray-400">
            Found a bug or have a suggestion?
          </p>
          <ReportDrawer />
        </div>
      </div>
    </>
  );
};

export default Home;
