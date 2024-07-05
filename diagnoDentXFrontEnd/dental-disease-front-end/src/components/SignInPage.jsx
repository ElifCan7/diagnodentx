import React from "react";
import Form from "./Form";
import "./signIn.css";

const SignIn = ({ onChange, formData, goBack, onSubmit }) => {
  const { email, password } = formData;

  //   const onSubmitt = (e) => {

  //     e.preventDefault();
  //     if (email === "admin@admin.com" && password === "admin") {
  //       navigate("/admin");
  //     } else {
  //       alert("Invalid email or password");
  //     }
  //   };

  return (
    <div className="signin-container d-flex justify-content-center align-items-center">
      <div className="inputandImgContainer">
        <div className="row g-0">
          <div className="col-lg-6 col-md-6 p-5">
            <Form
              onSubmit={onSubmit}
              title="Giriş Yap"
              buttonLabel="Giriş Yap"
              goBack={goBack}
            >
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Şifre
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
            </Form>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 d-none d-lg-block my-auto">
            <div className="signin-image " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
