"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiJavascript, SiNodedotjs, SiExpress, SiNextdotjs, SiReact,
  SiMongodb, SiMysql, SiDocker, SiTailwindcss, SiGithub,
  SiWireshark, SiLinux, SiOpenai, SiC, SiCplusplus
} from "react-icons/si";
import { FaDatabase, FaCode, FaServer, FaTools, FaCloud } from "react-icons/fa";
import { FaHtml5, FaCss3Alt } from "react-icons/fa6";
import { FiChevronDown, FiChevronUp, FiFilter } from "react-icons/fi";

const skillsList = [
  { name: "HTML5", icon: <FaHtml5 />, category: "frontend", level: 95 },
  { name: "CSS3", icon: <FaCss3Alt />, category: "frontend", level: 90 },
  { name: "JavaScript", icon: <SiJavascript />, category: "frontend", level: 92 },
  { name: "Node.js", icon: <SiNodedotjs />, category: "backend", level: 88 },
  { name: "Express.js", icon: <SiExpress />, category: "backend", level: 85 },
  { name: "Next.js", icon: <SiNextdotjs />, category: "frontend", level: 90 },
  { name: "React.js", icon: <SiReact />, category: "frontend", level: 93 },
  { name: "MongoDB", icon: <SiMongodb />, category: "database", level: 87 },
  { name: "MySQL", icon: <SiMysql />, category: "database", level: 83 },
  { name: "RESTful APIs", icon: <FaDatabase />, category: "backend", level: 89 },
  { name: "Authentication", icon: <FaDatabase />, category: "backend", level: 86 },
  { name: "Git & GitHub", icon: <SiGithub />, category: "tools", level: 91 },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "frontend", level: 94 },
  { name: "Wireshark", icon: <SiWireshark />, category: "other", level: 75 },
  { name: "Linux", icon: <SiLinux />, category: "other", level: 82 },
  { name: "Chatbots", icon: <SiOpenai />, category: "other", level: 84 },
  { name: "C", icon: <SiC />, category: "other", level: 78 },
  { name: "C++", icon: <SiCplusplus />, category: "other", level: 76 },
  { name: "Docker", icon: <SiDocker />, category: "devops", level: 80 },
];

const categoryData = {
  frontend: { icon: <FaCode />, color: "bg-gradient-to-r from-blue-500 to-cyan-400" },
  backend: { icon: <FaServer />, color: "bg-gradient-to-r from-purple-600 to-pink-500" },
  database: { icon: <FaDatabase />, color: "bg-gradient-to-r from-emerald-500 to-teal-400" },
  devops: { icon: <FaTools />, color: "bg-gradient-to-r from-orange-500 to-amber-400" },
  tools: { icon: <FaTools />, color: "bg-gradient-to-r from-gray-500 to-gray-400" },
  other: { icon: <FaCloud />, color: "bg-gradient-to-r from-indigo-500 to-violet-400" }
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredSkills = activeCategory === "all" 
    ? skillsList 
    : skillsList.filter(skill => skill.category === activeCategory);

  const visibleSkills = expanded ? filteredSkills : filteredSkills.slice(0, 12);

  return (
    <section id="skills" className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
              Technical Skills
            </span>
          </h2>
          <motion.p 
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Technologies I've mastered through hands-on experience
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Category Filter - Desktop */}
          <motion.div
            className="hidden lg:block glass-card p-5 rounded-2xl shadow-xl w-72 h-fit sticky top-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-gray-200 mb-5 flex items-center gap-3">
              <FiFilter className="text-blue-400" />
              Filter Skills
            </h3>
            
            <div className="space-y-3">
              <motion.button
                className={`w-full text-left py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  activeCategory === "all" 
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/30' 
                    : 'bg-gray-800/50 hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveCategory("all")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-gray-200 font-medium">All Skills</span>
                <span className="ml-auto text-sm bg-gray-700/50 px-2 py-1 rounded">
                  {skillsList.length}
                </span>
              </motion.button>
              
              {Object.entries(categoryData).map(([category, { icon, color }]) => (
                <motion.button
                  key={category}
                  className={`w-full text-left py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                    activeCategory === category 
                      ? `${color}/30 border border-${color.split(' ')[2].replace('to-', '')}-500/30` 
                      : 'bg-gray-800/50 hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * Object.keys(categoryData).indexOf(category) }}
                >
                  <span className={`text-xl ${color.includes('blue') ? 'text-blue-400' : 
                    color.includes('purple') ? 'text-purple-400' :
                    color.includes('emerald') ? 'text-emerald-400' :
                    color.includes('orange') ? 'text-amber-400' :
                    color.includes('gray') ? 'text-gray-400' : 'text-indigo-400'}`}>
                    {icon}
                  </span>
                  <span className="text-gray-200 font-medium capitalize">{category}</span>
                  <span className="ml-auto text-sm bg-gray-700/50 px-2 py-1 rounded">
                    {skillsList.filter(s => s.category === category).length}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <motion.button
              className="w-full flex items-center justify-between glass-card py-3 px-4 rounded-xl"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-3">
                <FiFilter className="text-blue-400" />
                <span className="text-gray-200 font-medium">
                  {activeCategory === "all" ? "All Skills" : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`}
                </span>
              </div>
              {showMobileFilters ? <FiChevronUp /> : <FiChevronDown />}
            </motion.button>

            <AnimatePresence>
              {showMobileFilters && (
                <motion.div
                  className="glass-card p-4 rounded-xl mt-2 grid grid-cols-2 gap-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    className={`py-2 px-3 rounded-lg text-sm ${
                      activeCategory === "all" 
                        ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30' 
                        : 'bg-gray-800/50 hover:bg-gray-700/50'
                    }`}
                    onClick={() => {
                      setActiveCategory("all");
                      setShowMobileFilters(false);
                    }}
                  >
                    All
                  </motion.button>
                  {Object.keys(categoryData).map(category => (
                    <motion.button
                      key={category}
                      className={`py-2 px-3 rounded-lg text-sm capitalize ${
                        activeCategory === category 
                          ? `${categoryData[category].color}/30` 
                          : 'bg-gray-800/50 hover:bg-gray-700/50'
                      }`}
                      onClick={() => {
                        setActiveCategory(category);
                        setShowMobileFilters(false);
                      }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skills Grid */}
          <motion.div
            className="glass-card p-6 rounded-2xl shadow-xl flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              >
                {visibleSkills.map((skill, index) => (
                  <motion.div
                    key={`${skill.name}-${index}`}
                    className={`relative group bg-gray-800/30 p-4 rounded-xl border border-gray-700 flex flex-col items-center gap-3 transition-all duration-300 cursor-pointer ${
                      categoryData[skill.category].color.replace('bg-gradient-to-r', 'hover:bg-gradient-to-br') + '/20'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)"
                    }}
                    onClick={() => setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)}
                  >
                    <div className="text-4xl p-2">
                      {React.cloneElement(skill.icon, {
                        className: "transition-transform duration-300 group-hover:scale-110"
                      })}
                    </div>
                    <span className="text-sm sm:text-base text-center font-medium text-gray-200">
                      {skill.name}
                    </span>
                    
                    {/* Skill level indicator */}
                    <div className="w-full h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full ${categoryData[skill.category].color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredSkills.length > 12 && (
              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => setExpanded(!expanded)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {expanded ? (
                    <>
                      Show Less
                      <FiChevronUp className="h-5 w-5" />
                    </>
                  ) : (
                    <>
                      Show More
                      <FiChevronDown className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div 
              className={`glass-card max-w-md w-full rounded-2xl overflow-hidden shadow-2xl ${
                categoryData[selectedSkill.category].color.replace('bg-gradient-to-r', 'border-t-8')
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-4xl p-3 rounded-lg ${
                    categoryData[selectedSkill.category].color.replace('bg-gradient-to-r', 'bg-gradient-to-br')
                  }`}>
                    {React.cloneElement(selectedSkill.icon, { size: 32 })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-200">{selectedSkill.name}</h3>
                    <span className="text-sm text-gray-400 capitalize">{selectedSkill.category}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Proficiency</span>
                    <span className="font-medium text-gray-200">{selectedSkill.level}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full ${
                        categoryData[selectedSkill.category].color
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">
                  {selectedSkill.description || "I have extensive experience working with this technology in various projects."}
                </p>
                
                <motion.button
                  className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors duration-300"
                  onClick={() => setSelectedSkill(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;

// Add to your global CSS
const styles = `
  .glass-card {
    background: rgba(30, 30, 40, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(76, 76, 108, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }
`;