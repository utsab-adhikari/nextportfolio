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
  { name: "Html", icon: <FaHtml5 size={24} color="#E34F26" /> },
  { name: "Css", icon: <FaCss3Alt size={24} color="#1572B6" /> },
  { name: "JavaScript", icon: <SiJavascript size={24} color="#f7df1e" /> },
  { name: "Node.js", icon: <SiNodedotjs size={24} color="#3c873a" /> },
  { name: "Express.js", icon: <SiExpress size={24} /> },
  { name: "Next.js", icon: <SiNextdotjs size={24} /> },
  { name: "React.js", icon: <SiReact size={24} color="#61dafb" /> },
  { name: "MongoDB", icon: <SiMongodb size={24} color="#4db33d" /> },
  { name: "MySQL", icon: <SiMysql size={24} color="#00758f" /> },
  { name: "RESTful APIs", icon: <FaDatabase size={24} color="#6366f1" /> },
  { name: "Authentication", icon: <FaDatabase size={24} color="#6366f1" /> },
  { name: "Git & GitHub", icon: <SiGithub size={24} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={24} color="#38bdf8" /> },
  { name: "Wireshark", icon: <SiWireshark size={24} color="#1679be" /> },
  { name: "Linux", icon: <SiLinux size={24} color="#fcc624" /> },
  { name: "Chatbots", icon: <SiOpenai size={24} color="#00a67e" /> },
  { name: "C (Foundation)", icon: <SiC size={24} color="#00599C" /> },
  { name: "C++ (Foundation)", icon: <SiCplusplus size={24} color="#00599C" /> },
  { name: "Docker (Basics)", icon: <SiDocker size={24} color="#0db7ed" /> },
];

const Skills = () => {
  return (
    <section id="skills" className="">
      <div className="max-w-4xl mx-auto">
        <div className="h-33 overflow-y-auto p-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {skillsList.map((skill) => (
              <div
                key={skill.name}
                className="bg-gray-100/10 p-3 rounded-lg shadow-sm hover:shadow-md flex items-center gap-3 transition"
              >
                {skill.icon}
                <span className="text-sm sm:text-base">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
