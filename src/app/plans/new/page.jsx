"use client"

import PlanForm from "@/components/trackerandplans/PlanForm";


export default function NewPlanPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Plan</h1>
      <PlanForm />
    </div>
  );
}