import React, { useRef } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import { FaWhatsapp, FaLinkedin, FaDiscord } from "react-icons/fa";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: (index) => (index % 2 === 0 ? -50 : 50) },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
    transition: { duration: 0.3 },
  },
};

const inputVariants = {
  focus: {
    scale: 1.02,
    borderColor: "rgba(99, 102, 241, 0.8)",
    boxShadow: "0 0 8px rgba(99, 102, 241, 0.4)",
    transition: { duration: 0.2 },
  },
  blur: {
    scale: 1,
    borderColor: "rgba(55, 65, 81, 0.7)",
    boxShadow: "none",
    transition: { duration: 0.2 },
  },
};

export default function ContactSection() {
  const contactRef = useRef(null);

  return (
    <section
      id="contact"
      ref={contactRef}
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center"
    >
      <motion.div
        className="max-w-7xl mx-auto w-full"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
            Have a project in mind or want to discuss opportunities? Reach out
            and let's create something amazing together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <motion.div
            variants={cardVariants}
            custom={0}
            whileHover="hover"
            className="bg-gray-800/30 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-indigo-700/30"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-indigo-200">
              Contact Information
            </h3>

            <div className="space-y-6">
              {[
                {
                  icon: <HiOutlineMail className="text-white w-6 h-6" />,
                  label: "Email",
                  value: "utsabadhikari075@gmail.com",
                  href: "mailto:utsabadhikari075@gmail.com",
                },
                {
                  icon: <FaWhatsapp className="text-white w-6 h-6" />,
                  label: "WhatsApp",
                  value: "+977 9867508725",
                  href: "https://wa.me/9867508725",
                },
                {
                  icon: <FaLinkedin className="text-white w-6 h-6" />,
                  label: "LinkedIn",
                  value: "Connect with me",
                  href: "https://www.linkedin.com/in/utsabadhikari",
                },
                {
                  icon: <FaDiscord className="w-6 h-6" />,
                  label: "Discord",
                  value: "Connect with me",
                  url: "https://discord.gg/Dv3DbBVx",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-indigo-600/80 p-3 rounded-lg mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200">{item.label}</h4>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-300 hover:text-indigo-200 transition-colors duration-200"
                    >
                      {item.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            custom={1}
            whileHover="hover"
            className="bg-gray-800/30 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-indigo-700/30"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-indigo-200">
              Send a Message
            </h3>

            <form className="space-y-5">
              {[
                {
                  id: "name",
                  label: "Your Name",
                  type: "text",
                  placeholder: "Enter your name",
                },
                {
                  id: "email",
                  label: "Your Email",
                  type: "email",
                  placeholder: "Enter your email",
                },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-gray-200 mb-2 text-sm font-medium"
                  >
                    {field.label}
                  </label>
                  <motion.input
                    type={field.type}
                    id={field.id}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none"
                    placeholder={field.placeholder}
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-200 mb-2 text-sm font-medium"
                >
                  Message
                </label>
                <motion.textarea
                  id="message"
                  rows="4"
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none"
                  placeholder="Your message here..."
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
