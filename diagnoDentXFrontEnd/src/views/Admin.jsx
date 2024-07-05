import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";
const Admin = () => {
  const navigate = useNavigate();
  const [medicalId, setMedicalId] = useState("");
  const [medicalIdDoc, setMedicalIdDoc] = useState("");
  const [patientInfo, setPatientInfo] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [error, setError] = useState("");

  const handleExit = () => {
    navigate("/");
  };
  const deletePatient = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/patient/${patientInfo._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Patient could not be deleted");

      // Eğer hasta başarıyla silindiyse state'i güncelleyin
      setPatientInfo(null);
      setError("");
      console.log("Patient deleted successfully");
    } catch (err) {
      setError(err.message);
      console.error("Failed to delete patient:", err.message);
    }
  };
  const deleteDoctor = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/doctor/${doctorInfo._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Doctor could not be deleted");

      setDoctorInfo(null);
      setError("");
    } catch (err) {
      setError(err.message);
      console.error("Failed to delete doctor:", err.message);
    }
  };

  const fetchPatientInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/patient/`);
      if (!response.ok) throw new Error("Hasta bulunamadı");
      const data = await response.json();

      const filteredPatient = data.data.find(
        (patient) => patient.medicalId === medicalId
      );
      if (filteredPatient) {
        setPatientInfo(filteredPatient);
      } else {
        console.log("No patient found with the given medical ID");
        setPatientInfo(null);
      }
    } catch (err) {
      setError(err.message);
      setPatientInfo(null);
    }
  };

  const fetchDoktorInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/doctor/`);
      if (!response.ok) throw new Error("Hasta bulunamadı");
      const data = await response.json();

      const filteredDoctor = data.data.find(
        (doctor) => doctor.medicalId === medicalIdDoc
      );
      if (filteredDoctor) {
        setDoctorInfo(filteredDoctor);
      } else {
        console.log("No patient found with the given medical ID");
        setDoctorInfo(null);
      }
    } catch (err) {
      setError(err.message);
      setDoctorInfo(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPatientInfo();
  };

  const handleSubmitDoktor = (e) => {
    e.preventDefault();
    fetchDoktorInfo();
  };

  return (
    <div className=" adminpagecont mx-0 py-5">
      <h1 className="text-center adm">Admin Page</h1>
      <div className="container pt-4 adminpagecont ">
        <div className="position-relative">
          <button
            className="btn btn-danger position-absolute top-0 end-0 m-3"
            onClick={handleExit}
          >
            Çıkış Yap
          </button>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="patient-search p-4 bg-light border rounded">
              <h2>Hasta Bul</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="medicalId" className="form-label">
                    Medical ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="medicalId"
                    value={medicalId}
                    onChange={(e) => setMedicalId(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Ara
                </button>
              </form>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              {patientInfo && (
                <div className="patient-info mt-3">
                  <h3>Hasta Bilgileri</h3>
                  <p>
                    <strong>Ad:</strong> {patientInfo.Firstname}
                  </p>
                  <p>
                    <strong>Soyad:</strong> {patientInfo.Lastname}
                  </p>
                  <p>
                    <strong>Doğum Tarihi:</strong>{" "}
                    {new Date(patientInfo.dateOfBirth).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Cinsiyet:</strong> {patientInfo.sex}
                  </p>
                  <p>
                    <strong>Medical ID:</strong> {patientInfo.medicalId}
                  </p>
                  <button onClick={deletePatient} className="btn btn-primary">
                    hastayı sistemden sil
                  </button>
                  {console.log(patientInfo._id)}
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="patient-search p-4 bg-light border rounded">
              <h2>Doktor Bul</h2>
              <form onSubmit={handleSubmitDoktor}>
                <div className="mb-3">
                  <label htmlFor="medicalIdDoctor" className="form-label">
                    Medical ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="medicalIdDoctor"
                    value={medicalIdDoc}
                    onChange={(e) => setMedicalIdDoc(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Ara
                </button>
              </form>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              {doctorInfo && (
                <div className="patient-info mt-3">
                  <h3>Hasta Bilgileri</h3>
                  <p>
                    <strong>Ad:</strong> {doctorInfo.Firstname}
                  </p>
                  <p>
                    <strong>Soyad:</strong> {doctorInfo.Lastname}
                  </p>
                  <p>
                    <strong>Doğum Tarihi:</strong>{" "}
                    {new Date(doctorInfo.dateOfBirth).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Cinsiyet:</strong> {doctorInfo.sex}
                  </p>
                  <p>
                    <strong>Medical ID:</strong> {doctorInfo.medicalId}
                  </p>
                  <button onClick={deleteDoctor} className="btn btn-primary">
                    Doktoru sistemden sil
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="position-relative d-flex justify-content-end ">
        <img
          className="adminpic"
          src="https://www.erpilic.com.tr/NDC/Admin/Images/adminlogo.png"
          alt=""
        />
      </div>
      <div className="position-relative d-flex justify-content-start ">
        <img
          className="adminpic2"
          src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/4721.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Admin;
