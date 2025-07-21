"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {useSession} from "next-auth/react"

const AdminHiremePage = () => {
  const {status} = useSession();
  console.log(status);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const toastId = toast.loading("Fetching Applications...");

    const getApp = async () => {
      try {
        const res = await axios.get(`/api/v1/hireme`);
        setApplications(res.data.apps);
        toast.success("Applications loaded successfully", { id: toastId });
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error(error.message || "Error loading applications");
      } finally {
        setIsLoading(false);
      }
    };

    getApp();
  }, []);

  const handleAccept = async (id) => {
    setActionLoading(id + "_accept");
    try {
      const res = await axios.put(`/api/v1/hireme/accept/${id}`);
      toast.success(res.data.message || "Application accepted");
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, isAccepted: true } : app
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Error accepting application");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    setActionLoading(id + "_delete");
    try {
      const res = await axios.delete(`/api/v1/hireme/delete/${id}`);
      toast.success(res.data.message || "Application deleted");
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting application");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">
        Hire Me Applications
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-gray-400" />
        </div>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-400">No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-lg p-5 shadow-md hover:shadow-lg transition-all"
            >
              <div className="mb-2">
                <span className="font-semibold text-indigo-300">Company:</span> {app.companyName}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-indigo-300">Email:</span> {app.email}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-indigo-300">Contact:</span> {app.contact}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-indigo-300">Category:</span> {app.category}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-indigo-300">Employees:</span> {app.noOfEmployees}
              </div>
              <div className="mb-4">
                <span className="font-semibold text-indigo-300">Source:</span> {app.source}
              </div>
              <p className="text-gray-400 mb-4">
                <span className="font-semibold text-indigo-300">Description:</span><br />
                {app.description}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleAccept(app._id)}
                  disabled={actionLoading === app._id + "_accept" || app.isAccepted}
                  className={`px-4 py-2 rounded text-white font-medium transition duration-200 ${
                    app.isAccepted
                      ? "bg-green-700 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-500"
                  }`}
                >
                  {actionLoading === app._id + "_accept" ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : app.isAccepted ? (
                    "Accepted"
                  ) : (
                    <>
                      <FaCheckCircle className="inline mr-1" /> Accept
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(app._id)}
                  disabled={actionLoading === app._id + "_delete"}
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-medium transition duration-200"
                >
                  {actionLoading === app._id + "_delete" ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    <>
                      <FaTrash className="inline mr-1" /> Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHiremePage;
