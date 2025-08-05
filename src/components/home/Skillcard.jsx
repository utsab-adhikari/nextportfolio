"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaCode, FaTools, FaServer, FaDatabase, FaCloud, FaCogs, FaLayerGroup } from "react-icons/fa";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('frontend');
  
  const categories = [
    { id: 'frontend', name: 'Frontend', icon: <FaCode /> },
    { id: 'backend', name: 'Backend', icon: <FaServer /> },
    { id: 'database', name: 'Database', icon: <FaDatabase /> },
    { id: 'devops', name: 'DevOps', icon: <FaTools /> },
    { id: 'cloud', name: 'Cloud', icon: <FaCloud /> },
    { id: 'tools', name: 'Tools', icon: <FaCogs /> },
    { id: 'other', name: 'Other', icon: <FaLayerGroup /> },
  ];

  const skills = {
    frontend: [
      { name: 'React', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'Shadcn UI', level: 85 },
      { name: 'Next.js', level: 90 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'HTML/CSS', level: 95 },
    ],
    backend: [
      { name: 'Node.js', level: 90 },
      { name: 'Express', level: 85 },
      { name: '', level: 80 },
    ],
    database: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MySQL', level: 75 },
    ],
    devops: [
      { name: 'Docker', level: 50 },
      { name: 'CI/CD', level: 10 },
      { name: 'AWS', level: 10 },
      { name: 'Nginx', level: 10 },
    ],
    cloud: [
      { name: 'Render', level: 75 },
      { name: 'Vercel', level: 90 },
      { name: 'Netlify', level: 85 },
    ],
    tools: [
      { name: 'Git', level: 90 },
      { name: 'Webpack', level: 85 },
      { name: 'Postman', level: 80 },
      { name: 'Figma', level: 40 },
      { name: 'VS Code', level: 95 },
    ],
    other: [
      { name: 'GraphQL', level: 85 },
      { name: 'REST API', level: 90 },
      { name: 'WebSockets', level: 50 },
      { name: 'Linux', level: 70 },
      { name: 'Hugging Face', level: 10 },
    ],
  };

  return (
    <section id="skills" className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-12 md:py-10 ">
      <div className="max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Technical Skills
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Technologies I've worked with and mastered throughout my journey
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Navigation */}
          <motion.div
            className="glass-card p-4 rounded-2xl shadow-xl lg:w-1/4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <FaCogs className="text-blue-400" />
              Skill Categories
            </h3>
            
            <div className="space-y-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`w-full text-left py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                    activeCategory === category.id 
                      ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/30' 
                      : 'bg-gray-800/50 hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * categories.indexOf(category) }}
                >
                  <span className="text-blue-400">{category.icon}</span>
                  <span className="text-gray-200 font-medium">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Skills Display */}
          <motion.div
            className="glass-card p-6 rounded-2xl shadow-xl flex-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
                {categories.find(c => c.id === activeCategory)?.icon}
                {categories.find(c => c.id === activeCategory)?.name} Skills
              </h3>
              
              <motion.div 
                className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {skills[activeCategory].length} skills
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills[activeCategory].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-gray-800/30 rounded-xl p-4 border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(96, 165, 250, 0.2)" }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-200">{skill.name}</span>
                    <span className="text-blue-400 text-sm font-medium">{skill.level}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <motion.div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 * index, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.a
                href="/skills"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Skillset
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-8 h-8 rounded-full bg-blue-500/20 blur-xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-12 h-12 rounded-full bg-purple-500/20 blur-xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>
    </section>
  );
}

// Glass card styling
const styles = `
  .glass-card {
    background: rgba(30, 30, 40, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(76, 76, 108, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }
  
  .gradient-text {
    background: linear-gradient(90deg, #4F46E5, #9333EA);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

// Remember to add the styles to your global CSS