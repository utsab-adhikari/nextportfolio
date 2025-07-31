"use client";

import { motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaGithub,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiCloudinary,
  SiAuth0,
  SiFramer,
  SiVercel,
} from 'react-icons/si';

const techData = [
  { name: 'Next.js', icon: <SiNextdotjs className="text-3xl" />, description: 'Powers frontend and backend with SSR and API routes.' },
  { name: 'React', icon: <FaReact className="text-3xl text-blue-400" />, description: 'Builds dynamic UI with component-based architecture.' },
  { name: 'MongoDB', icon: <SiMongodb className="text-3xl text-green-500" />, description: 'NoSQL database for storing user and project data.' },
  { name: 'Cloudinary', icon: <SiCloudinary className="text-3xl text-purple-400" />, description: 'Manages and optimizes image uploads and delivery.' },
  { name: 'shadcn/ui', icon: <FaNodeJs className="text-3xl text-green-400" />, description: 'Accessible UI components built with Tailwind CSS.' },
  { name: 'Auth.js', icon: <SiAuth0 className="text-3xl text-orange-400" />, description: 'Handles secure OAuth authentication.' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-3xl text-sky-400" />, description: 'Utility-first CSS for responsive UI design.' },
  { name: 'Framer Motion', icon: <SiFramer className="text-3xl text-pink-400" />, description: 'Adds smooth animations and transitions.' },
  { name: 'Vercel', icon: <SiVercel className="text-3xl text-white" />, description: 'Hosts the app with automated CI/CD.' },
  { name: 'Git & GitHub', icon: <FaGithub className="text-3xl text-white" />, description: 'Manages version control and collaboration.' },
];

export default function DetailsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 to-blue-950 text-slate-100 font-sans px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16">
      {/* Introduction */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-8 sm:mb-12"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-300 mb-4">Behind the Portfolio</h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
          A full-stack portfolio built with modern web technologies, featuring dynamic content, secure authentication, and responsive design.
        </p>
      </motion.section>

      {/* Technology Grid */}
      <section className="max-w-4xl mx-auto grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {techData.map((tech, idx) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="bg-slate-800/50 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-3">
              <div aria-label={`${tech.name} icon`}>{tech.icon}</div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-100">{tech.name}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">{tech.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="text-base sm:text-lg md:text-xl text-slate-200 font-medium mb-4">
          Want to create your own full-stack portfolio?
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition duration-300"
          aria-label="Contact for building a portfolio"
        >
          Get in Touch
        </a>
      </motion.section>
    </main>
  );
}