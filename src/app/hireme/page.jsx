"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters, AiOutlineClose } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";
import { useSession } from "next-auth/react";

const Hireme = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const { status } = useSession();

  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    email: "",
    category: "",
    contact: "",
    noOfEmployees: "",
    description: "",
    source: "",
  });

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "companyName":
        if (!value.trim()) error = "Company name is required";
        else if (value.length < 3) error = "Name too short (min 3 chars)";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "contact":
        if (!value) error = "Contact is required";
        else if (!/^\d{10,15}$/.test(value))
          error = "Invalid phone number (10-15 digits)";
        break;
      case "noOfEmployees":
        if (!value) error = "Employee count is required";
        else if (parseInt(value) <= 0) error = "Must be positive number";
        break;
      case "description":
        if (!value.trim()) error = "Description is required";
        else if (value.length < 20) error = "Too short (min 20 characters)";
        break;
      case "category":
      case "source":
        if (!value) error = "This field is required";
        break;
      default:
        if (!value.trim()) error = "This field is required";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation after first touch
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix form errors");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/v1/hireme/create", formData);
      toast.success(res.data.message || "Request sent successfully!");

      setFormData({
        companyName: "",
        address: "",
        email: "",
        category: "",
        contact: "",
        noOfEmployees: "",
        description: "",
        source: "",
      });

      // Show success animation before redirect
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Failed to submit form. Please try again later."
      );
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-900 to-black"
    >
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 mb-2"
          >
            {formData.category || "Work With Me"}
          </motion.h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Let's collaborate! Fill out the form and I'll get back to you within
            24 hours
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6 md:p-8 shadow-xl"
        >
          {status === "loading" && (
            <div className="mb-6 p-4 border border-blue-500/30 text-blue-300 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
                <span className="text-sm">
                  Checking authentication status...
                </span>
              </div>
            </div>
          )}

          {status === "unauthenticated" && (
            <div className="mb-6 p-4 border border-orange-500/50 text-orange-300 bg-orange-500/10 rounded-lg flex items-start">
              <FiInfo className="mt-1 mr-2 flex-shrink-0" />
              <div>
                <strong className="font-medium">Authentication Required</strong>
                <p className="text-sm">
                  Please authenticate before submitting. Unauthenticated
                  requests will be discarded.
                </p>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Company Name */}
            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2 font-medium">
                Company Name / Your Name *
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Google Inc. / John Doe"
                value={formData.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                className={`w-full p-3.5 bg-gray-900/70 text-white rounded-xl border ${
                  errors.companyName ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
              />
              {errors.companyName && (
                <p className="text-red-400 text-sm mt-1.5 flex items-center">
                  <FiInfo className="mr-1" /> {errors.companyName}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Address *
              </label>
              <input
                type="text"
                name="address"
                placeholder="123 Main St, City"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                className={`w-full p-3.5 bg-gray-900/70 text-white rounded-xl border ${
                  errors.address ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
              />
              {errors.address && (
                <p className="text-red-400 text-sm mt-1.5 flex items-center">
                  <FiInfo className="mr-1" /> {errors.address}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Email *
              </label>
              <input
                type="email"
                name="email"
                placeholder="contact@company.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                className={`w-full p-3.5 bg-gray-900/70 text-white rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1.5 flex items-center">
                  <FiInfo className="mr-1" /> {errors.email}
                </p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contact"
                placeholder="+1 (555) 123-4567"
                value={formData.contact}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                className={`w-full p-3.5 bg-gray-900/70 text-white rounded-xl border ${
                  errors.contact ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
              />
              {errors.contact && (
                <p className="text-red-400 text-sm mt-1.5 flex items-center">
                  <FiInfo className="mr-1" /> {errors.contact}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Opportunity Type *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                className={`w-full p-3.5 bg-gray-900/70 text-white rounded-xl border ${
                  errors.category ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none`}
              >
                <option value="">Select opportunity type</option>
                <option value="Internship">Internship</option>
                <option value="Job">Full-time Job</option>
                <option value="Remote">Remote Work</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance Project</option>
              </select>
              {errors.category && (
                <p className="text-red-400 text-sm mt-1.5 flex items-center">
                  <FiInfo className="mr-1" /> {errors.category}
                </p>
              )}
            </div>

            {/* Employees */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Number of Employees *
              </label>
              <input
                type="number"
                name="noOfEmployees"
                placeholder="50"
                value={formData.noOfEmployees}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                min="1"
                className={`w-full p-3.5 bg-gray-900/70 text-white rounded-xl border ${
                  errors.noOfEmployees ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
              />
              {errors.noOfEmployees && (
                <p className="text-red-400 text-sm mt-1.5 flex items-center">
                  <FiInfo className="mr-1" /> {errors.noOfEmployees}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2 font-medium">
                Opportunity Description *
              </label>
              <textarea
                name="description"
                placeholder="Describe the role, requirements, and expectations..."
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                rows={5}
                className={`w-full p-3.5 bg-gray-900/70 text-white rounded-xl border ${
                  errors.description ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none`}
              />
              <div className="flex justify-between mt-1">
                {errors.description ? (
                  <p className="text-red-400 text-sm flex items-center">
                    <FiInfo className="mr-1" /> {errors.description}
                  </p>
                ) : (
                  <div />
                )}
                <span
                  className={`text-sm ${
                    formData.description.length < 20
                      ? "text-amber-500"
                      : "text-green-500"
                  }`}
                >
                  {formData.description.length}/500
                </span>
              </div>
            </div>

            {/* Source */}
            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2 font-medium">
                How did you find me? *
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                className={`w-full p-3.5 bg-gray-900/70 text-white rounded-xl border ${
                  errors.source ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none`}
              >
                <option value="">Select referral source</option>
                <option value="linkedin">LinkedIn</option>
                <option value="github">GitHub</option>
                <option value="portfolio">Personal Portfolio</option>
                <option value="twitter">Twitter/X</option>
                <option value="referral">Referral</option>
                <option value="other">Other</option>
              </select>
              {errors.source && (
                <p className="text-red-400 text-sm mt-1.5 flex items-center">
                  <FiInfo className="mr-1" /> {errors.source}
                </p>
              )}
            </div>

            {/* Info Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 bg-indigo-600/20 p-5 rounded-xl border border-indigo-500/30"
            >
              <h3 className="text-indigo-300 font-bold text-lg mb-2 flex items-center">
                <span className="bg-indigo-500/20 p-1.5 rounded-lg mr-3">
                  <FiInfo />
                </span>
                Why hire me?
              </h3>
              <ul className="text-gray-300 text-sm space-y-2 pl-2">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  Full-stack expertise with modern tech stack
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  Proven track record of delivering complex projects
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  Strong problem-solving and communication skills
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  Adaptable learner with passion for new technologies
                </li>
              </ul>
            </motion.div>

            {/* Form Actions */}
            <div className="md:col-span-2 mt-6 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-6 py-3.5 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-all disabled:opacity-50 flex-1 flex items-center justify-center"
              >
                <AiOutlineClose className="mr-2" /> Cancel
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-medium hover:opacity-90 transition-all disabled:opacity-70 flex-1 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Opportunity"
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hireme;
