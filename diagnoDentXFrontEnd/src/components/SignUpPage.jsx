import React from "react";
import Form from "./Form";
import "./signUp.css";

const SignUp = ({ onSubmit, onChange, formData, goBack, idType }) => {
  const {
    Firstname,
    Lastname,
    email,
    dateOfBirth,
    sex,
    medicalId,
    Id,
    password,
  } = formData;

  const formTitle =
    idType === "medicalId" ? "Doktor Kayıt Formu" : "Hasta Kayıt Formu";

  return (
    <div className="formContainer d-flex align-items-center justif-content-center">
      <div className="formPart mx-auto rounded">
        <Form
          onSubmit={onSubmit}
          title={formTitle}
          buttonLabel="Kayıt Ol"
          goBack={goBack}
        >
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="Firstname">Ad</label>
              <input
                type="text"
                className="form-control"
                id="Firstname"
                name="Firstname"
                value={Firstname}
                onChange={onChange}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="Lastname">Soyad</label>
              <input
                type="text"
                className="form-control"
                id="Lastname"
                name="Lastname"
                value={Lastname}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="dateOfBirth">Doğum Tarihi</label>
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={onChange}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="sex">Cinsiyet</label>
              <select
                className="form-control"
                id="sex"
                name="sex"
                value={sex}
                onChange={onChange}
                required
              >
                <option value="">Seçiniz</option>
                <option value="Male">Erkek</option>
                <option value="Female">Kadın</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="email">Email</label>
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
            <div className="col">
              <label htmlFor="password">Şifre</label>
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
          </div>

          <div className="form-group">
            <label htmlFor="medicalId">
              {idType === "medicalId" ? "Tıbbi ID" : "TC Kimlik No"}
            </label>
            <input
              type="text"
              className="form-control"
              id="medicalId"
              name="medicalId"
              value={medicalId}
              onChange={onChange}
              required
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
