"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMail, HiOutlineChevronUp } from "react-icons/hi";
import Head from "next/head";
import {
  IoChatbubblesOutline,
  IoCheckmarkCircle,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { FaGithub, FaLinkedin, FaWhatsapp, FaDiscord } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Typewriter from "typewriter-effect";
// Assuming these are separate components you have in your project
// GitHubCalendar and GitHubCalendarMd are distinct in your original code,
// but we will provide the content for GitHubCalendarMd below.
// If GitHubCalendar is also needed, please specify.
// For now, I'm providing the refined GitHubCalendarMd.
import GitHubCalendarMd from "./home/GithubCalenderMd"; // This will be provided below
import Skills from "./home/Skills"; // Placeholder for your existing Skills component
import ProjectsList from "./home/ProjectModel"; // Placeholder for your existing ProjectsList component
import ApiComponent from "./home/ApiComponent"; // Placeholder for your existing ApiComponent
import Education from "./home/Education"; // Placeholder for your existing Education component
import ReportDrawer from "./home/ReportDrawer"; // Placeholder for your existing ReportDrawer component
import GitHubCalendar from "./home/GithubCalender";
import SkillsSection from "./home/Skillcard";
import ContactSection from "./home/Contact";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contactRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);

      // Update active section based on scroll position
      const sections = [
        "home",
        "skills",
        "about",
        "projects",
        "api",
        "education", // Changed from 'interests' as it's not in your sections
        "contact",
      ];
      // Find the currently active section by checking scroll position
      let currentActive = "home"; // Default to home
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is mostly in view
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            currentActive = section;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);
    // Initial check on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id); // Update active section immediately on click
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Tailwind CSS CDN - Ensure this is loaded for styling */}
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          /* Custom styles for gradients, blur, and animations */
          .font-noto-devanagari {
            font-family: 'Noto Sans Devanagari', sans-serif;
          }
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
          .gradient-bg {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          }
          .gradient-text {
            background: linear-gradient(90deg, #818cf8, #c084fc, #60a5fa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .glass-card {
            background: rgba(30, 41, 59, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .floating {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          /* Ensure no horizontal scroll on body/html */
          html, body {
            overflow-x: hidden;
          }
        `}</style>
      </Head>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed z-50 bottom-8 right-8 p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all duration-300"
            aria-label="Scroll to top"
          >
            <HiOutlineChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="gradient-bg text-gray-100 min-h-screen font-noto-devanagari overflow-x-hidden">
        {/* Hero Section */}
        <section
          id="home"
          className="max-w-7xl mx-auto px-6 py-28 md:py-36 flex flex-col-reverse lg:flex-row items-center justify-between gap-12"
        >
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="gradient-text">Hi, I'm Utsab</span> 👋
            </h1>

            <div className="text-2xl md:text-3xl font-bold mb-6 h-12">
              <Typewriter
                options={{
                  strings: [
                    "Backend Developer",
                    "API Specialist",
                    "Database Engineer",
                    "Problem Solver",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </div>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl">
              A passionate IT student from Nepal 🇳🇵 specializing in backend
              development, API design, and database systems. I build scalable
              solutions for real-world problems.
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-start justify-center items-center gap-4">
              <Link
                href="/hireme"
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>🚀 Hire Me</span>
              </Link>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="w-full sm:w-auto px-6 py-3.5 border-2 border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>💬 Contact Me</span>
              </a>
            </div>

            <div className="mt-10 flex justify-center lg:justify-start space-x-4">
              {[
                {
                  icon: <FaGithub className="w-6 h-6" />,
                  url: "https://github.com/utsab-adhikari",
                },
                {
                  icon: <FaLinkedin className="w-6 h-6" />,
                  url: "https://www.linkedin.com/in/utsabadhikari",
                },
                {
                  icon: <SiLeetcode className="w-6 h-6" />,
                  url: "https://leetcode.com/u/3RGsW3S1aG",
                },
                {
                  icon: <FaDiscord className="w-6 h-6" />,
                  url: "https://discord.gg/Dv3DbBVx",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="p-3 bg-gray-800 hover:bg-indigo-600 rounded-full transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <motion.img
                src="https://github.com/shadcn.png" // Placeholder image URL
                alt="Utsab's Profile"
                className="w-72 h-72 rounded-full object-cover border-4 border-indigo-500/30 shadow-2xl floating relative"
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 px-4 py-1 rounded-full text-sm font-medium">
                Open to Opportunities
              </div>
            </div>
          </motion.div>
        </section>

        {/* Assistant Section - Full Height with Enhanced Features */}
        <section className="min-h-screen flex items-center justify-center px-4 py-12 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800">
          <motion.div
            className="glass-card w-full max-w-6xl p-6 md:p-8 rounded-2xl shadow-xl border border-green-400/20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Animated Icon Container */}
              <motion.div
                className="bg-gradient-to-r from-green-600 to-teal-500 p-5 rounded-xl shadow-lg flex-shrink-0"
                initial={{ scale: 0.8, rotate: -15 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  transition: { delay: 0.3, type: "spring", stiffness: 300 },
                }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <IoChatbubblesOutline className="text-white w-14 h-14 md:w-16 md:h-16" />
              </motion.div>

              <div className="text-center md:text-left flex-1">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-green-400 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.6 },
                  }}
                >
                  Meet <span className="text-teal-300">UtsabBot</span> — Your AI
                  Assistant
                </motion.h2>

                <motion.div
                  className="space-y-4 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.4, staggerChildren: 0.1 },
                  }}
                >
                  <motion.p
                    className="text-gray-300 text-lg"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    UtsabBot is an intelligent AI assistant trained on my
                    professional background, skills, and projects.
                  </motion.p>

                  <motion.p
                    className="text-gray-300 text-lg"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    It can answer questions about my work experience,
                    technologies I use, project details, and even provide code
                    examples.
                  </motion.p>

                  <motion.p
                    className="text-gray-300 text-lg"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    The bot understands natural language and gets smarter with
                    every interaction!
                  </motion.p>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.8, type: "spring" },
                  }}
                >
                  <Link
                    href="/chatbot"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/20"
                  >
                    <IoChatbubblesOutline className="w-6 h-6" />
                    <span className="text-lg">Chat with UtsabBot</span>
                  </Link>

                  <Link
                    href="/about#faq"
                    className="inline-flex items-center gap-3 border border-green-400/30 hover:border-green-400/60 text-green-300 hover:text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <IoInformationCircleOutline className="w-6 h-6" />
                    <span className="text-lg">Learn More</span>
                  </Link>
                </motion.div>

                {/* Feature Highlights - Appears on larger screens */}
                <motion.div
                  className="mt-8 hidden md:grid grid-cols-2 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 1 } }}
                >
                  {[
                    "24/7 Availability",
                    "Instant Responses",
                    "Project Insights",
                    "Code Examples",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 text-green-300"
                      whileHover={{ x: 5 }}
                    >
                      <IoCheckmarkCircle className="text-teal-400" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        <SkillsSection />

        {/* GitHub Calendar Section */}
        <section
          id="github-contributions"
          className="max-w-7xl mx-auto hidden md:block"
        >
          <GitHubCalendarMd /> {/* This component is provided below */}
        </section>
        <section
          id="github-contributions"
          className="max-w-7xl mx-auto md:hidden block"
        >
          <GitHubCalendar /> {/* This component is provided below */}
        </section>

        {/* About Section */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          {" "}
          {/* Added md:py-24 for more vertical space on larger screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.3,
            }} /* Increased amount for earlier trigger */
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              About Me
            </h2>{" "}
            {/* Adjusted text size for responsiveness */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{
                width: "80px",
              }} /* Animate width of the underline */
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-indigo-500 mx-auto rounded-full"
            ></motion.div>
            <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
              {" "}
              {/* Added responsive text size and margin */}
              Discover my journey, passion, and the principles that drive my
              work.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch">
            {" "}
            {/* Adjusted gap for better spacing */}
            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }} /* More pronounced initial x movement */
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{
                once: true,
                amount: 0.4,
              }} /* Increased amount for earlier trigger */
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 10px 20px rgba(0,0,0,0.2), 0 0 15px rgba(129, 140, 248, 0.3)",
              }} /* Added hover effect */
              className="glass-card p-6 md:p-8 rounded-2xl shadow-xl flex flex-col justify-between" /* Added flex-col for consistent height */
            >
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-indigo-300">
                  {" "}
                  {/* Adjusted text size */}
                  Background & Passion
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4 text-base md:text-lg">
                  {" "}
                  {/* Adjusted text size */}
                  I'm a Bachelor of Engineering student in Information
                  Technology from Nepal 🇳🇵. My passion lies in **backend
                  development**, **API design**, **authentication systems**, and
                  **database management**.
                </p>
                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                  {" "}
                  {/* Adjusted text size */}I focus on building scalable,
                  real-world applications that solve practical problems with
                  efficient, secure, and maintainable code.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                x: 50,
              }} /* More pronounced initial x movement */
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{
                once: true,
                amount: 0.4,
              }} /* Increased amount for earlier trigger */
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 10px 20px rgba(0,0,0,0.2), 0 0 15px rgba(129, 140, 248, 0.3)",
              }} /* Added hover effect */
              className="glass-card p-6 md:p-8 rounded-2xl shadow-xl flex flex-col justify-between" /* Added flex-col for consistent height */
            >
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-indigo-300">
                  {" "}
                  {/* Adjusted text size */}
                  My Development Approach
                </h3>
                <motion.ul
                  className="space-y-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.1 },
                    } /* Stagger children for animation */,
                    hidden: {},
                  }}
                >
                  {[
                    "Focus on clean, maintainable, and well-documented code",
                    "Emphasis on security, scalability, and performance",
                    "Adopting an API-first design philosophy",
                    "Practicing test-driven development (TDD)",
                    "Implementing continuous integration and deployment (CI/CD)",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start text-base md:text-lg" /* Adjusted text size */
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <span className="text-green-400 mr-2 mt-1 flex-shrink-0">
                        ✓
                      </span>
                      <span className="text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="">
          <ProjectsList />{" "}
          {/* Placeholder for your existing ProjectsList component */}
        </section>

        {/* API Section */}
        <section id="api" className="max-w-7xl mx-auto py-16 ">
          <ApiComponent /> {/* Placeholder for your existing ApiComponent */}
        </section>

        {/* Education Section */}
        <section id="education" className="">
          <Education />{" "}
          {/* Placeholder for your existing Education component */}
        </section>
                <ContactSection/>
        <div className="flex justify-center items-center gap-4 mb-3 pb-8">
          <p className="text-gray-600">Report or Feedback</p>
          <ReportDrawer />{" "}
          {/* Placeholder for your existing ReportDrawer component */}
        </div>
      </div>
    </>
  );
};

export default Home;
