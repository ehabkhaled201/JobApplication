const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    companyEmail: {
      type: String,
      required: true,
      unique: true,
    },
    companyHR: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    description: {
      type: String,
    },
    industry: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    numberOfEmployees: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

companySchema.set("toObject", { virtuals: true });
companySchema.set("toJSON", { virtuals: true });

const Company = mongoose.model("company", companySchema);

module.exports = Company;
