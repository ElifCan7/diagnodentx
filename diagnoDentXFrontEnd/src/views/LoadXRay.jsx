import React, { useState } from "react";

const LoadXRay = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");

  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [myData, setMyData] = useState({
    PatientId: "",
    DoctorId: "",
    Disease: "",
  });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      handleImageUpload(file);
    }
  };

  const saveToDatabase = async () => {
    const myData = {
      PatientId: patientId,
      DoctorId: doctorId,
      Disease: prediction,
    };
    try {
      const response = await fetch("http://localhost:3000/patientDisease", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      // Clear the form fields after successful submission
      setDoctorId("");
      setPatientId("");
      setPrediction("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log("burda");
    fetch("https://afd5-34-16-203-168.ngrok-free.app/predict", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data.prediction);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleImageChange}
        />
      </div>
      {image && (
        <div className="image-preview mt-3">
          <img
            src={image}
            alt="X-Ray Preview"
            className="img-fluid rounded shadow"
          />
          <div className="mt-3">
            <h4>Predictionn: {prediction}</h4>
          </div>
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="doctorId" className="form-label">
                    Lütfen doktor ID'nizi giriniz:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="doctorId"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="patientId" className="form-label">
                    Lütfen hasta TC kimlik numarasını giriniz:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientId"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveToDatabase}
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadXRay;
