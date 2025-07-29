"use client";
import React, { useState, useEffect } from "react";
import {
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiNextdotjs,
  SiReact,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiTailwindcss,
  SiGithub,
  SiWireshark,
  SiLinux,
  SiOpenai,
  SiC,
  SiCplusplus,
  SiVercel,
  SiRender,
  SiShadcnui,
} from "react-icons/si";
import { MdDashboardCustomize } from "react-icons/md";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const sections = [
  {
    title: "Frontend",
    technologies: [
      { name: "HTML", icon: <FaHtml5 size={24} color="#E34F26" />, highlights: ["Semantic markup", "SEO-friendly", "Forms & media"] },
      { name: "CSS", icon: <FaCss3Alt size={24} color="#1572B6" />, highlights: ["Flexbox & Grid", "Responsive design", "Animations"] },
      { name: "JavaScript", icon: <SiJavascript size={24} color="#F7DF1E" />, highlights: ["ES6+", "DOM manipulation", "Event handling"] },
      { name: "React.js", icon: <SiReact size={24} color="#61DAFB" />, highlights: ["Hooks", "Reusable components", "Context API"] },
      { name: "Next.js", icon: <SiNextdotjs size={24} />, highlights: ["Routing", "API routes", "SSR & SSG"] },
    ],
  },
  {
    title: "UI / Component Libraries",
    technologies: [
      { name: "Tailwind CSS", icon: <SiTailwindcss size={24} color="#38BDF8" />, highlights: ["Utility-first", "Dark mode", "Custom themes"] },
      { name: "Shadcn UI", icon: <SiShadcnui size={24} />, highlights: ["Radix UI-based", "Accessible", "Themeable"] },
      { name: "Material UI", icon: <MdDashboardCustomize size={24} color="#007FFF" />, highlights: ["Modern components", "Responsive", "Extensive docs"] },
    ],
  },
  {
    title: "Backend",
    technologies: [
      { name: "Node.js", icon: <SiNodedotjs size={24} color="#3C873A" />, highlights: ["Non-blocking I/O", "Event-driven", "NPM ecosystem"] },
      { name: "Express.js", icon: <SiExpress size={24} />, highlights: ["Routing", "Middleware", "REST APIs"] },
    ],
  },
  {
    title: "Database",
    technologies: [
      { name: "MongoDB", icon: <SiMongodb size={24} color="#47A248" />, highlights: ["Mongoose ODM", "CRUD ops", "Aggregation pipeline"] },
      { name: "MySQL", icon: <SiMysql size={24} color="#00758F" />, highlights: ["Normalized design", "Joins", "Transactions"] },
    ],
  },
  {
    title: "Version Control",
    technologies: [
      { name: "Git & GitHub", icon: <SiGithub size={24} />, highlights: ["Branching", "Pull requests", "Conflict resolution"] },
    ],
  },
  {
    title: "Hosting / Deployment",
    technologies: [
      { name: "Vercel", icon: <SiVercel size={24} />, highlights: ["Optimized for Next.js", "CI/CD", "Fast global CDN"] },
      { name: "Render", icon: <SiRender size={24} color="#46E6B5" />, highlights: ["Full-stack apps", "Auto deploy", "Free tier"] },
    ],
  },
  {
    title: "OS / Tools",
    technologies: [
      { name: "Linux", icon: <SiLinux size={24} color="#FCC624" />, highlights: ["Shell scripting", "Permissions", "CLI tools"] },
      { name: "Wireshark", icon: <SiWireshark size={24} color="#1679BE" />, highlights: ["Packet analysis", "Network debugging"] },
      { name: "Docker", icon: <SiDocker size={24} color="#0DB7ED" />, highlights: ["Containerize apps", "Docker Compose", "Volumes"] },
    ],
  },
  {
    title: "Other APIs / Integrations",
    technologies: [
      { name: "OpenAI", icon: <SiOpenai size={24} color="#00A67E" />, highlights: ["Prompt engineering", "Chat API", "AI integration"] },
      { name: "Hamro Patro API", icon: <FaHtml5 size={24} color="#FF5B2D" />, highlights: ["Nepali date", "Calendar & festivals"] },
    ],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const SkillsPage = () => {
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
    <div className="min-h-screen bg-slate-950 text-gray-100 font-inter">

      <section className="pt-24 pb-16 px-6 sm:px-10 max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-center gradient-text mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          Tech Stack & Expertise
        </motion.h1>

        {sections.map((section, i) => (
          <motion.div
            key={i}
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 border-l-4 border-indigo-500 pl-4 gradient-text">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.technologies.map((tech, idx) => (
                <motion.div
                  key={idx}
                  className="bg-slate-900/50 backdrop-blur-lg border border-indigo-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  variants={cardVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {tech.icon}
                    <h3 className="text-lg font-semibold text-gray-100">{tech.name}</h3>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
                    {tech.highlights.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          className="text-center mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <p className="text-xl sm:text-2xl font-medium text-gray-200 mb-6">
            Ready to collaborate on innovative projects?
          </p>
          <Link
            href="/contact"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Get in Touch →
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default SkillsPage;