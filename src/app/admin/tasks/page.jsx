"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";
import CreateContextDrawer from "./CreateContextDrawer";
import { format } from "date-fns";

const Context = () => {
  const [context, setContext] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const toastId = toast.loading("Fetching Context...");
    const getcontext = async () => {
      try {
        const response = await axios.get(`/api/v1/admin/tasks`);
        setContext(response.data.contexts);
        toast.success("Context Loaded Successfully", { id: toastId });
      } catch (error) {
        console.error("Fetching error:", error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getcontext();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex justify-evenly items-center mb-8">
          <h1 className="text-2xl font-bold">
            Context Manager
          </h1>
          <CreateContextDrawer />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <p className="text-2xl text-gray-400 flex items-center gap-3">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Loading...
            </p>
          </div>
        ) : context.length === 0 ? (
          <div className="text-center text-gray-500 text-xl">
            No Context found.
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
            {context.map((ctx) => (
              <div
                key={ctx._id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                {/* Delete Button */}
                <div className="absolute top-4 right-4">
                  {isDeleteLoading === ctx._id ? (
                    <button
                      disabled
                      className="animate-spin text-red-600 cursor-not-allowed"
                    >
                      <AiOutlineLoading3Quarters size={20} />
                    </button>
                  ) : (
                    <button
                      // onClick={() => handleDelete(ctx._id)}
                      className="text-red-600 hover:text-red-500 transition"
                    >
                      <FaRegTrashAlt size={18} />
                    </button>
                  )}
                </div>

                {/* Card Content */}
                <div className="flex flex-col justify-between h-full p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {ctx.context}
                  </h2>

                  <div className="flex justify-between items-center">
                    <div className="text-sm font-semibold text-gray-400">{format(new Date(ctx.createdAt), 'MMM dd, yyyy')}</div>
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
