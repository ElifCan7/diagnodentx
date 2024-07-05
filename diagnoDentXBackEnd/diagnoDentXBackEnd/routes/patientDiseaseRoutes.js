const express = require("express");
const router = express.Router();
const patientDiseaseController = require("../controllers/patientDiseaseController");

// Create a new patient
router.post("/", patientDiseaseController.createPatientDisease);

// Get all patient
router.get("/", patientDiseaseController.getPatientDiseases);

// Get a single patient by ID
router.get("/:id", patientDiseaseController.getPatientDiseaseById);

// Update a patient by ID
router.put("/:id", patientDiseaseController.updatePatientDisease);

// Delete a patient by ID
router.delete("/:id", patientDiseaseController.deletePatientDisease);

module.exports = router;
