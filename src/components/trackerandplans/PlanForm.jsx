"use client";
import { useState } from "react";
import TextEditor from "./TextEditor";
import { useRouter } from "next/navigation";
import { FiSave } from "react-icons/fi";

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
      className="space-y-6 max-w-2xl mx-auto p-4 bg-slate-950 text-gray-100"
    >
      {/* Error Message */}
      {error && (
        <div className="text-red-400 text-sm bg-red-900/50 p-3 rounded-lg">
          {error}
        </div>
      )}

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
          className="w-full bg-slate-800 border border-slate-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-100"
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
          className="w-full bg-slate-800 border border-slate-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-100"
          placeholder="Enter plan description"
        />
      </div>

      {/* Progress */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Progress
        </label>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-2">
          <TextEditor
            value={formData.progress}
            onChange={(value) => setFormData({ ...formData, progress: value })}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
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
          className="w-full bg-slate-800 border border-slate-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
        >
          <option value="pending">Pending</option>
          <option value="started">Started</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Last Date */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={formData.lastDate}
          onChange={(e) =>
            setFormData({ ...formData, lastDate: e.target.value })
          }
          className="w-full bg-slate-800 border border-slate-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
        />
      </div>

      {/* Tasks Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-3">Tasks</h3>

        {formData.tasks.map((task, index) => (
          <div
            key={index}
            className="border border-slate-700 p-4 mb-4 rounded-lg bg-slate-800"
          >
            <div className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) =>
                  updateTask(index, "completed", e.target.checked)
                }
                className="h-5 w-5 text-blue-500 rounded border-slate-600 focus:ring-blue-500"
              />
              <input
                type="text"
                value={task.name}
                onChange={(e) => updateTask(index, "name", e.target.value)}
                placeholder="Task name"
                required
                className="flex-1 bg-slate-900 border border-slate-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-100"
              />
              <button
                type="button"
                onClick={() => deleteTask(index)}
                className="text-red-400 hover:text-red-500 text-sm font-medium transition"
              >
                Delete
              </button>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-2">
              <TextEditor
                value={task.notes}
                onChange={(value) => updateTask(index, "notes", value)}
              />
            </div>
          </div>
        ))}

        {/* Add New Task */}
        <div className="flex gap-3">
          <input
            type="text"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            placeholder="New task name"
            className="flex-1 bg-slate-800 border border-slate-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-100"
          />
          <button
            type="button"
            onClick={addTask}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium text-lg transition flex items-center justify-center gap-2"
      >
        <FiSave />
        Save Plan
      </button>
    </form>
  );
}