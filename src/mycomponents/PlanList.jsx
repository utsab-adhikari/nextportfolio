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
    <div className="space-y-4">
      {plans.length === 0 && (
        <p className="text-gray-400 dark:text-gray-500">No plans found.</p>
      )}
      {plans.map((plan) => (
        <div
          key={plan._id}
          className="border border-gray-700 p-4 rounded bg-gray-900 shadow-sm dark:border-gray-700"
        >
          <h3 className="text-lg font-bold text-gray-100">{plan.title}</h3>
          <p className="text-gray-400">
            {plan.description || "No description"}
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-gray-300">
            <p>
              <span className="font-medium text-gray-200">Category:</span>{" "}
              {plan.category}
            </p>
            <p>
              <span className="font-medium text-gray-200">Status:</span>{" "}
              {plan.status}
            </p>
            <p>
              <span className="font-medium text-gray-200">Last Date:</span>{" "}
              {plan.lastDate
                ? new Date(plan.lastDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-200">Tasks:</span>{" "}
              {plan.tasks.length}
            </p>
          </div>
          {plan.tasks.length > 0 && (
            <div className="mt-2">
              <h4 className="font-medium text-gray-200">Tasks:</h4>
              <ul className="list-disc pl-5 text-gray-400">
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
          <div className="mt-4 flex gap-4">
            <Link
              href={`/plans/${plan._id}`}
              className="text-blue-400 hover:text-blue-300 hover:underline"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(plan._id)}
              className="text-red-400 hover:text-red-300 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
