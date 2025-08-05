import Link from "next/link";
import React from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaEnvelope, FaDiscord } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-900 via-black to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Side */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm font-medium">
            &copy; {new Date().getFullYear()} | Design & Developed by{" "}
            <Link href="https://utsab-ad.vercel.app" className="text-indigo-400 hover:underline cursor-pointer">
              Utsab Adhikari
            </Link>
          </p>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://leetcode.com/u/3RGsW3S1aG"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition"
          >
            
            <SiLeetcode size={18} />
          </a>
          <a
            href="https://discord.gg/Dv3DbBVx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition"
          >
            
            <FaDiscord size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/utsabadhikari"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition"
          >
            <FaLinkedinIn size={18} />
          </a>
          <a
            href="https://github.com/utsab-adhikari"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="mailto:utsabadhikari075@gmail.com"
            className="hover:text-indigo-400 transition"
          >
            <FaEnvelope size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
