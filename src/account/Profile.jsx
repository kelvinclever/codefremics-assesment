import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import "./profile.css";
import LoginForm from "../Login/Login";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  if (!user) {
    return (
      <div>
        {!user?
        <LoginForm/>: <Loader/>}
      </div>
    );
  }

  return (
    <div>
    <div className="profile redBackground">
      <h1 className="header">
        Welcome, {user.firstName} {user.lastName}
      </h1>
      <span className="confirm">Confirm your credentials</span>
      <p className="info">First Name: {user.firstName}</p>
      <p className="info">Last Name: {user.lastName}</p>
    </div>
    <div className="add">
        <a href="/add" className="add_newcustomer"> add customer</a>
        <a href="/customers" className="view_customers"> view customers</a>
    </div>
    </div>
  );
};

export default Profile;
