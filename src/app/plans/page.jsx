"use client";
import PlanList from "@/mycomponents/PlanList";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("/api/plans", {
          headers: { "Cache-Control": "no-store" },
        });
        setPlans(response.data.data);
        setError(null);
      } catch (err) {
        setError("⚠️ Failed to load plans");
      }
    };
    fetchPlans();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          📋 Your Plans
        </h1>

        {/* Create New Plan Button */}
        <div className="flex justify-center mb-6">
          <Link
            href="/plans/new"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2 rounded-lg transition"
          >
            ➕ Create New Plan
          </Link>
        </div>

        {/* Plan List */}
        <PlanList plans={plans} />
      </div>
    </div>
  );
}
