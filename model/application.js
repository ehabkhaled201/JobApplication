const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userTechSkills: {
      type: [String],
      required: true,
    },
    userSoftSkills: {
      type: [String],
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.ObjectId,
      ref: "jobs",
      required: true,
    },
  },
  { timestamps: true }
);

applicationSchema.set("toObject", { virtuals: true });
applicationSchema.set("toJSON", { virtuals: true });

const Application = mongoose.model("application", applicationSchema);

module.exports = Application;
