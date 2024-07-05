const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

// Create a new doctor
router.post("/", doctorController.createDoctor);

// Get all doctors
router.get("/", doctorController.getDoctors);

// Get a single doctor by ID
router.get("/:id", doctorController.getDoctorById);

// Update a doctor by ID
router.put("/:id", doctorController.updateDoctor);

// Delete a doctor by ID
router.delete("/:id", doctorController.deleteDoctor);

// Login a doctor by ID
// In doctorRoutes.js or a similar file
router.post("/login", doctorController.loginDoctor);

module.exports = router;
