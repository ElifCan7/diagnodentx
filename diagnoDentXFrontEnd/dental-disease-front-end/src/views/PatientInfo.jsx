import React, { useState } from "react";
import "./mainpage.css";
const PatientInfo = () => {
  const [medicalId, setMedicalId] = useState("");
  const [patientInfo, setPatientInfo] = useState(null);
  const [disease, setDisease] = useState([]);

  const fetchPatientInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/patient/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Patient not found");
      const data = await response.json();
      const filteredPatient = data.data.find(
        (patient) => patient.medicalId === medicalId
      );
      if (filteredPatient) {
        setPatientInfo(filteredPatient);
        fetchDiseases();
      } else {
        console.log("No patient found with the given medical ID");
        setPatientInfo(null);
      }
    } catch (error) {
      console.error("Failed to fetch patient info:", error.message);
    }
  };

  const fetchDiseases = async () => {
    setDisease([]);
    try {
      const response = await fetch(`http://localhost:3000/patientDisease`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch diseases");
      const data = await response.json();
      const filteredPatientdisease = data.data.filter(
        (data) => data.PatientId === medicalId
      );
      const diseaseNames = filteredPatientdisease.map(
        (disease) => disease.Disease
      );
      setDisease(diseaseNames);
    } catch (error) {
      console.error("Error fetching diseases:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Hasta Bilgileri</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="TC Kimlik Numarası Giriniz."
          value={medicalId}
          onChange={(e) => setMedicalId(e.target.value)}
        />
        <button className="btn buttonfetch" onClick={fetchPatientInfo}>
          Bilgileri Al
        </button>
      </div>

      {patientInfo && (
        <div className="mt-4 py-4">
          <table className="table">
            <tbody>
              <tr>
                <th>Ad</th>
                <td>
                  {patientInfo.Firstname} {patientInfo.Lastname}
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{patientInfo.email}</td>
              </tr>
              <tr>
                <th>Doğum tarihi</th>
                <td>
                  {new Date(patientInfo.dateOfBirth).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <th>Cinsiyet</th>
                <td>{patientInfo.sex === "male" ? "Erkek" : "Kız"}</td>
              </tr>
              <tr>
                <th>Tc Kimlik Numarası</th>
                <td>{patientInfo.medicalId}</td>
              </tr>
              <tr>
                <th>Hastalık</th>
                <td>
                  {disease.length > 0
                    ? disease[disease.length - 1]
                    : "Hastalık bulunamadı"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {!patientInfo && patientInfo !== null && (
        <p className="text-danger">No patient data found.</p>
      )}
    </div>
  );
};

export default PatientInfo;
