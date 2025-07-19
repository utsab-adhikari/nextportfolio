// ProjectCard.jsx
import React from 'react';

function ProjectCard({ project }) {
  return (
    <div className="bg-gray-800 text-white max-w-full mx-auto rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 transform hover:-translate-y-1">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-48 sm:h-52 md:h-56 object-cover object-center"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = `https://placehold.co/600x400/333333/FFFFFF?text=${project.title.replace(/\s/g, '+')}+Image`;
        }}
      />

      <div className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-indigo-300">{project.title}</h2>

        <div className="flex items-center space-x-4 mb-6">
          <img
            src={project.contributorImageUrl || "https://placehold.co/48x48/555555/FFFFFF?text=UA"}
            alt={project.contributorName}
            className="w-12 h-12 rounded-full border-2 border-indigo-500 shadow-md"
          />
          <span className="text-base text-gray-300 font-medium">
            Contributor: <strong className="text-indigo-200">{project.contributorName}</strong>
          </span>
        </div>

        <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-base font-semibold px-6 py-3 rounded-lg transition-transform duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-3 focus:ring-indigo-400 w-full sm:w-auto"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.293 3.293a1 1 0 011.414 0L18 7.586a1 1 0 010 1.414l-4.293 4.293a1 1 0 01-1.414-1.414L14.586 9H7a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" />
            </svg>
            Live Demo
          </a>
          <span className="text-xs sm:text-sm text-gray-500 bg-gray-700 px-3 py-1 rounded-full uppercase tracking-wide">
            <strong className="text-gray-300">{project.techStack}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsList() {
  const projects = [
    {
      id: 'blog-app',
      title: 'Blog App',
      imageUrl: 'https://res.cloudinary.com/dnh6hzxuh/image/upload/v1752889315/epnhvyqpqbryhfe7wh8a.png',
      contributorName: 'Utsab Adhikari',
      contributorImageUrl: 'https://res.cloudinary.com/dnh6hzxuh/image/upload/v1752651455/jtuwbpzdg1xrf4fv2oru.jpg',
      description: 'A full-featured blog platform built with Next.js. Includes authentication, role-based authorization, blog creation, integrated Google Analytics, liking, sharing, and commenting functionality.',
      demoLink: 'https://blog-utsab.vercel.app',
      techStack: 'Next.js',
    },
    {
      id: 'project-manager',
      title: 'Project Manager',
      imageUrl: 'https://res.cloudinary.com/dnh6hzxuh/image/upload/v1752890116/zlqub26ire9jkrj7d19w.png',
      contributorName: 'Utsab Adhikari',
      contributorImageUrl: 'https://res.cloudinary.com/dnh6hzxuh/image/upload/v1752651455/jtuwbpzdg1xrf4fv2oru.jpg',
      description: 'A robust project management tool with authentication, project creation, collaboration, task management, daily tracking, and documentation publishing.',
      demoLink: 'https://project-manager-by-utsab.vercel.app',
      techStack: 'Next.js',
    },
    // additional projects...
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-indigo-400 mb-12 mt-5">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
