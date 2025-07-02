"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import Link from "next/link";
import CreateSubjectDrawer from "./CreateSubjectDrawer";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import DateTimePicker from "@/mycomponents/DateTimePicker";

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
          setContext(res.data.contextName);
          toast.error(res.data.message || "Error loading subjects", {
            id: toastId,
          });
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <Badge className="bg-green-600 text-white">{context}</Badge>
            )}
            <h2 className="text-2xl font-bold text-slate-800">Subjects</h2>
          </div>
          <CreateSubjectDrawer contextid={contextid} refresh={() => {}} />
        </div>

        <DateTimePicker id={contextid}/>

        {/* Loading */}
        {isLoading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <p className="text-2xl text-gray-400 flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Loading...
            </p>
          </div>
        ) : subjects.length === 0 ? (
          <div className="h-[50vh] flex flex-col justify-center items-center text-center">
            <p className="text-xl text-gray-500">
              No Subjects found for this context.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {subjects.map((subject) => (
              <div
                key={subject._id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-shadow duration-300 p-6 flex flex-col"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2 break-words">
                    {subject.subject}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {subject.description || "No Description Available"}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm font-medium text-gray-400">
                    {format(new Date(subject.createdAt), "MMM dd, yyyy")}
                  </div>
                  <Link
                    href={`/admin/tasks/${contextid}/${subject._id}`}
                    className="flex items-center gap-2 bg-indigo-50 text-indigo-700 border border-indigo-600 px-4 py-2 rounded-full text-sm hover:bg-indigo-100 transition"
                  >
                    View
                    <IoMdArrowDropright size={16} />
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
