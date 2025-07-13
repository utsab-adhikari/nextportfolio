"use client";
import React from "react";
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
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa6";
import { FaCss3Alt } from "react-icons/fa";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { scale: 1.03 },
};

const techStack = [
  {
    name: "HTML",
    icon: <FaHtml5 size={28} color="#E34F26" />,
    highlights: [
      "Semantic structure for accessibility & SEO",
      "Forms, inputs, media embedding",
      "Performance-optimized markup",
    ],
  },
  {
    name: "CSS",
    icon: <FaCss3Alt size={28} color="#1572B6" />,
    highlights: [
      "Flexbox, Grid layout systems",
      "Responsive design principles (media queries)",
      "Animations & transitions",
    ],
  },
  {
    name: "JavaScript",
    icon: <SiJavascript size={28} color="#f7df1e" />,
    highlights: [
      "ES6+ features: async/await, destructuring",
      "DOM manipulation & event handling",
      "Error handling and closures",
    ],
  },
  {
    name: "React.js",
    icon: <SiReact size={28} color="#61dafb" />,
    highlights: [
      "Component-based architecture",
      "Hooks: useState, useEffect, custom hooks",
      "State management using Context API",
    ],
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs size={28} />,
    highlights: [
      "Server-side rendering & static generation",
      "API routes & routing system",
      "Performance optimization (image, fonts)",
    ],
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs size={28} color="#3c873a" />,
    highlights: [
      "Asynchronous I/O handling",
      "NPM ecosystem & script automation",
      "Event-driven architecture",
    ],
  },
  {
    name: "Express.js",
    icon: <SiExpress size={28} />,
    highlights: [
      "Middleware creation & route handling",
      "RESTful API design",
      "Error handling & request validation",
    ],
  },
  {
    name: "MongoDB",
    icon: <SiMongodb size={28} color="#4db33d" />,
    highlights: [
      "Schema design using Mongoose",
      "Aggregation pipeline basics",
      "CRUD operations with indexes",
    ],
  },
  {
    name: "MySQL",
    icon: <SiMysql size={28} color="#00758f" />,
    highlights: [
      "Normalized schema design",
      "Joins & nested queries",
      "Transactions and indexing",
    ],
  },
  {
    name: "Docker",
    icon: <SiDocker size={28} color="#0db7ed" />,
    highlights: [
      "Containerizing Node.js apps",
      "Using Docker Compose",
      "Basic volume & networking concepts",
    ],
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss size={28} color="#38bdf8" />,
    highlights: [
      "Utility-first styling",
      "Custom themes & dark mode",
      "Responsive breakpoints",
    ],
  },
  {
    name: "Git & GitHub",
    icon: <SiGithub size={28} />,
    highlights: [
      "Branching strategies",
      "Pull requests & code reviews",
      "Rebasing, merging, conflict resolution",
    ],
  },
  {
    name: "Wireshark",
    icon: <SiWireshark size={28} color="#1679be" />,
    highlights: [
      "Packet sniffing & filtering",
      "Basic TCP/IP analysis",
      "Debugging network issues",
    ],
  },
  {
    name: "Linux",
    icon: <SiLinux size={28} color="#fcc624" />,
    highlights: [
      "Command line proficiency",
      "Process & file system management",
      "Shell scripting basics",
    ],
  },
  {
    name: "C / C++ (Foundation)",
    icon: (
      <div className="flex gap-2">
        <SiC size={24} color="#00599C" />
        <SiCplusplus size={24} color="#00599C" />
      </div>
    ),
    highlights: [
      "Memory management (malloc, pointers)",
      "OOP basics in C++",
      "Data structures implementation",
    ],
  },
  {
    name: "Chatbots (OpenAI)",
    icon: <SiOpenai size={28} color="#00a67e" />,
    highlights: [
      "Prompt engineering fundamentals",
      "Chat completion APIs usage",
      "Basic integrations in apps",
    ],
  },
];

const Page = () => {
  return (
   <section className=" min-h-screen py-20 px-6 sm:px-10">
  <div className="max-w-7xl mx-auto">
    <motion.h1
      className="text-4xl font-bold text-center text-indigo-700 mb-12"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      Key Learnings & Experience
    </motion.h1>

    {/* No container animation here — each card animates on scroll */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {techStack.map((tech, index) => (
    <motion.div
      key={index}
      className="bg-gray-800/60 backdrop-blur-md border border-gray-700 p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-default"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
      whileHover={{
        scale: 1.03,
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        {tech.icon}
        <h2 className="text-lg font-semibold text-white">
          {tech.name}
        </h2>
      </div>
      <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
        {tech.highlights.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
    </motion.div>
  ))}
</div>

  </div>
</section>


  );
};

export default Page;
