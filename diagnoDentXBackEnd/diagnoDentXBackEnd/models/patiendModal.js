const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const patientSchema = mongoose.Schema(
  {
    Firstname: {
      type: String,
      required: [true, "Please enter First name"],
    },
    Lastname: {
      type: String,
      required: [true, "Please enter Last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please enter the date of birth"],
    },
    sex: {
      type: String,
      required: [true, "Please enter the sex"],
      enum: ["Male", "Female"],
    },
    medicalId: {
      type: String,
      required: [true, "Please enter the ID"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving the patient document
patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare the password when logging in
patientSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
