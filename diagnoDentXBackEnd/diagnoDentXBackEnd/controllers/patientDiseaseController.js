const PatientDisease = require("../models/patientDiseaseModal");

// Create a new Patient
exports.createPatientDisease = async (req, res) => {
  try {
    const patientDisease = await PatientDisease.create(req.body);
    res.status(200).json(patientDisease);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all Patient with disease
exports.getPatientDiseases = async (req, res) => {
  try {
    const patientDisease = await PatientDisease.find();
    res.status(200).json({
      success: true,
      data: patientDisease,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single Patient disease by ID
exports.getPatientDiseaseById = async (req, res) => {
  try {
    const patientDisease = await PatientDisease.findById(req.params.id);
    if (!patientDisease) {
      return res.status(404).json({
        success: false,
        message: "PatientDisease not found",
      });
    }
    res.status(200).json({
      success: true,
      data: patientDisease,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a patientDisease by ID
exports.updatePatientDisease = async (req, res) => {
  try {
    const patientDisease = await PatientDisease.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!patientDisease) {
      return res.status(404).json({
        success: false,
        message: "patientDisease not found",
      });
    }
    res.status(200).json({
      success: true,
      data: patientDisease,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a patientDisease by ID
exports.deletePatientDisease = async (req, res) => {
  try {
    const patientDisease = await PatientDisease.findByIdAndDelete(
      req.params.id
    );
    if (!patientDisease) {
      return res.status(404).json({
        success: false,
        message: "patientDisease not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
