import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Disease from "../components/Disease";
import LoadXRay from "./LoadXRay"; // Ensure correct import path
import PatientInfo from "./PatientInfo"; // Import PatientInfo component
import Profile from "./Profile";

import "./mainpage.css";
const MainPage = () => {
  const location = useLocation();
  //const doctor = location.state?.doctor;
  //const patient = location.state?.patient;
  const [profile, setProfile] = useState(true);
  const [showLoadXRay, setShowLoadXRay] = useState(false);
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [disease, setDisease] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(null);
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.patient) {
        const url = `http://localhost:3000/patient/${location.state.patient._id}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setPatient(data.data);
        setEmail(data.data.email);
      } else if (location.state && location.state.doctor) {
        const url = `http://localhost:3000/doctor/${location.state.doctor._id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data.data);
        setDoctor(data.data);
        setEmail(data.data.email);
      }
    };
    fetchData();
  }, []);

  const onEmailUpdate = async () => {
    console.log("Yeni e-posta:", email);
    setIsEditing(false); // Düzenleme modunu kapat

    const newMail = { email: email };
    try {
      const url = `http://localhost:3000/patient/${patient._id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMail),
      });
      if (!response.ok) throw new Error("Failed to fetch diseases");
      const data = await response.json();
      setPatient(data.data);
      setEmail(data.data.email);
      console.log("E-posta güncellendi:", data);
    } catch (error) {
      console.error("Error fetching diseases:", error.message);
    }
  };

  const onDoctorEmailUpdate = async () => {
    console.log("Yeni e-posta:", email);
    setIsEditing(false); // Düzenleme modunu kapat

    const newMail = { email: email };
    try {
      const url = `http://localhost:3000/doctor/${doctor._id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMail),
      });
      if (!response.ok) throw new Error("Failed to fetch diseases");
      const data = await response.json();
      setPatient(data.data);
      setEmail(data.data.email);
      console.log("E-posta güncellendi:", data);
    } catch (error) {
      console.error("Error fetching diseases:", error.message);
    }
  };

  const navigate = useNavigate();
  function handleProfileButtonClick() {
    setProfile(true);
    setShowLoadXRay(false);
    setShowPatientInfo(false);
  }

  function handleXRayButtonClick() {
    setShowLoadXRay(!showLoadXRay);
    setProfile(false);
    setShowPatientInfo(false);
  }

  function handleInfoButtonClick() {
    setShowPatientInfo(true);
    setProfile(false);
    setShowLoadXRay(false);
  }
  function handleExit() {
    navigate("/");
  }

  return (
    <div className="container">
      {doctor ? (
        <div>
          <div className="button-group mt-3 d-flex justify-content-center gap-4">
            <button
              className="btn buttonProfile me-2"
              onClick={handleProfileButtonClick}
            >
              Profil
            </button>
            <button
              className="btn buttonxray me-2"
              onClick={handleXRayButtonClick}
            >
              X-Ray Yükle
            </button>
            <button className="btn buttonInfo" onClick={handleInfoButtonClick}>
              Hasta Bilgilerini Görüntüle
            </button>
            <button className="btn buttonexit" onClick={handleExit}>
              Çıkış Yap
            </button>
          </div>

          {profile && (
            <div className="container mt-4">
              {profile && (
                <div className="card p-4">
                  <h2 className="card-title mb-3">
                    Merhaba, Dr. {doctor.Firstname} {doctor.Lastname}
                  </h2>
                  {isEditing ? (
                    <div className="d-flex justify-content-between">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setIsEditing(false)}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={onDoctorEmailUpdate}
                      >
                        Kaydet
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between ">
                      <p className="card-text align-self-center my-auto">
                        Email: {email}
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => setIsEditing(true)}
                      >
                        Güncelle
                      </button>
                    </div>
                  )}
                  <div className="mb-3">
                    <p className="card-text">
                      Doğum Tarihi:{" "}
                      {new Date(doctor.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mb-3">
                    <p className="card-text">
                      Cinsiyet: {doctor.sex === "Male" ? "Erkek" : "Kız"}
                    </p>
                  </div>
                  <div className="mb-3">
                    <p className="card-text">ID: {doctor.medicalId}</p>
                  </div>
                  <Profile />
                </div>
              )}
            </div>
          )}
          {showLoadXRay && <LoadXRay />}
          {showPatientInfo && <PatientInfo />}
        </div>
      ) : patient ? (
        <div className="infocard ">
          {" "}
          <button className="btn buttonexit" onClick={handleExit}>
            Çıkış Yap
          </button>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="card p-4 shadow-lg" style={{ width: "50%" }}>
              <h2 className="card-title text-center mb-4">
                Merhaba, {patient.Firstname} {patient.Lastname}
              </h2>
              <div className="card-body">
                {isEditing ? (
                  <div className="d-flex justify-content-between">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setIsEditing(false)}
                    />
                    <button className="btn btn-primary" onClick={onEmailUpdate}>
                      Kaydet
                    </button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between ">
                    <p className="card-text align-self-center my-auto">
                      Email: {email}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Güncelle
                    </button>
                  </div>
                )}

                <p className="card-text">
                  Doğum Tarihi:{" "}
                  {new Date(patient.dateOfBirth).toLocaleDateString()}
                </p>
                <p className="card-text">
                  Cinsiyet: {patient.sex === "Male" ? "Erkek" : "Kız"}
                </p>
                <p className="card-text">
                  Tc Kimlik Numarası: {patient.medicalId}
                </p>
                <Disease medicalId={patient.medicalId} />

                {/* {disease ?? (
                  <p className="card-text">
                    Hastalık: {disease[disease.length - 1]}
                  </p>
                )} */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No doctor or patient data available</div>
      )}
    </div>
  );
};

export default MainPage;
