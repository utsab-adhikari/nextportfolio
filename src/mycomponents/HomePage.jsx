"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Education from "@/mycomponents/Education";
import Skills from "@/mycomponents/Skills";
import ReportDrawer from "@/mycomponents/ReportDrawer";
import { motion, AnimatePresence } from "framer-motion";
import ApiComponent from "@/mycomponents/ApiComponent";
import { HiOutlineMail } from "react-icons/hi";
import Head from "next/head";
import BlogCard from "@/mycomponents/ProjectModel";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import GitHubCalendar from "./GithubCalender";
import GitHubCalendarMd from "./GithubCalenderMd";
import { Menu, X } from "lucide-react";

// Animation variants
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <title>Utsab Adhikari | IT Engineer Portfolio</title>
        <meta name="description" content="Portfolio of Utsab Adhikari, an IT Engineering student specializing in backend development, APIs, and scalable applications." />
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

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-32 md:py-40 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text leading-tight mb-6">
              Hi, I'm Utsab 👋
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
              IT Engineering Student from Nepal 🇳🇵<br />
              Specializing in backend development, API design, and scalable solutions for real-world problems.
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
                📞 Contact Me
              </a>
            </div>
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              <img
                src="https://github.com/shadcn.png"
                alt="Utsab's Profile"
                className="w-80 h-80 rounded-full object-cover border-4 border-indigo-500 shadow-2xl transition duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 hover:opacity-100 transition duration-300"></div>
            </div>
          </motion.div>
        </section>

        {/* UtsabBot Section */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <motion.div
            className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-lg py-8 px-6 rounded-2xl shadow-xl border border-gray-700 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold gradient-text mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Meet UtsabBot — Your Virtual Assistant
            </motion.h2>
            <motion.p
              className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Curious about my projects, skills, or experience? Chat with UtsabBot for instant, real-time answers!
            </motion.p>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Link
                href="/chatbot"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-950 text-base sm:text-lg"
              >
                <IoChatbubblesOutline className="w-5 h-5 sm:w-6 sm:h-6" />
                Chat with UtsabBot
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* GitHub Contributions */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <motion.div
            className="md:hidden bg-slate-900/50 backdrop-blur-lg rounded-2xl p-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <GitHubCalendar />
          </motion.div>
          <motion.div
            className="hidden md:block bg-slate-900/50 backdrop-blur-lg rounded-2xl p-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <GitHubCalendarMd />
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="max-w-5xl mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center gradient-text mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            Technical Skills
          </motion.h2>
          <motion.div
            className="text-center text-lg text-gray-300 leading-relaxed mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ ...sectionVariants, transition: { delay: 0.2 } }}
          >
            <Skills />
            <Link
              href="/skills"
              className="mt-4 inline-block bg-indigo-600 text-white px-8 py-2 rounded-full hover:bg-indigo-500 transition duration-300"
            >
              Explore More
            </Link>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center gradient-text mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-center text-lg text-gray-300 leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ ...sectionVariants, transition: { delay: 0.2 } }}
          >
            I'm an IT Engineering student from Nepal 🇳🇵, passionate about crafting scalable backend systems, APIs, and authentication solutions. My goal is to build impactful applications that solve real-world challenges.
          </motion.p>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <BlogCard />
        </section>

        {/* API Exploration */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center gradient-text mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            API Exploration
          </motion.h2>
          <ApiComponent />
        </section>

        {/* Interests Section */}
        <section id="interests" className="max-w-5xl mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center gradient-text mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            🎯 Interests
          </motion.h2>
          <motion.p
            className="text-center text-lg text-gray-300 leading-relaxed mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ ...sectionVariants, transition: { delay: 0.2 } }}
          >
            I’m passionate about backend development, cloud architecture, and API design. Beyond coding, I enjoy contributing to open-source projects, exploring AI advancements, and staying updated with emerging technologies.
          </motion.p>
        </section>

        {/* Education Section */}
        <section id="education" className="max-w-5xl mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center gradient-text mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            🎓 Education
          </motion.h2>
          <Education />
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-5xl mx-auto px-6 py-20 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold gradient-text mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            📞 Contact Me
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-10 leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ ...sectionVariants, transition: { delay: 0.2 } }}
          >
            Open to freelance opportunities, collaborations, or tech discussions. Connect with me through any of the platforms below!
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ ...sectionVariants, transition: { delay: 0.4 } }}
          >
            <a
              href="mailto:utsabadhikari075@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              <HiOutlineMail className="text-xl" />
              Email
            </a>
            <a
              href="https://wa.me/9867508725"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-white rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              <FaWhatsapp className="text-xl" />
              WhatsApp
            </a>
            <a
              href="https://github.com/utsab-adhikari"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              <FaGithub className="text-xl" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/utsab-adhikari"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              <FaLinkedin className="text-xl" />
              LinkedIn
            </a>
            <a
              href="https://facebook.com/utsab.adhikari"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              <FaFacebook className="text-xl" />
              Facebook
            </a>
          </motion.div>
        </section>

        {/* Feedback Section */}
        <section className="max-w-5xl mx-auto px-6 py-16 text-center">
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <p className="font-semibold text-gray-400">Found a bug or have a suggestion?</p>
            <ReportDrawer />
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Home;