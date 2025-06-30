"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import CreateContextDrawer from "./CreateContextDrawer";
;

const Context = () => {
  const [context, setContext] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(null);
  const [selectedContext, setSelectedContext] = useState([]);

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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-800">Context</h1>
          <CreateContextDrawer />
        </div>

        {isLoading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <p className="text-3xl text-gray-400 flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Loading...
            </p>
          </div>
        ) : context.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No Context found.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {context.map((context) => (
              <div
                key={context._id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
              >
                <div className="absolute top-2 right-2">
                  {isDeleteLoading === context._id ? (
                    <button
                      disabled
                      className="font-bold animate-spin text-red-600 cursor-not-allowed"
                    >
                      <AiOutlineLoading3Quarters size={20} />
                    </button>
                  ) : (
                    <button
                      // onClick={() => handleDelete(context._id)}
                      className="font-bold text-red-700 hover:text-red-500 transition"
                    >
                      <FaRegTrashAlt size={18} />
                    </button>
                  )}
                </div>

                <div className="flex-1 mt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {context.context}
                  </h2>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <Link className=" text-sm flex items-center gap-2 bg-slate-300 px-3 py-1 rounded-full border border-indigo-600 hover:bg-slate-200 text-indigo-900" 
                  href={`/admin/context/details/${context._id}`}>
                    view <IoMdArrowDropright/>
                  </Link>
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
