"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Hireme = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
      router.push("/hireme/applications")
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md p-8 rounded-xl border border-indigo-500 shadow-2xl">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-indigo-400 mb-6">
          {formData.category || "Work With Me"} Offer Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white"
        >
              <input
            type="text"
            name="companyName"
            placeholder="Company Name / Your Name"
            value={formData.companyName}
            onChange={handleChange}
            className="p-3 text-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-3 text-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 text-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="p-3 text-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <div className="sm:col-span-2">
            <label className="block text-white mb-1 font-medium">Select Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-slate-800  text-white p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select an option</option>
              <option value="Internship">Internship</option>
              <option value="Job">Job</option>
              <option value="Remote">Remote</option>
              <option value="Part Time">Part Time</option>
            </select>
          </div>

          <input
            type="number"
            name="noOfEmployees"
            placeholder="Number of Employees in your Company"
            value={formData.noOfEmployees}
            onChange={handleChange}
            className="p-3 text-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <div className="sm:col-span-2">
            <textarea
              name="description"
              placeholder="Company Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full text-white p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-1 text-white font-medium">How did you find me?</label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select an option</option>
              <option value="linkedin">LinkedIn</option>
              <option value="github">GitHub</option>
              <option value="facebook">Facebook</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="sm:col-span-2 bg-indigo-600/10 p-4 border-l-4 border-indigo-400 rounded-md">
            <h3 className="text-indigo-300 font-semibold mb-2">
              Why you should hire me?
            </h3>
            <p className="text-gray-300 text-sm">
              I bring a solid foundation in full-stack development, driven by a
              desire for continual growth and excellence. With a proactive
              approach, adaptability to new challenges, and clear communication
              skills, I thrive in collaborative environments.
            </p>
          </div>

          <div className="sm:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition duration-300 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .input-field {
          @apply w-full p-3 bg-white/10 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400;
        }
        .label {
          @apply block mb-1 font-medium text-indigo-300;
        }
      `}</style>
    </motion.div>
  );
};

export default Hireme;
