'use client';

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
  {
    name: 'Next.js',
    icon: <SiNextdotjs className="text-3xl" />,
    description: 'Next.js powers both the frontend and backend with Server-side Rendering (SSR), API routes, and seamless routing.',
  },
  {
    name: 'React',
    icon: <FaReact className="text-3xl text-blue-400" />,
    description: 'Component-based frontend library used to create dynamic UI and manage states effectively.',
  },
  {
    name: 'MongoDB',
    icon: <SiMongodb className="text-3xl text-green-500" />,
    description: 'MongoDB serves as the NoSQL database, storing user data, projects, and other structured content.',
  },
  {
    name: 'Cloudinary',
    icon: <SiCloudinary className="text-3xl text-purple-400" />,
    description: 'Used for uploading, optimizing, and delivering images and media files efficiently.',
  },
  {
    name: 'shadcn/ui',
    icon: <FaNodeJs className="text-3xl text-green-400" />,
    description: 'Provides elegant, accessible components built on top of Tailwind CSS for UI consistency.',
  },
  {
    name: 'Auth.js',
    icon: <SiAuth0 className="text-3xl text-orange-400" />,
    description: 'Handles user authentication via OAuth providers like Google or GitHub.',
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss className="text-3xl text-sky-400" />,
    description: 'Utility-first CSS framework used to build fully responsive and scalable UI.',
  },
  {
    name: 'Framer Motion',
    icon: <SiFramer className="text-3xl text-pink-400" />,
    description: 'Adds beautiful transitions and animations to improve user experience.',
  },
  {
    name: 'Vercel',
    icon: <SiVercel className="text-3xl text-white" />,
    description: 'The entire portfolio is deployed and hosted on Vercel with automatic CI/CD integration.',
  },
  {
    name: 'Git & GitHub',
    icon: <FaGithub className="text-3xl text-white" />,
    description: 'Git was used for version control and GitHub for repository hosting and collaboration.',
  },
];

export default function DetailsPage() {
  return (
    <main className="px-6 py-12 bg-slate-950 text-slate-100 min-h-screen">
      {/* Introduction */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-10"
      >
        <h1 className="text-4xl font-bold mb-4">Behind the Portfolio</h1>
        <p className="text-lg text-slate-300">
          This portfolio isn’t just a static frontend site—it's a full-stack application built with modern web technologies.
          It features a dynamic backend, secure authentication, cloud media handling, and responsive UI, all hosted on Vercel
          with Git-based CI/CD.
        </p>
      </motion.section>

      {/* Quick Stack Overview */}
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4">Technologies Used:</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {techData.map((tech) => (
            <span
              key={tech.name}
              className="bg-slate-800 px-3 py-1 rounded-full text-slate-100 flex items-center gap-2 shadow"
            >
              {tech.icon}
              {tech.name}
            </span>
          ))}
        </div>
      </section>

      {/* Detailed Technology Grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
        {techData.map((tech, idx) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="bg-slate-800 rounded-xl p-6 hover:shadow-xl shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-slate-100">{tech.icon}</div>
              <h3 className="text-lg font-semibold">{tech.name}</h3>
            </div>
            <p className="text-sm text-slate-300">{tech.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Final Section: About the Portfolio */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center bg-slate-800 p-8 rounded-xl shadow-lg mb-10"
      >
        <h2 className="text-2xl font-bold mb-4">About This Portfolio</h2>
        <p className="text-slate-300 text-base leading-relaxed">
          This portfolio was built to demonstrate not only design and frontend skills, but also backend integration, secure
          authentication, deployment workflows, and real-world project architecture. It features:
        </p>
        <ul className="list-disc text-left text-slate-400 mt-4 ml-5 space-y-2 text-sm">
          <li>Fully responsive and accessible UI built with Tailwind CSS and shadcn/ui</li>
          <li>Dynamic content and data fetching with Next.js and MongoDB</li>
          <li>User authentication via Auth.js with providers like Google and GitHub</li>
          <li>Media management through Cloudinary for optimized image delivery</li>
          <li>Interactive animations using Framer Motion</li>
          <li>Automatic deployment and CI/CD with Vercel</li>
          <li>Version control with Git and collaboration via GitHub</li>
        </ul>
        <p className="mt-4 text-slate-300">
          The goal is not just to present projects, but to architect and maintain a modern developer-grade application—
          showcasing scalability, modularity, and performance best practices.
        </p>
      </motion.section>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mt-16"
      >
        <p className="text-xl text-slate-200 font-medium mb-4">
          Want to build your own dynamic, full-stack portfolio?
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
        >
          Let’s Talk
        </a>
      </motion.div>
    </main>
  );
}
