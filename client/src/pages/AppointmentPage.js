// src/pages/AppointmentPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/appointment.css";

const AppointmentPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    reason: "",
    paymentType: "cash",
    doctorId: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/doctors");
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setAppointmentData({ ...appointmentData, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/appointments";
      const { data: res } = await axios.post(url, appointmentData);
      setSuccess("Appointment booked successfully!");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles["appointment-container"]}>
      <div className={styles["appointment-form-container"]}>
        <form className={styles["form-container"]} onSubmit={handleSubmit}>
          <h1>Book an Appointment</h1>
          <div className={styles["input-group"]}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={appointmentData.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={appointmentData.lastName}
              required
              className={styles.input}
            />
          </div>
          <div className={styles["input-group"]}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={appointmentData.email}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNo"
              onChange={handleChange}
              value={appointmentData.phoneNo}
              required
              className={styles.input}
            />
          </div>
          <div className={styles["input-group"]}>
            <textarea
              placeholder="Reason for Visit"
              name="reason"
              onChange={handleChange}
              value={appointmentData.reason}
              required
              className={styles.textarea}
            />
            <select
              name="paymentType"
              onChange={handleChange}
              value={appointmentData.paymentType}
              required
              className={styles.select}
            >
              <option value="cash">Cash</option>
            </select>
          </div>
          <div className={styles["input-group"]}>
            <select
              name="doctorId"
              onChange={handleChange}
              value={appointmentData.doctorId}
              required
              className={styles.select}
            >
              <option value="" disabled>
                Select a Doctor
              </option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>
          {error && <div className={styles["error-msg"]}>{error}</div>}
          {success && <div className={styles["success-msg"]}>{success}</div>}
          <button type="submit" className={styles["green-btn"]}>
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentPage;
