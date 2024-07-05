import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignIn from "../components/SignInPage";
import SignUp from "../components/SignUpPage";

const DoctorForm = () => {
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
    if (email === "admin@admin.com" && password === "admin") {
      navigate("/admin");
    } else {
      const url =
        mode === "signin"
          ? "http://localhost:3000/doctor/login"
          : "http://localhost:3000/doctor";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          if (mode == "signup") {
            //burada mail gönderilecek
          }
          const data = await response.json();
          console.log("Doctor registration/login successful", data);
          navigate("/mainPage", { state: { doctor: data } });
        } else {
          const errorData = await response.json();
          console.error("Failed to register/login doctor:", errorData.message);
          alert(errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const goBack = () => {
    navigate("/");
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
      idType="medicalId"
    />
  );
};

export default DoctorForm;
