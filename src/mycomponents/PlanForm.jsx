"use client";

import { useState } from "react";
import TextEditor from "./TextEditor";
import { useRouter } from "next/navigation";

export default function PlanForm({ initialData = {} }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    progress: initialData.progress || "",
    category: initialData.category || "Day",
    status: initialData.status || "pending",
    lastDate: initialData.lastDate
      ? new Date(initialData.lastDate).toISOString().split("T")[0]
      : "",
    tasks: initialData.tasks || [],
  });

  const [newTask, setNewTask] = useState({ name: "", notes: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.title || !formData.category) {
      setError("Title and category are required");
      return;
    }

    const method = initialData._id ? "PUT" : "POST";
    const url = initialData._id ? `/api/plans/${initialData._id}` : "/api/plans";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        router.push("/plans");
      } else {
        setError(result.error || "Failed to save plan");
      }
    } catch (error) {
      setError("Network error occurred");
    }
  };

  const addTask = () => {
    if (!newTask.name.trim()) {
      setError("Task name is required");
      return;
    }
    setFormData({
      ...formData,
      tasks: [...formData.tasks, { ...newTask, completed: false }],
    });
    setNewTask({ name: "", notes: "" });
    setError("");
  };

  const updateTask = (index, field, value) => {
    const updatedTasks = formData.tasks.map((task, i) =>
      i === index ? { ...task, [field]: value } : task
    );
    setFormData({ ...formData, tasks: updatedTasks });
  };

  const deleteTask = (index) => {
    const updatedTasks = formData.tasks.filter((_, i) => i !== index);
    setFormData({ ...formData, tasks: updatedTasks });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto text-gray-100"
    >
      {/* Error Message */}
      {error && <div className="text-red-400 text-sm">{error}</div>}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full bg-slate-900 border border-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
          placeholder="Enter plan title"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows="4"
          className="w-full bg-slate-900 border border-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
          placeholder="Enter plan description"
        />
      </div>

      {/* Progress */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Progress
        </label>
        <TextEditor
          value={formData.progress}
          onChange={(value) => setFormData({ ...formData, progress: value })}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="Day">Day</option>
          <option value="Month">Month</option>
          <option value="Year">Year</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="pending">Pending</option>
          <option value="started">Started</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Last Date */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Last Date
        </label>
        <input
          type="date"
          value={formData.lastDate}
          onChange={(e) =>
            setFormData({ ...formData, lastDate: e.target.value })
          }
          className="w-full bg-slate-900 border border-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Tasks Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-2">Tasks</h3>

        {formData.tasks.map((task, index) => (
          <div
            key={index}
            className="border border-slate-700 p-4 mb-4 rounded bg-slate-800"
          >
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) =>
                  updateTask(index, "completed", e.target.checked)
                }
                className="h-5 w-5 accent-emerald-500"
              />
              <input
                type="text"
                value={task.name}
                onChange={(e) => updateTask(index, "name", e.target.value)}
                placeholder="Task name"
                required
                className="flex-1 bg-slate-900 border border-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => deleteTask(index)}
                className="text-red-400 hover:text-red-500 text-sm font-medium"
              >
                Delete
              </button>
            </div>
            <TextEditor
              value={task.notes}
              onChange={(value) => updateTask(index, "notes", value)}
            />
          </div>
        ))}

        {/* Add New Task */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            placeholder="New task name"
            className="flex-1 bg-slate-900 border border-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <button
            type="button"
            onClick={addTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded font-medium text-lg transition"
      >
        💾 Save Plan
      </button>
    </form>
  );
}
