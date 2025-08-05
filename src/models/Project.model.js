import mongoose from "mongoose";

const contributorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
    },
    site: {
      type: String,
    },
    whatsapp: {
      type: Number,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    contributors: [contributorSchema],
    aboutProject: {
      type: String,
      required: true,
    },
    demoLink: {
      type: String,
      required: true,
    },
    technologies: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project ||
  mongoose.model("Project", projectSchema, "projects");

export default Project;
