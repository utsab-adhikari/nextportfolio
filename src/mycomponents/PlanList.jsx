"use client";
import { useState } from "react";
import Link from "next/link";
import { FiEdit, FiTrash2, FiFolder, FiCheckCircle, FiCalendar } from "react-icons/fi";
import { MdOutlineTaskAlt } from "react-icons/md";

export default function PlanList({ plans: initialPlans }) {
  const [plans, setPlans] = useState(initialPlans);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    try {
      const res = await fetch(`/api/plans/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPlans(plans.filter((plan) => plan._id !== id));
      } else {
        const error = await res.json();
        alert(error.error || "Failed to delete plan");
      }
    } catch (error) {
      alert("Network error occurred");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 bg-slate-950">
      {plans.length === 0 && (
        <p className="text-gray-400 text-center text-lg italic mt-8">
          No plans found. Create your first plan to get started!
        </p>
      )}

      {plans.map((plan) => (
        <div
          key={plan._id}
          className="border border-slate-700 p-6 rounded-xl bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300"
        >
          {/* Title Section */}
          <h3 className="text-2xl font-bold text-gray-100 mb-2">
            {plan.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            {plan.description || "No description provided"}
          </p>

          {/* Plan Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-300 text-sm mb-4">
            <p className="flex items-center gap-2">
              <FiFolder className="text-gray-400" />
              <span className="font-medium text-gray-200">Category:</span>{" "}
              {plan.category}
            </p>
            <p className="flex items-center gap-2">
              <FiCheckCircle className="text-gray-400" />
              <span className="font-medium text-gray-200">Status:</span>{" "}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize
                  ${
                    plan.status === "completed"
                      ? "bg-green-900 text-green-200"
                      : plan.status === "started"
                      ? "bg-blue-900 text-blue-200"
                      : "bg-yellow-900 text-yellow-200"
                  }`}
              >
                {plan.status}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FiCalendar className="text-gray-400" />
              <span className="font-medium text-gray-200">Due Date:</span>{" "}
              {plan.lastDate
                ? new Date(plan.lastDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <MdOutlineTaskAlt className="text-gray-400" />
              <span className="font-medium text-gray-200">Tasks:</span>{" "}
              {plan.tasks.length}
            </p>
          </div>

          {/* Task List */}
          {plan.tasks.length > 0 && (
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-200 mb-3">
                Tasks
              </h4>
              <ul className="space-y-2 text-gray-300">
                {plan.tasks.map((task, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      disabled
                      className="h-4 w-4 text-blue-500 rounded border-slate-600 focus:ring-blue-500"
                    />
                    <span
                      className={
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-300"
                      }
                    >
                      {task.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex gap-3">
            <Link
              href={`/plans/${plan._id}`}
              className="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium transition flex items-center gap-2"
            >
              <FiEdit />
              Edit
            </Link>
            <button
              onClick={() => handleDelete(plan._id)}
              className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-800 text-white text-sm font-medium transition flex items-center gap-2"
            >
              <FiTrash2 />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}