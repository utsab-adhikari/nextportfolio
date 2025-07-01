"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CreateTopicDrawer from "./CreateTopicDrawer";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import CountdownTimer from "./CountDown";

const Topics = ({ contextid, subjectid }) => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true);
      const toastId = toast.loading("Fetching Topics...");
      try {
        const res = await axios.get(
          `/api/v1/admin/tasks/${contextid}/${subjectid}`
        );
        if (res.data.success) {
          setTopics(res.data.topics);
          setSubject(res.data.subjectName);
          toast.success("Topics loaded successfully", { id: toastId });
        } else {
          toast.error(res.data.message, { id: toastId });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch topics", { id: toastId });
      } finally {
        setIsLoading(false);
      }
    };

    if (subjectid) {
      fetchTopics();
    }
  }, [subjectid]);

  return (
    <div className="min-h-screen m-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-evenly items-center mb-6">
          <Badge variant="destructive" className="bg-green-600 font-semibold">
            {subject}
          </Badge>
          <h2 className="text-center text-lg font-sembold">Topics</h2>

          <CreateTopicDrawer contextid={contextid} subjectid={subjectid} />
        </div>

        {isLoading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <p className="text-3xl text-gray-400 flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Loading...
            </p>
          </div>
        ) : topics.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No Topics found for this context.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 ">
            {topics.map((topic) => (
              <div
                key={topic._id}
                className="w-full bg-indigo-200 rounded border-1 px-2 py-1 transition-shadow duration-300 flex "
              >
                <div className="w-full flex items-center gap-3 justify-between">
                  <p className="font-semibold text-gray-800">{topic.title}</p>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {topic.description || "No Description Available"}
                  </p>
                  <div className="flex items-center gap-1 h-full">
                    <Checkbox
                      checked={topic.done}
                      className="border-2 border-indigo-600 bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4"></div>
              </div>
            ))}
          </div>
        )}
      </div>
       <div className="w-full my-2"> 
          <CountdownTimer />
        </div>
    </div>
  );
};

export default Topics;
