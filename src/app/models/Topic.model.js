import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    done: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
);

const Topic =
  mongoose.models.Topic || mongoose.model("Topic", topicSchema, "topics");

export default Topic;
