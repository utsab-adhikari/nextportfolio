"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Education from "@/mycomponents/Education";
import Skills from "@/mycomponents/Skills";
import ReportDrawer from "@/mycomponents/ReportDrawer";
import { motion, AnimatePresence } from "framer-motion";
import ApiComponent from "@/mycomponents/ApiComponent";
import { HiOutlineMail, HiOutlineChevronUp } from "react-icons/hi";
import Head from "next/head";
import BlogCard from "@/mycomponents/ProjectModel";
import {
  IoChatbubblesOutline,
  IoLogoGithub,
  IoLogoLinkedin,
} from "react-icons/io5";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaDiscord,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import GitHubCalendar from "./GithubCalender";
import GitHubCalendarMd from "./GithubCalenderMd";
import Typewriter from "typewriter-effect";

const assistantSectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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
        "interests",
        "education",
        "contact",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
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
      setActiveSection(id);
    }
  };

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

      <div className="gradient-bg text-gray-100 min-h-screen font-noto-devanagari pt-16">
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
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <span>🚀 Hire Me</span>
              </Link>

              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3.5 border-2 border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
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
                { icon: <FaLinkedin className="w-6 h-6" />, url: "#" },
                { icon: <SiLeetcode className="w-6 h-6" />, url: "#" },
                { icon: <FaDiscord className="w-6 h-6" />, url: "#" },
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
                src="https://github.com/shadcn.png"
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

        {/* Assistant Section */}
        <section className="mx-auto flex items-center justify-center px-4">
          <motion.div
            className="glass-card w-full max-w-4xl p-6 md:p-8 rounded-2xl shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={assistantSectionVariants}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-gradient-to-r from-green-600 to-teal-500 p-4 rounded-xl">
                <IoChatbubblesOutline className="text-white w-12 h-12" />
              </div>

              <div className="text-center md:text-left">
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-green-400 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                >
                  Meet UtsabBot — Your Virtual Assistant
                </motion.h2>

                <motion.p
                  className="text-gray-300 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.4, duration: 0.5 },
                  }}
                >
                  Have questions about my projects, skills, or experience? Chat
                  instantly and get real-time answers!
                </motion.p>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { delay: 0.6, duration: 0.4 },
                  }}
                >
                  <Link
                    href="/chatbot"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-300"
                  >
                    <IoChatbubblesOutline className="w-5 h-5" />
                    <span>Chat with UtsabBot</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* GitHub Calendar */}
        <div className="mt-16 px-4">
          <div className="glass-card p-4 rounded-xl max-w-4xl mx-auto">
            <div className="md:hidden">
              <GitHubCalendar />
            </div>
            <div className="hidden md:block">
              <GitHubCalendarMd />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <section id="skills" className="max-w-5xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold gradient-text mb-2">
              Technical Skills
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Technologies I've worked with and mastered throughout my journey
            </p>
          </motion.div>

          <motion.div
            className="glass-card p-6 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Skills />
            <div className="mt-8 text-center">
              <Link
                href="/skills"
                className="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors duration-300"
              >
                View Full Skillset
              </Link>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold gradient-text mb-2">About Me</h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 rounded-2xl"
            >
              <h3 className="text-xl font-semibold mb-4 text-indigo-300">
                Background
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm a Bachelor of Engineering student in Information Technology
                from Nepal 🇳🇵. My passion lies in backend development, API
                design, authentication systems, and database management.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I focus on building scalable, real-world applications that solve
                practical problems with efficient and maintainable code.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 rounded-2xl"
            >
              <h3 className="text-xl font-semibold mb-4 text-indigo-300">
                Development Approach
              </h3>
              <ul className="space-y-3">
                {[
                  "Focus on clean, maintainable code",
                  "Emphasis on security and scalability",
                  "API-first design philosophy",
                  "Test-driven development practices",
                  "Continuous integration and deployment",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold gradient-text mb-2">
              Featured Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Some of my most significant work and contributions
            </p>
          </motion.div>

          <BlogCard />
        </section>

        {/* API Section */}
        <section id="api" className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold gradient-text mb-2">
              API Exploration
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Interactive demonstration of my API development skills
            </p>
          </motion.div>

          <ApiComponent />
        </section>

        {/* Education Section */}
        <section id="education" className="max-w-5xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold gradient-text mb-2">Education</h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full"></div>
          </motion.div>

          <Education />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={contactRef}
          className="max-w-5xl mx-auto px-6 py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold gradient-text mb-2">
              Get In Touch
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? I'd love
              to hear from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h3 className="text-xl font-semibold mb-6 text-indigo-300">
                Contact Information
              </h3>

              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="bg-indigo-600 p-3 rounded-lg mr-4">
                    <HiOutlineMail className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-300">Email</h4>
                    <a
                      href="mailto:utsabadhikari075@gmail.com"
                      className="text-indigo-400 hover:underline"
                    >
                      utsabadhikari075@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-600 p-3 rounded-lg mr-4">
                    <FaWhatsapp className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-300">WhatsApp</h4>
                    <a
                      href="https://wa.me/9867508725"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline"
                    >
                      +977 9867508725
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 p-3 rounded-lg mr-4">
                    <FaLinkedin className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-300">LinkedIn</h4>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline"
                    >
                      Connect with me
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h3 className="text-xl font-semibold mb-6 text-indigo-300">
                Send a Message
              </h3>

              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </section>
        <div className="flex justify-center items-center gap-4 mb-3">
          <p className="text-gray-600">Designed and built with ❤️</p>
          <ReportDrawer />
        </div>
      </div>
    </>
  );
};

export default Home;
