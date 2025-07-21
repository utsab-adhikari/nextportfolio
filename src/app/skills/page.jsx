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
  SiVercel,
  SiRender,
  SiShadcnui,
} from "react-icons/si";
import { MdDashboardCustomize } from "react-icons/md";

import { FaHtml5 } from "react-icons/fa6";
import { FaCss3Alt } from "react-icons/fa";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Frontend",
    technologies: [
      {
        name: "HTML",
        icon: <FaHtml5 size={24} color="#E34F26" />,
        highlights: ["Semantic markup", "SEO-friendly", "Forms & media"],
      },
      {
        name: "CSS",
        icon: <FaCss3Alt size={24} color="#1572B6" />,
        highlights: ["Flexbox & Grid", "Responsive design", "Animations"],
      },
      {
        name: "JavaScript",
        icon: <SiJavascript size={24} color="#F7DF1E" />,
        highlights: ["ES6+", "DOM manipulation", "Event handling"],
      },
      {
        name: "React.js",
        icon: <SiReact size={24} color="#61DAFB" />,
        highlights: ["Hooks", "Reusable components", "Context API"],
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs size={24} />,
        highlights: ["Routing", "API routes", "SSR & SSG"],
      },
    ],
  },
  {
    title: "UI / Component Libraries",
    technologies: [
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss size={24} color="#38BDF8" />,
        highlights: ["Utility-first", "Dark mode", "Custom themes"],
      },
      {
        name: "Shadcn UI",
        icon: <SiShadcnui size={24} />,
        highlights: ["Radix UI-based", "Accessible", "Themeable"],
      },
      {
        name: "Material UI",
        icon: <MdDashboardCustomize size={24} color="#007FFF" />,
        highlights: ["Modern components", "Responsive", "Extensive docs"],
      },
    ],
  },
  {
    title: "Backend",
    technologies: [
      {
        name: "Node.js",
        icon: <SiNodedotjs size={24} color="#3C873A" />,
        highlights: ["Non-blocking I/O", "Event-driven", "NPM ecosystem"],
      },
      {
        name: "Express.js",
        icon: <SiExpress size={24} />,
        highlights: ["Routing", "Middleware", "REST APIs"],
      },
    ],
  },
  {
    title: "Database",
    technologies: [
      {
        name: "MongoDB",
        icon: <SiMongodb size={24} color="#47A248" />,
        highlights: ["Mongoose ODM", "CRUD ops", "Aggregation pipeline"],
      },
      {
        name: "MySQL",
        icon: <SiMysql size={24} color="#00758F" />,
        highlights: ["Normalized design", "Joins", "Transactions"],
      },
    ],
  },
  {
    title: "Version Control",
    technologies: [
      {
        name: "Git & GitHub",
        icon: <SiGithub size={24} />,
        highlights: ["Branching", "Pull requests", "Conflict resolution"],
      },
    ],
  },
  {
    title: "Hosting / Deployment",
    technologies: [
      {
        name: "Vercel",
        icon: <SiVercel size={24} />,
        highlights: ["Optimized for Next.js", "CI/CD", "Fast global CDN"],
      },
      {
        name: "Render",
        icon: <SiRender size={24} color="#46E6B5" />,
        highlights: ["Full-stack apps", "Auto deploy", "Free tier"],
      },
    ],
  },
  {
    title: "OS / Tools",
    technologies: [
      {
        name: "Linux",
        icon: <SiLinux size={24} color="#FCC624" />,
        highlights: ["Shell scripting", "Permissions", "CLI tools"],
      },
      {
        name: "Wireshark",
        icon: <SiWireshark size={24} color="#1679BE" />,
        highlights: ["Packet analysis", "Network debugging"],
      },
      {
        name: "Docker",
        icon: <SiDocker size={24} color="#0DB7ED" />,
        highlights: ["Containerize apps", "Docker Compose", "Volumes"],
      },
    ],
  },
  {
    title: "Other APIs / Integrations",
    technologies: [
      {
        name: "OpenAI",
        icon: <SiOpenai size={24} color="#00A67E" />,
        highlights: ["Prompt engineering", "Chat API", "AI integration"],
      },
      {
        name: "Hamro Patro API",
        icon: <FaHtml5 size={24} color="#FF5B2D" />,
        highlights: ["Nepali date", "Calendar & festivals"],
      },
    ],
  },
];

const Page = () => {
  return (
    <section className="bg-slate-950 text-white min-h-screen py-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tech Stack & Project Tools
        </motion.h1>

        {sections.map((section, i) => (
          <div key={i}>
            <motion.h2
              className="text-2xl sm:text-3xl font-semibold mb-6 border-l-4 border-blue-500 pl-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {section.title}
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.technologies.map((tech, idx) => (
                <motion.div
                  key={idx}
                  className="bg-slate-800/70 border border-slate-700 p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {tech.icon}
                    <h3 className="text-lg font-semibold">{tech.name}</h3>
                  </div>
                  <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                    {tech.highlights.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl sm:text-2xl font-medium mb-6">
            Want to create your own dynamic, modern portfolio?
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
          >
            Let's Build It →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Page;
