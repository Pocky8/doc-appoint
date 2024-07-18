// src/components/SignUp.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signUp.css";

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [doctorData, setDoctorData] = useState({
    specialization: "",
    phoneNumber: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [isDoctor, setIsDoctor] = useState(false); // Add state to toggle doctor sign-up
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    if (isDoctor && (input.name === "specialization" || input.name === "phoneNumber" || input.name === "address")) {
      setDoctorData({ ...doctorData, [input.name]: input.value });
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isDoctor
        ? "https://doc-appoint-server.onrender.com/api/doctors/signup"
        : "https://doc-appoint-server.onrender.com/api/users";
      const payload = isDoctor ? { ...data, ...doctorData } : data;
      const { data: res } = await axios.post(url, payload);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {isDoctor && (
              <>
                <input
                  type="text"
                  placeholder="Specialization"
                  name="specialization"
                  onChange={handleChange}
                  value={doctorData.specialization}
                  required
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={doctorData.phoneNumber}
                  required
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={handleChange}
                  value={doctorData.address}
                  required
                  className={styles.input}
                />
              </>
            )}
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
          <button
            type="button"
            className={styles.toggle_btn}
            onClick={() => setIsDoctor(!isDoctor)}
          >
            {isDoctor ? "Sign up as a User" : "Sign up as a Doctor"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
