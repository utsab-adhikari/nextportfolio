"use client";
import Link from "next/link";
import React from "react";
import Education from "@/mycomponents/Education";
import Skills from "@/mycomponents/Skills";

const Home = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-indigo-700 leading-tight mb-6">
            Hi, I'm Utsab 👋
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
            A passionate IT student from Nepal 🇳🇵
            <br className="hidden sm:block" />
            Specialized in backend development, APIs, databases, and practical
            problem-solving.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-start justify-center items-center gap-4">
            <Link
              href="/hireme"
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold rounded-lg shadow-md transition duration-300"
            >
              🚀 Hire Me
            </Link>
            <a
              href="#contact"
              className="w-full sm:w-auto px-6 py-3 border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white text-base font-semibold rounded-lg shadow-md transition duration-300"
            >
              🎯 Contact Me
            </a>
          </div>
        </div>

        {/* Profile Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="https://github.com/shadcn.png"
            alt="Utsab's Profile"
            className="w-72 h-72 rounded-full object-cover border-4 border-indigo-300 shadow-xl transition duration-300 hover:scale-105"
          />
        </div>
      </section>

      <section id="about" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          About Me
        </h2>
        <p className="text-center text-lg text-gray-600 leading-relaxed">
          I'm a Bachelor of Engineering student in Information Technology from
          Nepal 🇳🇵.
          <br />
          I am deeply passionate about backend development, API design,
          authentication systems, and database management.
          <br />
          My focus is on building scalable, real-world applications that solve
          practical problems.
        </p>
      </section>

    <Skills/>
     
      <section id="interests" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          🎯 Interests
        </h2>
        <p className="text-center text-lg text-gray-600 leading-relaxed mb-6">
          I enjoy backend development, cloud deployment, and building efficient
          APIs.
          <br />
          Besides coding, I'm interested in open-source contributions, learning
          new technologies, and exploring AI tools.
        </p>
      </section>

      <Education/>


      <section
        id="contact"
        className="max-w-5xl mx-auto px-6 py-16 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">📞 Contact Me</h2>
        <p className="text-lg text-gray-600 mb-8">
          I'm open to freelance work, collaborations, or just a friendly chat.
          <br />
          Reach out to me anytime!
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="mailto:utasb1adhikari@gmail.com"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition"
          >
            ✉️ Email Me
          </a>
          <a
            href="https://github.com/utsab-adhikari"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-lg shadow transition"
          >
            🌟 GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-lg shadow transition"
          >
            🔗 LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
