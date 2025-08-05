"use client";
import { useState, useRef } from "react";
import Head from "next/head";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function ResumePage() {
  const resumeRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);

    try {
      // Create a backup of the current scroll position
      const originalScrollPosition = window.scrollY;
      
      // Scroll to top to ensure entire content is captured
      window.scrollTo(0, 0);
      
      // Add a class to optimize for PDF rendering
      resumeRef.current.classList.add("pdf-rendering");
      
      // Capture the resume area with higher scale for better quality
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        ignoreElements: (element) => {
          // Ignore links and buttons in PDF to keep it clean
          return element.tagName === 'A' || element.tagName === 'BUTTON';
        }
      });
      
      // Remove optimization class
      resumeRef.current.classList.remove("pdf-rendering");
      
      // Restore scroll position
      window.scrollTo(0, originalScrollPosition);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate the aspect ratio and PDF height
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      let contentWidth = pdfWidth;
      let contentHeight = pdfWidth / ratio;
      
      // Add first page
      pdf.addImage(imgData, "PNG", 0, 0, contentWidth, contentHeight, undefined, "FAST");
      
      // Add additional pages if content is taller than one page
      let position = 0;
      let heightLeft = contentHeight;
      
      // Account for the first page already added
      heightLeft -= pdfHeight;
      
      // Add pages as needed
      while (heightLeft > 0) {
        position = heightLeft - contentHeight;
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          0,
          position,
          contentWidth,
          contentHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pdfHeight;
      }

      pdf.save("Utsab_Adhikari_Resume.pdf");
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("❌ Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 py-8 px-4 sm:px-6">
      <Head>
        <title>Utsab Adhikari - Resume</title>
        <meta
          name="description"
          content="Professional resume of Utsab Adhikari"
        />
      </Head>

      <div className="max-w-4xl mx-auto">
        {/* Title + Download */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Professional Resume
            </h1>
            <p className="text-blue-300 mt-2">
              Designed for both digital viewing and PDF export
            </p>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 group"
          >
            {isDownloading ? (
              <div className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating PDF...
              </div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>

        {/* Resume Content */}
        <div
          ref={resumeRef}
          className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl w-32 h-32 md:mr-8 mb-6 md:mb-0 flex items-center justify-center text-white text-5xl font-bold border-4 border-white/30 shadow-lg">
                UA
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Utsab Adhikari
                </h1>
                <p className="text-blue-100 mt-2 text-xl">
                  Aspiring Web & AI Developer
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>utsabadhikari075@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <span>9867508725</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    <span>utsab.vercel.app</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>/in/utsabadhikari</span>
                  </div>
                  <div className="flex items-center sm:col-span-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>github.com/utsab-adhikari</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2">
                {/* Summary */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 pb-2 border-b-2 border-blue-500 inline-block">
                    Summary
                  </h2>
                  <p className="text-gray-600">
                    Passionate BEIT student at NCIT (Pokhara University) &
                    aspiring backend/web developer, currently exploring
                    LangChain and Hugging Face for AI integration. Experienced
                    in MERN stack and focused on building scalable,
                    production-ready solutions.
                  </p>
                </section>

                {/* Projects */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500 inline-block">
                    Projects
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Blog App */}
                    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-blue-50">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <span className="bg-blue-100 text-blue-800 rounded-lg p-1 mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <a
                          href="https://blog-utsab.vercel.app"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Blog App
                        </a>
                      </h3>
                      <p className="text-gray-600 mt-2 text-sm">
                        A fully functional blogging platform where users can
                        read, write, and manage posts. Features include
                        authentication, comment sections, and a clean,
                        responsive design.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "Next.js",
                          "Express.js",
                          "MongoDB",
                          "Tailwind CSS",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Manager */}
                    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-blue-50">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <span className="bg-blue-100 text-blue-800 rounded-lg p-1 mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <a
                          href="https://project-manager-by-utsab.vercel.app"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Project Manager
                        </a>
                      </h3>
                      <p className="text-gray-600 mt-2 text-sm">
                        A task & project management tool designed for teams and
                        individuals to organize work efficiently. Includes task
                        assignment, deadlines, and a minimal UI.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["React", "Node.js", "MongoDB", "Framer Motion"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-blue-50 sm:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <span className="bg-blue-100 text-blue-800 rounded-lg p-1 mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <a
                          href="https://image-family.vercel.app"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Image Gallery
                        </a>
                      </h3>
                      <p className="text-gray-600 mt-2 text-sm">
                        A family-oriented online gallery for securely storing,
                        sharing, and organizing images. Designed with a focus on
                        privacy and a smooth browsing experience.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["Next.js", "Cloudinary", "Tailwind CSS"].map((tech) => (
                          <span
                            key={tech}
                            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div>
                {/* Skills */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500 inline-block">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "JavaScript (ES6+)",
                      "MERN Stack",
                      "Express.js",
                      "MongoDB",
                      "Next.js",
                      "LangChain",
                      "Hugging Face",
                      "AI Integration",
                      "Git & GitHub",
                      "REST APIs",
                      "Node.js",
                      "Tailwind CSS",
                      "Responsive Design",
                      "Problem Solving",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500 inline-block">
                    Education
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-white to-blue-50 p-4 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Bachelor of Engineering in IT
                      </h3>
                      <p className="text-blue-600 font-medium">
                        Nepal College of Information Technology (NCIT)
                      </p>
                      <p className="text-gray-600">
                        Pokhara University • 2024 - Present
                      </p>
                      <p className="mt-2 text-gray-600 text-sm">
                        Focused on software engineering, web technologies, and AI integration.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-white to-blue-50 p-4 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800">
                        +2 Science
                      </h3>
                      <p className="text-blue-600 font-medium">
                        Gyanodaya Secondary School
                      </p>
                      <p className="text-gray-600">2021 - 2023</p>
                      <p className="mt-2 text-gray-600 text-sm">
                        Graduated with distinction in Computer Science and Mathematics.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200 p-4 text-center text-gray-600 text-sm">
            <p>Last updated: August 2025 • Built with Next.js & Tailwind CSS</p>
          </div>
        </div>
      </div>
    </div>
  );
}