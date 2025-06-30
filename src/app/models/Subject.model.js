import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    context: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Context",
        required: true,
    },
    subject: {
        type: String,
    },
    description: {
        type: String,
    }
}, {timestamps: true});

const Subject = mongoose.models.Subject || mongoose.model("Subject", subjectSchema, "subjects");

export default Subject;