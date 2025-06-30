import mongoose from "mongoose";

const contextSchema = new mongoose.Schema({
    context: {
        type: String,
    },
    description: {
        type: String,
    }
}, {timestamps: true});

const Context = mongoose.models.Context || mongoose.model("Context", contextSchema, "contexts");

export default Context;