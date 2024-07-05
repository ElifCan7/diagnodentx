import React, { useEffect, useState } from "react";
const Disease = ({ medicalId }) => {
  const [disease, setDisease] = useState([]);
  const [randevu, setRandevu] = useState("");
  const hastaliklarVeBölümler = {
    "Chronic apical periodontitis with vertical bone loss": "Endodonti",
    "Dental caries (proximal)": "Diş Hekimliği (Genel Diş Hekimi)",
    "Embeded tooth": "Ağız, Diş ve Çene Cerrahisi",
    "Irreversible pulpitis with Acute periodontitis": "Endodonti",
    "Impacted tooth (fully bony impaction)": "Oral ve Maksillofasiyal Cerrahi",
    Periodontitis: "periodontoloji",
    "Improper restoration with chronic apical periodontitis":
      "Endodonti ve Restoratif Diş Hekimliği",
  };

  const randevuAl = (hastalik) => {
    if (hastalik in hastaliklarVeBölümler) {
      const bolum = hastaliklarVeBölümler[hastalik];
      setRandevu(bolum);
      console.log(bolum);
    } else {
      setRandevu(hastaliklarVeBölümler["Dental Çürük"]);
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
      randevuAl(diseaseNames);
    } catch (error) {
      console.error("Error fetching diseases:", error.message);
    }
  };
  useEffect(() => {
    fetchDiseases();
  }, []);
  return (
    <div>
      <p>Hastalık : {disease}</p>
      <p>Önerilen Bölüm : {randevu}</p>
    </div>
  );
};

export default Disease;
