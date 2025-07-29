import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
function ProjectCard({ project }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 text-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-indigo-700 transition-all duration-300 flex flex-col"
      variants={cardVariants}
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-40 sm:h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/400x200/333333/FFFFFF?text=${project.title.replace(
              /\s/g,
              "+"
            )}+Image`;
          }}
        />
        <div className="absolute top-2 right-2 flex items-center space-x-1 z-10">
          <img
            src={
              project.contributorImageUrl ||
              "https://placehold.co/32x32/555555/FFFFFF?text=UA"
            }
            alt={project.contributorName}
            className="w-8 h-8 rounded-full border-2 border-indigo-500 shadow"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col px-4 py-3">
        <h2 className="text-lg font-bold mb-1 text-indigo-200 line-clamp-1">
          {project.title}
        </h2>
        <p className="text-sm text-gray-300 leading-snug mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2 gap-2">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M12.293 3.293a1 1 0 011.414 0L18 7.586a1 1 0 010 1.414l-4.293 4.293a1 1 0 01-1.414-1.414L14.586 9H7a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" />
            </svg>
            Live Demo
          </a>
          <span className="text-xs text-indigo-200 bg-indigo-950/50 px-2 py-1 rounded-full uppercase tracking-wide font-semibold border border-indigo-800">
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
      techStack: "Next.js, MongoDB",
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
      techStack: "Next.js, TypeScript",
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
      techStack: "Next.js, Cloudinary",
    },
  ];

  return (
    <section className="w-full py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center gradient-text mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          My Projects
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
