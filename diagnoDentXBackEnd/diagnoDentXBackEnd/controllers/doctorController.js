const Doctor = require("../models/doctorModal");

// Create a new doctor
exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(200).json(doctor);
  } catch (error) {
    console.error(req.body);
    res.status(500).json({ message: error.message });
  }
};

// Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a doctor by ID
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a doctor by ID
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
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

exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await doctor.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
