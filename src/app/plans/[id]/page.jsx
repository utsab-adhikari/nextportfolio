"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import PlanForm from "@/components/trackerandplans/PlanForm";

export default function EditPlanPage() {
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ NEW loader state

  const { id } = useParams();

  useEffect(() => {
    const getPlan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/plans/${id}`, {
          headers: { "Cache-Control": "no-store" },
        });
        setPlan(response.data.data);
        setError(null);
      } catch (err) {
        console.error("❌ Error loading plan:", err);
        setError("⚠️ Failed to load plan");
      } finally {
        setLoading(false);
      }
    };

    getPlan();
  }, [id]);

  // ❌ Error UI
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-red-400 p-4">
        <p className="text-lg font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition"
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  // ⏳ Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ✅ Main form
  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          ✏️ Edit Plan
        </h1>

        <div className="bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-800">
          <PlanForm initialData={plan} />
        </div>
      </div>
    </div>
  );
}
