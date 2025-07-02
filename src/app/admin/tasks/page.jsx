"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";
import { format } from "date-fns";
import CreateContextDrawer from "./CreateContextDrawer";

const Context = () => {
  const [context, setContext] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(null);

  // Fetch Context on mount
  useEffect(() => {
    fetchContext();
  }, []);

  const fetchContext = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Fetching Context...");

    try {
      const response = await axios.get("/api/v1/admin/tasks");
      setContext(response.data.contexts || []);
      toast.success("Context Loaded Successfully", { id: toastId });
    } catch (error) {
      console.error("Error fetching context:", error);
      toast.error("Failed to fetch context", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this context?"
    );
    if (!confirm) return;

    setIsDeleteLoading(id);
    const toastId = toast.loading("Deleting...");

    try {
      await axios.delete(`/api/v1/admin/tasks/${id}/delete`);
      toast.success("Deleted successfully", { id: toastId });

      setContext((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete", { id: toastId });
    } finally {
      setIsDeleteLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-800">Task Manager</h1>
          <CreateContextDrawer refresh={fetchContext} />
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <p className="text-2xl text-gray-400 flex items-center gap-3">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Loading...
            </p>
          </div>
        ) : context.length === 0 ? (
          <div className="h-[50vh] flex items-center justify-center">
            <p className="text-xl text-gray-500">No Context Found.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {context.map((ctx) => (
              <div
                key={ctx._id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(ctx._id)}
                  disabled={isDeleteLoading === ctx._id}
                  className={`absolute top-4 right-4 ${
                    isDeleteLoading === ctx._id
                      ? "text-red-400 cursor-not-allowed"
                      : "text-red-600 hover:text-red-500"
                  }`}
                >
                  {isDeleteLoading === ctx._id ? (
                    <AiOutlineLoading3Quarters
                      className="animate-spin"
                      size={20}
                    />
                  ) : (
                    <FaRegTrashAlt size={18} />
                  )}
                </button>

                {/* Card Content */}
                <div className="flex flex-col justify-between h-full p-6">
                  <h2 className="text-2xl font-semibold text-slate-800 mb-4 break-words">
                    {ctx.context}
                  </h2>

                  <div className="flex justify-between items-center">
                    <div className="text-sm font-semibold text-gray-400">
                      {format(new Date(ctx.createdAt), "MMM dd, yyyy")}
                    </div>

                    <Link
                      href={`/admin/tasks/${ctx._id}`}
                      className="flex items-center gap-2 text-sm bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-full border border-indigo-600 transition"
                    >
                      View <IoMdArrowDropright size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Context;
