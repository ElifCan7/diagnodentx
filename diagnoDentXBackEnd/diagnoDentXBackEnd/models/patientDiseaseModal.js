const mongoose = require("mongoose");
const patientDiseaseSchema = mongoose.Schema(
  {
    PatientId: {
      type: String,
      required: [true, "Please enter the ID"],
      unique: false, // Tıbbi kimliğin benzersiz olmasını sağlar
    },
    DoctorId: {
      type: String,
      required: [true, "Please enter the ID"],
      unique: false, // Tıbbi kimliğin benzersiz olmasını sağlar
    },
    Disease: {
      type: String,
      required: [true, "Please enter disease"],
      unique: false, // Tıbbi kimliğin benzersiz olmasını sağlar
    },
  },
  {
    timestamps: true,
  }
);

const PatientDisease = mongoose.model("PatientDisease", patientDiseaseSchema);

module.exports = PatientDisease;
