"use client";
import { useState } from "react";
import Link from "next/link";

export default function PlanList({ plans: initialPlans }) {
  const [plans, setPlans] = useState(initialPlans);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    try {
      const res = await fetch(`/api/plans/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPlans(plans.filter((plan) => plan._id !== id)); // Optimistic UI update
      } else {
        const error = await res.json();
        alert(error.error || "Failed to delete plan");
      }
    } catch (error) {
      alert("Network error occurred");
    }
  };

  return (
    <div className="space-y-6">
      {plans.length === 0 && (
        <p className="text-gray-400 dark:text-gray-500 text-center italic mt-6">
          📭 No plans found. Start by creating one!
        </p>
      )}

      {plans.map((plan) => (
        <div
          key={plan._id}
          className="border border-gray-700 p-5 rounded-2xl bg-gray-900 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Title Section */}
          <h3 className="text-xl font-semibold text-gray-100 mb-1">
            {plan.title}
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            {plan.description || "No description provided"}
          </p>

          {/* Plan Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4 text-gray-300 text-sm mb-3">
            <p>
              <span className="font-medium text-gray-200">📂 Category:</span>{" "}
              {plan.category}
            </p>
            <p>
              <span className="font-medium text-gray-200">📌 Status:</span>{" "}
              <span
                className={`px-2 py-0.5 rounded text-xs capitalize
      ${
        plan.status === "completed"
          ? "bg-green-600 text-white"
          : plan.status === "started"
          ? "bg-blue-600 text-white"
          : "bg-yellow-600 text-black"
      }`}
              >
                {plan.status}
              </span>
            </p>

            <p>
              <span className="font-medium text-gray-200">📅 Last Date:</span>{" "}
              {plan.lastDate
                ? new Date(plan.lastDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-200">✅ Tasks:</span>{" "}
              {plan.tasks.length}
            </p>
          </div>

          {/* Task List */}
          {plan.tasks.length > 0 && (
            <div className="bg-gray-800 p-3 rounded-lg mb-3">
              <h4 className="font-medium text-gray-200 mb-2">📝 Tasks:</h4>
              <ul className="list-disc pl-5 text-gray-400 space-y-1">
                {plan.tasks.map((task, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      disabled
                      className="h-4 w-4 accent-green-500"
                    />
                    <span
                      className={
                        task.completed
                          ? "line-through text-gray-600"
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
              className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={() => handleDelete(plan._id)}
              className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
