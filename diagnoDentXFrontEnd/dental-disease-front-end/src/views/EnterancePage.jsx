import React from "react";
import { NavLink } from "react-router-dom";
import "./enterance.css";

const EntrancePage = () => {
  return (
    <div className="entrance-page">
      <div className="navbar">
        <NavLink to="/login?mode=signin">
          <button className="btn btn-primary btn-signin px-3 py-2">
            Giriş Yap
          </button>
        </NavLink>
        <NavLink to="/login?mode=signup">
          <button className="btn btn-secondary btn-signup px-3 py-2">
            Kayıt Ol
          </button>
        </NavLink>
      </div>
      <div className="content fs-2 px-3">
        <h1>DiagnoDentX</h1>
      </div>
    </div>
  );
};

export default EntrancePage;
