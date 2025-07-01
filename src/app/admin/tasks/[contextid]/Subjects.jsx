"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import Link from "next/link";
import CreateSubjectDrawer from "./CreateSubjectDrawer";

const Subject = ({ contextid }) => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      setIsLoading(true);
      const toastId = toast.loading("Fetching Subjects...");
      try {
        const res = await axios.get(`/api/v1/admin/tasks/${contextid}`);
        if (res.data.success) {
          setSubjects(res.data.subject);
          setContext(res.data.contextName);
          toast.success("Subjects loaded successfully", { id: toastId });
        } else {
          toast.error(res.data.message, { id: toastId });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch subjects", { id: toastId });
      } finally {
        setIsLoading(false);
      }
    };

    if (contextid) {
      fetchSubjects();
    }
  }, [contextid]);

  return (
    <div className="min-h-screen mt-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl bg-green-300 pl-2 py-1 pr-10 rounded-r-full font-bold text-indigo-800">{context}</h1>
          <CreateSubjectDrawer contextid={contextid} />
        </div>

        <h2 className="text-center text-lg font-sembold">Subjects</h2>

        {isLoading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <p className="text-3xl text-gray-400 flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Loading...
            </p>
          </div>
        ) : subjects.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No Subjects found for this context.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 px-4">
            {subjects.map((subject) => (
              <div
                key={subject._id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {subject.subject}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {subject.description || "No Description Available"}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    href={`/admin/tasks/${contextid}/${subject._id}`}
                    className="text-sm flex items-center gap-2 bg-slate-300 px-3 py-1 rounded-full border border-indigo-600 hover:bg-slate-200 text-indigo-900"
                  >
                    View <IoMdArrowDropright />
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

export default Subject;
