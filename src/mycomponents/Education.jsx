import Link from "next/link";
import React from "react";

const Education = () => {
  return (
    <section id="education" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-between bg-white/5 backdrop-blur-md shadow-md p-8">
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl text-left font-semibold text-white mb-4">
              BEIT
            </h3>
            <ul className="text-gray-300 text-left space-y-2 text-base">
              <li>
                <span className="font-medium font-semibold text-gray-400">
                  Level:
                </span>{" "}
                Undergraduate
              </li>
              <li>
                <span className="font-medium font-semibold text-gray-400">
                  Started At:
                </span>{" "}
                2024 onwards
              </li>
              <li>
                <span className="font-medium font-semibold text-gray-400">
                  Current:
                </span>{" "}
                2nd Semester
              </li>
              <li>
                <span className="font-medium font-semibold text-gray-400">
                  Course:
                </span>{" "}
                <b>Bachelor of Engineering in Information Technology</b>
              </li>
            </ul>
          </div>
          <p className="border-r-2 border-gray-400 h-40 hidden md:block "></p>
          <p className="border-t-2 border-gray-400 px-5 w-full md:hidden block "></p>
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start gap-4 cursor-pointer">
              <img
                src="https://ncit.edu.np/images/logo.png"
                alt="NCIT Logo"
                className=" h-auto bg-white/70 rounded p-3 object-contain"
              />
              <Link
                href="https://ncit.edu.np"
                target="_blank"
                rel="noopener noreferrer"
                className=" mx-auto inline-block text-blue-600 hover:text-blue-800 underline transition duration-200"
              >
                Visit Official Site ↗
              </Link>
              <h2 className="text-xl font-semibold text-center mx-auto">
                Innovations on the Front Lines
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
