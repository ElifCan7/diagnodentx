import React from "react";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const { user, userType } = location.state || {};

  if (!user) {
    return <div> </div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>First Name: {user.Firstname}</p>
      <p>Last Name: {user.Lastname}</p>
      <p>Email: {user.email}</p>
      <p>Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString()}</p>
      <p>Sex: {user.sex}</p>
    </div>
  );
};

export default Profile;
