"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaTrash,
  FaUserShield,
  FaSearch,
  FaFilter,
  FaSort,
} from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const AdminHiremePage = () => {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { status, data: session } = useSession();
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    sort: "newest",
  });

  // Check admin status
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
          setIsAdmin(true);
        // if (session?.user?.role === "admin") {
        // }
      } catch (error) {
        console.error("Admin check failed:", error);
        toast.error("Unauthorized access");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [router]);

  // Fetch applications
  useEffect(() => {
    if (!isAdmin) return;

    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/v1/hireme`);
        setApplications(res.data.apps);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error(error.message || "Error loading applications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [isAdmin]);

  // Filter and sort applications
  const filteredApplications = applications
    .filter((app) => {
      const matchesSearch =
        app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.contact.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filters.category === "all" || app.category === filters.category;

      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "accepted" ? app.isAccepted : !app.isAccepted);

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (filters.sort === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  const handleAccept = async (id) => {
    setActionLoading(id + "_accept");
    try {
      const res = await axios.put(`/api/v1/hireme/accept/${id}`);
      toast.success(res.data.message || "Application accepted");
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, isAccepted: true } : app))
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error accepting application"
      );
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
      toast.error(
        error.response?.data?.message || "Error deleting application"
      );
    } finally {
      setActionLoading(null);
    }
  };

  if (!isAdmin && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-8 text-center">
          <div className="bg-red-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <FaUserShield className="text-red-400 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Unauthorized Access
          </h2>
          <p className="text-gray-300 mb-6">
            You don't have permission to view this page. Only administrators can
            access this content.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors duration-300"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Get unique categories for filter dropdown
  const categories = [
    "all",
    ...new Set(applications.map((app) => app.category)),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-400 flex items-center gap-3">
              <FaUserShield className="text-indigo-400" />
              HireMe Applications
            </h1>
            <p className="text-gray-400 mt-2">
              Manage all job/internship applications
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800/70 border border-gray-700 rounded-lg text-white w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="pl-10 pr-8 py-2 bg-gray-800/70 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Categories</option>
                {categories
                  .filter((cat) => cat !== "all")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="pl-10 pr-8 py-2 bg-gray-800/70 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="accepted">Accepted</option>
                <option value="pending">Pending</option>
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    filters.status === "accepted"
                      ? "bg-green-500"
                      : filters.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                ></div>
              </div>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters({ ...filters, sort: e.target.value })
                }
                className="pl-10 pr-8 py-2 bg-gray-800/70 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-indigo-500 mb-4" />
            <p className="text-gray-400">Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-xl p-10 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No applications found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {applications.length === 0
                ? "There are no applications yet."
                : "No applications match your current filters."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredApplications.map((app) => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`bg-gray-800/60 backdrop-blur-lg border rounded-xl p-5 shadow-lg hover:shadow-xl transition-all relative overflow-hidden ${
                  app.isAccepted ? "border-green-500/30" : "border-gray-700"
                }`}
              >
                {app.isAccepted && (
                  <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Accepted
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white truncate max-w-[200px]">
                      {app.companyName}
                    </h2>
                    <div className="text-indigo-400 text-sm mt-1">
                      {app.category}
                    </div>
                  </div>
                  <div className="bg-gray-700 text-xs px-2 py-1 rounded">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-700 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <a
                      href={`mailto:${app.email}`}
                      className="text-gray-300 hover:text-indigo-400 transition-colors truncate max-w-[200px]"
                    >
                      {app.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-700 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <a
                      href={`tel:${app.contact}`}
                      className="text-gray-300 hover:text-indigo-400 transition-colors"
                    >
                      {app.contact}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-700 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300 truncate max-w-[200px]">
                      {app.address || "Not provided"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-700 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">
                      {app.noOfEmployees} employees
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-700 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">
                      Found via: {app.source}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h3 className="text-sm font-semibold text-indigo-300 mb-2">
                    Description:
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3">
                    {app.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => handleAccept(app._id)}
                    disabled={
                      actionLoading === app._id + "_accept" || app.isAccepted
                    }
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-all ${
                      app.isAccepted
                        ? "bg-green-800/50 text-green-300 cursor-not-allowed"
                        : "bg-green-700/70 hover:bg-green-600 text-white"
                    }`}
                  >
                    {actionLoading === app._id + "_accept" ? (
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    ) : app.isAccepted ? (
                      <>
                        <FaCheckCircle className="text-green-400" /> Accepted
                      </>
                    ) : (
                      <>
                        <FaCheckCircle /> Accept
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(app._id)}
                    disabled={actionLoading === app._id + "_delete"}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-700/70 hover:bg-red-600 text-white rounded-lg font-medium transition-all"
                  >
                    {actionLoading === app._id + "_delete" ? (
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    ) : (
                      <>
                        <FaTrash /> Delete
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filteredApplications.length > 0 && (
          <div className="mt-8 text-center text-gray-500 text-sm">
            Showing {filteredApplications.length} of {applications.length}{" "}
            applications
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHiremePage;
