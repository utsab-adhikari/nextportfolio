"use client";

import PlanForm from "@/mycomponents/PlanForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function EditPlanPage({ params }) {
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const getPlan = async () => {
      try {
        const response = await axios.get(`/api/plans/${id}`, {
          headers: { "Cache-Control": "no-store" },
        });
        setPlan(response.data.data);
        setError(null);
      } catch (err) {
        setError("⚠️ Failed to load plan");
      }
    };

    getPlan();
  }, [id]); // added dependency for safety

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400 text-lg font-medium p-4">
        {error}
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-gray-300 text-lg">
        Loading...
      </div>
    );
  }

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
