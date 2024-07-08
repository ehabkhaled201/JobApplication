const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
      eum: ["onsite", "remotly", "hybrid"],
    },
    workTime: {
      type: String,
      required: true,
      eum: ["part-time", "full-time"],
    },
    seniorityLevel: {
      type: String,
      required: true,
      eum: ["JUNIOR", "MID-LEVEL", "SENIOR", "TEAM-LEAD", "CTO"],
    },
    jobDescription: {
      type: String,
      required: true,
    },
    technicalSkills: {
      type: [String],
      required: true,
    },
    softSkills: {
      type: [String],
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

jobSchema.set("toObject", { virtuals: true });
jobSchema.set("toJSON", { virtuals: true });

const Job = mongoose.model("job", jobSchema);
module.exports = Job
