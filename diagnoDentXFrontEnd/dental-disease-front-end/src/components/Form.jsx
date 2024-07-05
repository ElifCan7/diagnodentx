import React from "react";

const Form = ({ onSubmit, children, title, buttonLabel, goBack }) => {
  return (
    <div className="container">
      <h2 className="text-center my-3">{title}</h2>
      <form onSubmit={onSubmit}>
        {children}
        <button type="submit" className="btn btn-primary mx-auto w-100">
          {buttonLabel}
        </button>
        <button
          type="button"
          className="btn btn-secondary mx-auto w-100"
          onClick={goBack}
        >
          Geri Gel
        </button>
      </form>
    </div>
  );
};

export default Form;
