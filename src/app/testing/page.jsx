"use client"
import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Theme Context for Dark/Light Mode
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Default to dark mode

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme
const useTheme = () => useContext(ThemeContext);

// --- Components ---

// Dark/Light Mode Toggler
const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle dark/light mode"
    >
      {theme === 'dark' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h1M3 12H2m8.003-9.127a9.003 9.003 0 014.994 0M12 15a3 3 0 100-6 3 3 0 000 6z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </motion.button>
  );
};

// Mouse Tracking Effect
const MouseTracker = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-blue-500 dark:bg-purple-500 opacity-20 blur-xl"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

// Three.js Background Component
const ThreeDBackground = () => {
  const mountRef = useRef(null);
  const { theme } = useTheme(); // Access theme context

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true for transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    // More complex and dynamic object (e.g., Icosahedron with adjusted material)
    const geometry = new THREE.IcosahedronGeometry(2.5, 1); // Larger, more complex geometry
    const material = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x8A2BE2 : 0x007bff, // Dynamic color based on theme (Purple for dark, Blue for light)
      emissive: theme === 'dark' ? 0x4B0082 : 0x003366,
      roughness: 0.4,
      metalness: 0.7,
      flatShading: false, // Smooth shading for a more refined look
      transparent: true,
      opacity: 0.8
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.7); // Stronger ambient light
    scene.add(ambientLight);
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(5, 5, 5).normalize();
    scene.add(directionalLight1);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, -5, -5).normalize();
    scene.add(directionalLight2);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.003; // Slower, smoother rotation
      mesh.rotation.y += 0.003;
      mesh.rotation.z += 0.001; // Add Z rotation
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [theme]); // Rerun effect when theme changes to update material color

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-15" />; // Slightly more opaque
};


// Header Component (Simplified - Navbar removed)
const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md py-4 px-6 md:px-12 flex justify-between items-center rounded-b-xl"
    >
      <div className="text-2xl font-bold text-gray-900 dark:text-white">Utsab Adhikari</div>
      {/* Navigation links removed as per request */}
      <ThemeToggler />
    </motion.header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-gradient-to-br from-gray-100 to-white dark:from-gray-950 dark:to-gray-800"
    >
      <ThreeDBackground />
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight drop-shadow-lg"
      >
        Utsab Adhikari <br /> Your Vision, My Code.
      </motion.h1>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8"
      >
        A passionate BEIT student from Nepal, transforming complex ideas into elegant, high-performance software solutions.
      </motion.p>
      <div className="flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 text-lg md:text-xl"
        >
          Hire Me
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 text-lg md:text-xl dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900"
        >
          Let's Create
        </motion.button>
      </div>
    </section>
  );
};

// Section Template
const Section = ({ id, title, children }) => {
  return (
    <section id={id} className="py-20 px-4 md:px-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12 relative pb-4"
      >
        {title}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
      </motion.h2>
      {children}
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <Section id="about" title="About Utsab">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-3xl mx-auto text-lg leading-relaxed text-center"
      >
        <p className="mb-4">
          Greetings! I'm Utsab Adhikari, a passionate Bachelor of Engineering in Information Technology student from Nepal. My journey into the world of code began with a fascination for how technology shapes our lives, leading me to dive deep into creating impactful digital experiences.
        </p>
        <p className="mb-4">
          With a solid foundation in both front-end and back-end technologies, I thrive on solving complex problems and building robust, scalable applications. From crafting pixel-perfect UIs with React and Next.js to designing efficient databases with MongoDB and orchestrating server-side logic with Node.js and Express, I enjoy every step of the development process.
        </p>
        <p>
          Beyond the code, I'm a perpetual learner, constantly exploring new paradigms, tools, and best practices to push the boundaries of what's possible. My goal is to leverage technology to build solutions that are not just functional, but also intuitive, secure, and delightful to use. Let's connect and build something extraordinary!
        </p>
      </motion.div>
    </Section>
  );
};

// Skills Section
const SkillsSection = () => {
  const skills = [
    { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'text-blue-500' },
    { name: 'Tailwind CSS', icon: 'fas fa-wind', color: 'text-teal-500' },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: 'text-yellow-500' },
    { name: 'React.js', icon: 'fab fa-react', color: 'text-blue-400' },
    { name: 'Next.js', icon: 'fas fa-arrow-right', color: 'text-gray-700 dark:text-white' }, // Using a generic icon for Next.js
    { name: 'Node.js', icon: 'fab fa-node-js', color: 'text-green-500' },
    { name: 'Express.js', icon: 'fas fa-server', color: 'text-gray-600 dark:text-gray-300' }, // Using a generic icon for Express.js
    { name: 'MongoDB', icon: 'fas fa-database', color: 'text-green-600' },
    { name: 'Linux', icon: 'fab fa-linux', color: 'text-gray-800 dark:text-gray-200' },
    { name: 'C', icon: 'fas fa-c', color: 'text-blue-700' }, // Using a generic icon for C
    { name: 'C++', icon: 'fas fa-cuttlefish', color: 'text-blue-800' }, // Using a generic icon for C++
    { name: 'Wireshark', icon: 'fas fa-network-wired', color: 'text-indigo-600' }, // Using a generic icon for Wireshark
  ];

  return (
    <Section id="skills" title="Technical Skills">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <i className={`${skill.icon} ${skill.color} text-5xl mb-4 group-hover:scale-110 transition-transform duration-300`}></i>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{skill.name}</h3>
          </motion.div>
        ))}
      </div>
      {/* Font Awesome CDN for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" xintegrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0V4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    </Section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const projects = [
    {
      title: 'Dynamic E-commerce Platform',
      description: 'A full-stack e-commerce solution with user authentication, product management, shopping cart, and payment integration. Built with React, Node.js, Express, and MongoDB.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      link: '#',
      image: 'https://placehold.co/400x250/007bff/ffffff?text=E-commerce'
    },
    {
      title: 'Real-time Chat Application',
      description: 'A real-time messaging application featuring user presence, group chats, and instant message delivery using WebSockets.',
      tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      link: '#',
      image: 'https://placehold.co/400x250/28a745/ffffff?text=Chat+App'
    },
    {
      title: 'Personal Portfolio v1',
      description: 'The first iteration of my personal portfolio, showcasing my early projects and skills. A testament to continuous learning and improvement.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: '#',
      image: 'https://placehold.co/400x250/ffc107/ffffff?text=Portfolio+v1'
    },
  ];

  return (
    <Section id="projects" title="Showcase Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:brightness-90 transition-all duration-300" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// Blog Section
const BlogSection = () => {
  const blogPosts = [
    {
      title: 'Demystifying JavaScript Closures',
      date: 'July 1, 2025',
      summary: 'A deep dive into JavaScript closures, understanding their power and how to effectively use them in your code.',
      link: '#',
    },
    {
      title: 'Building Responsive Layouts with Tailwind CSS',
      date: 'June 15, 2025',
      summary: 'Tips and tricks for creating highly responsive and maintainable layouts using the utility-first approach of Tailwind CSS.',
      link: '#',
    },
    {
      title: 'Getting Started with MongoDB Aggregation Pipeline',
      date: 'May 28, 2025',
      summary: 'An introductory guide to MongoDB\'s powerful aggregation framework for advanced data processing.',
      link: '#',
    },
  ];

  return (
    <Section id="blog" title="Latest Insights">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{post.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{post.date}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.summary}</p>
            <a
              href={post.link}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Read More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// Latest News Component (New)
const LatestNewsSection = () => {
  const handleViewNews = () => {
    // Simulate routing to a /news page
    window.location.href = '/news';
  };

  return (
    <Section id="latest-news" title="Breaking Developments">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-3xl mx-auto text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-10 rounded-2xl shadow-2xl relative overflow-hidden"
      >
        {/* Abstract background shapes */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="20" cy="20" r="15" fill="currentColor" className="text-purple-400 animate-pulse" />
            <circle cx="80" cy="80" r="20" fill="currentColor" className="text-indigo-400 animate-pulse animation-delay-1000" />
            <rect x="10" y="70" width="10" height="10" fill="currentColor" className="text-purple-300 animate-bounce" />
            <rect x="70" y="10" width="15" height="15" fill="currentColor" className="text-indigo-300 animate-bounce animation-delay-500" />
          </svg>
        </div>

        <div className="relative z-10">
          <h3 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Stay Ahead of the Curve!
          </h3>
          <p className="text-lg md:text-xl mb-8 leading-relaxed">
            Discover the latest breakthroughs in technology, my recent project updates, and insightful articles on software development trends. Always pushing boundaries, always learning.
          </p>
          <motion.button
            onClick={handleViewNews}
            className="px-10 py-4 bg-white text-indigo-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 text-xl md:text-2xl transform hover:scale-105"
            whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            View Latest News
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </Section>
  );
};


// Education Section
const EducationSection = () => {
  return (
    <Section id="education" title="My Academic Journey">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-3xl mx-auto text-lg leading-relaxed text-center"
      >
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
            Bachelor of Engineering in Information Technology (BEIT)
          </h3>
          <p className="text-xl text-blue-600 dark:text-blue-400 mb-1">
            Nepal College of Information Technology (NCIT)
          </p>
          <p className="text-md text-gray-500 dark:text-gray-400 mb-4">
            Affiliated to Pokhara University (PU)
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Currently in my second semester, I am rigorously pursuing my BEIT degree, delving into core computer science concepts, software development methodologies, and cutting-edge technologies. My coursework provides a strong theoretical foundation complemented by practical, hands-on projects.
          </p>
        </div>
      </motion.div>
    </Section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <Section id="contact" title="Get In Touch">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-xl mx-auto text-center"
      >
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Have a project in mind? Want to collaborate? Or just want to say hi? Feel free to reach out!
        </p>
        <div className="space-y-4">
          <a
            href="mailto:utsab.adhikari@example.com" // Placeholder email
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 6h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Email Me
          </a>
          <a
            href="https://linkedin.com/in/utsab-adhikari" // Placeholder LinkedIn
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 text-lg dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            Connect on LinkedIn
          </a>
        </div>
      </motion.div>
    </Section>
  );
};

// Feedback Drawer Component
const FeedbackDrawer = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full md:w-1/3 bg-white dark:bg-gray-800 shadow-2xl z-50 p-6 rounded-l-xl flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Send Feedback</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Close feedback form"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form className="flex flex-col space-y-4 flex-grow">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div className="flex-grow">
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                rows="8"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 resize-y flex-grow"
                placeholder="Share your thoughts..."
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Feedback
            </motion.button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main App Component
const App = () => {
  const [isFeedbackDrawerOpen, setIsFeedbackDrawerOpen] = useState(false);

  const handleChatWithAssistant = () => {
    // Simulate routing to a /chatbot page
    window.location.href = '/chatbot';
  };

  return (
    <ThemeProvider>
      <div className="font-inter antialiased min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative">
        <MouseTracker />
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <BlogSection />
          <LatestNewsSection /> {/* New Latest News Section */}
          <EducationSection />
          <ContactSection />
        </main>

        {/* Report/Feedback Button */}
        <motion.button
          onClick={() => setIsFeedbackDrawerOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-purple-600 text-white rounded-full shadow-xl flex items-center space-x-2 text-lg font-semibold z-30 hover:bg-purple-700 transition-colors duration-300"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <span>Feedback</span>
        </motion.button>

        {/* Chat with Assistant Button (New) */}
        <motion.button
          onClick={handleChatWithAssistant}
          className="fixed bottom-24 right-6 p-4 bg-green-600 text-white rounded-full shadow-xl flex items-center space-x-2 text-lg font-semibold z-30 hover:bg-green-700 transition-colors duration-300"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span>Chat with Assistant</span>
        </motion.button>

        <FeedbackDrawer
          isOpen={isFeedbackDrawerOpen}
          onClose={() => setIsFeedbackDrawerOpen(false)}
        />

        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </div>
    </ThemeProvider>
  );
};

export default App;
