import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    notes: { type: String, default: "" }, // for per-task rich text
  },
  { _id: false }
);

const TrackerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  tasks: [TaskSchema],
  editorContent: { type: String }, // general notes
  reportSubmitted: { type: Boolean, default: false },
  reportHtml: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const Tracker =
  mongoose.models.Tracker || mongoose.model("Tracker", TrackerSchema);
export default Tracker;
