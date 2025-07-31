import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
    notes: { type: String, default: "" },
  },
  { _id: false }
);

const planSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    progress: { type: String, default: "" },
    category: { type: String, enum: ["Day", "Month", "Year"], required: true },
    tasks: [TaskSchema],
    status: {
      type: String,
      enum: ["pending", "started", "completed"],
      default: "pending",
    },
    lastDate: { type: Date },
  },
  { timestamps: true }
);

const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema, "plans");

export default Plan;