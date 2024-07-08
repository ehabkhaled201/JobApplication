
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    recoveryEmail: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["USER", "COMPANY_HR"],
    },
    status: {
      type: String,
      required: true,
      enum: ["ONLINE", "OFFLINE"],
    },
    username: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("user", userSchema);

userSchema.pre("save", async function (next) {
  const user = this;
  user.username = user.firstName + " " + user.lastName;
  next();
});
module.exports = User
