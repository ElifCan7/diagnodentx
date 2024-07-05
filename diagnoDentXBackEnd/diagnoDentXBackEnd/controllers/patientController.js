const Patient = require("../models/patiendModal");
const bcrypt = require("bcryptjs");

// Create a new Patient
exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all Patient
exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.find();
    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single Patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }
    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a patient by ID
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }
    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a patient by ID
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
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

exports.loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // E-posta ile hasta bulunur
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Şifre karşılaştırması yapılır
    const isMatch = await patient.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Hasta bilgilerini döndür
    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
