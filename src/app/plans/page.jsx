"use client";
import PlanList from "@/mycomponents/PlanList";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ NEW: loader state

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true); // ✅ start loading
        const { data } = await axios.get("/api/plans", {
          withCredentials: true,
        });

        if (data?.success && Array.isArray(data.data)) {
          setPlans(data.data);
        } else {
          setPlans([]);
        }
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching plans:", err);
        setError("⚠️ Failed to load plans");
      } finally {
        setLoading(false); // ✅ stop loading
      }
    };

    fetchPlans();
  }, []);

  // ❌ Error screen
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

        <div className="flex justify-center mb-6">
          <Link
            href="/plans/new"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2 rounded-lg transition"
          >
            ➕ Create New Plan
          </Link>
        </div>

        {/* ✅ Loader */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : plans.length === 0 ? (
          // ✅ Empty state
          <div className="text-center text-gray-400 mt-12">
            <p className="text-lg">No plans yet! 🚀</p>
            <p className="text-sm mt-1">
              Click <span className="text-emerald-400">“Create New Plan”</span> to get started.
            </p>
          </div>
        ) : (
          // ✅ Plan list
          <PlanList plans={plans} />
        )}
      </div>
    </div>
  );
}
