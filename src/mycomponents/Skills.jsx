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

const skillsList = [
  { name: "HTML", icon: <FaHtml5 size={28} color="#E34F26" /> },
  { name: "CSS", icon: <FaCss3Alt size={28} color="#1572B6" /> },
  { name: "JavaScript", icon: <SiJavascript size={28} color="#f7df1e" /> },
  { name: "Node.js", icon: <SiNodedotjs size={28} color="#3c873a" /> },
  { name: "Express.js", icon: <SiExpress size={28} /> },
  { name: "Next.js", icon: <SiNextdotjs size={28} /> },
  { name: "React.js", icon: <SiReact size={28} color="#61dafb" /> },
  { name: "MongoDB", icon: <SiMongodb size={28} color="#4db33d" /> },
  { name: "MySQL", icon: <SiMysql size={28} color="#00758f" /> },
  { name: "RESTful APIs", icon: <FaDatabase size={28} color="#6366f1" /> },
  { name: "Authentication", icon: <FaDatabase size={28} color="#6366f1" /> },
  { name: "Git & GitHub", icon: <SiGithub size={28} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={28} color="#38bdf8" /> },
  { name: "Wireshark", icon: <SiWireshark size={28} color="#1679be" /> },
  { name: "Linux", icon: <SiLinux size={28} color="#fcc624" /> },
  { name: "Chatbots", icon: <SiOpenai size={28} color="#00a67e" /> },
  { name: "C (Foundation)", icon: <SiC size={28} color="#00599C" /> },
  { name: "C++ (Foundation)", icon: <SiCplusplus size={28} color="#00599C" /> },
  { name: "Docker (Basics)", icon: <SiDocker size={28} color="#0db7ed" /> },
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 px-4 bg-slate-950 text-slate-100">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">Technical Skills</h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Here's a snapshot of technologies, tools, and languages I've worked with across full-stack development and systems.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skillsList.map((skill) => (
          <div
            key={skill.name}
            className="bg-slate-800 hover:bg-slate-700 transition-colors duration-300 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg"
          >
            <div className="mb-2">{skill.icon}</div>
            <p className="text-sm font-medium">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
