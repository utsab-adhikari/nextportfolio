import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  hover: { 
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3 }
  }
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

function ProjectCard({ project }) {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/85 text-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl border border-indigo-700/50 transition-all duration-300 flex flex-col"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-40 sm:h-48 md:h-56 object-cover object-center transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/400x200/333333/FFFFFF?text=${project.title.replace(
              /\s/g,
              "+"
            )}+Image`;
          }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.div 
          className="absolute top-3 right-3 flex items-center space-x-2 z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <img
            src={
              project.contributorImageUrl ||
              "https://placehold.co/32x32/555555/FFFFFF?text=UA"
            }
            alt={project.contributorName}
            className="w-10 h-10 rounded-full border-2 border-indigo-400 shadow-md"
          />
        </motion.div>
      </div>
      <div className="flex-1 flex flex-col px-5 py-4">
        <h2 className="text-xl font-bold mb-2 text-indigo-100 line-clamp-1 tracking-tight">
          {project.title}
        </h2>
        <p className="text-sm text-gray-200 leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 gap-3">
          <motion.a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M12.293 3.293a1 1 0 011.414 0L18 7.586a1 1 0 010 1.414l-4.293 4.293a1 1 0 01-1.414-1.414L14.586 9H7a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" />
            </svg>
            Live Demo
          </motion.a>
          <span className="text-xs text-indigo-100 bg-indigo-900/60 px-3 py-1.5 rounded-full uppercase tracking-wider font-medium border border-indigo-700/50">
            {project.techStack}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsList() {
  const projects = [
    {
      id: "blog-app",
      title: "Blog App",
      imageUrl:
        "https://res.cloudinary.com/dnh6hzxuh/image/upload/v1752889315/epnhvyqpqbryhfe7wh8a.png",
      contributorName: "Utsab Adhikari",
      contributorImageUrl:
        "https://res.cloudinary.com/dnh6hzxuh/image/upload/v1752651455/jtuwbpzdg1xrf4fv2oru.jpg",
      description:
        "A full-featured blog platform built with Next.js, featuring authentication, role-based authorization, Google Analytics integration, and social features like liking, sharing, and commenting.",
      demoLink: "https://blog-utsab.vercel.app",
      techStack: "Next.js",
    },
    {
      id: "project-manager",
      title: "Project Manager",
      imageUrl:
        "https://res.cloudinary.com/dnh6hzxuh/image/upload/v1752890116/zlqub26ire9jkrj7d19w.png",
      contributorName: "Utsab Adhikari",
      contributorImageUrl:
        "https://res.cloudinary.com/dnh6hzxuh/image/upload/v1752651455/jtuwbpzdg1xrf4fv2oru.jpg",
      description:
        "A robust project management tool with authentication, project creation, collaboration, task management, and documentation publishing capabilities.",
      demoLink: "https://project-manager-by-utsab.vercel.app",
      techStack: "Next.js",
    },
    {
      id: "family-image",
      title: "Image Gallery",
      imageUrl:
        "https://res.cloudinary.com/dnh6hzxuh/image/upload/v1753532336/zm7bwdfakpywhsdubzby.png",
      contributorName: "Utsab Adhikari",
      contributorImageUrl:
        "https://res.cloudinary.com/dnh6hzxuh/image/upload/v1752651455/jtuwbpzdg1xrf4fv2oru.jpg",
      description:
        "A secure family image gallery built with Next.js, MongoDB, and Cloudinary, featuring restricted access for family members.",
      demoLink: "https://image-family.vercel.app",
      techStack: "Next.js",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Featured Projects
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-gray-400 text-sm">
            Explore more projects on{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              GitHub
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}