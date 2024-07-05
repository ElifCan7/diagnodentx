import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignIn from "../components/SignInPage";
import SignUp from "../components/SignUpPage";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    email: "",
    dateOfBirth: "",
    sex: "",
    medicalId: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const mode = query.get("mode");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("hfyt");
    try {
      const url =
        mode === "signin"
          ? "http://localhost:3000/patient/login"
          : "http://localhost:3000/patient";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/mainPage", { state: { patient: data } });
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to register or login patient:",
          errorData.message
        );
        console.log(response);
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goBack = () => {
    navigate("/"); // Navigate back to the home screen
  };

  return mode === "signin" ? (
    <SignIn
      onSubmit={onSubmit}
      onChange={onChange}
      formData={formData}
      goBack={goBack}
    />
  ) : (
    <SignUp
      onSubmit={onSubmit}
      onChange={onChange}
      formData={formData}
      goBack={goBack}
      idType="tcKimlikNo"
    />
  );
};

export default PatientForm;
