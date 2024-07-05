import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./login.css"; // Import the custom CSS

const Login = ({ mode }) => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const currentMode = query.get("mode") || mode;

  const handleNavLinkClick = (path) => {
    navigate(`${path}?mode=${currentMode}`);
  };

  return (
    <div className="login-container text-center ">
      <div className="middle d-flex justify-content-center align-items-center flex-column rounded">
        <div className="mx-3 mb-3">
          <h2>{currentMode === "signin" ? "Giriş Yap" : "Kayıt Ol"}</h2>
        </div>
        <div>
          <button
            className="btn btn-primary m-2 px-3 buton"
            onClick={() => handleNavLinkClick("/patient")}
          >
            Hasta
          </button>
          <button
            className="btn btn-secondary m-2 px-3 buton"
            onClick={() => handleNavLinkClick("/doctor")}
          >
            Doktor
          </button>
        </div>
        <div className="login-image"></div>
      </div>
    </div>
  );
};

export default Login;
