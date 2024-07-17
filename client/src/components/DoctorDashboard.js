import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState({
    days: [],
    timeslots: []
  });
  const [newAvailability, setNewAvailability] = useState({
    days: [],
    timeslots: ""
  });
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error('No token found in local storage');
        return;
      }

      try {
        const doctorEmail = localStorage.getItem("doctorEmail");
        const docid = localStorage.getItem("docid");
        if (!doctorEmail) {
          console.error('No doctorEmail found in local storage');
          return;
        }

        const response = await axios.get(`http://localhost:8080/api/appointments/bydoctor?docid=${docid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const doctorResponse = await axios.get(`http://localhost:8080/api/doctors/${docid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAppointments(response.data);
        setDoctorInfo(doctorResponse.data);
        setAvailability(doctorResponse.data.availability);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments or doctor data:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setNewAvailability(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAvailabilitySubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const docid = localStorage.getItem("docid");

    try {
      const updatedAvailability = {
        days: newAvailability.days.split(',').map(day => day.trim()),
        timeslots: newAvailability.timeslots.split(',').map(slot => slot.trim())
      };

      await axios.put(`http://localhost:8080/api/doctors/${docid}/availability`, updatedAvailability, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setAvailability(updatedAvailability);
      setNewAvailability({ days: "", timeslots: "" });

      alert('Availability updated successfully!');
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const doctor = doctorInfo;

  const displayDoctorInfo = (doctor) => (
    <div>
      <h3>Welcome, Dr. {doctor.firstName} {doctor.lastName}</h3>
      <p className='specialization'>{doctor.specialization}</p>
    </div>
  );

  return (
    <div className="dashboard-container">
      <h2>Doctor Dashboard</h2>
      {doctor && (
        <div>
          {displayDoctorInfo(doctor)}
          <div className="section">
            <h4>Upcoming Appointments</h4>
            {appointments.length === 0 ? (
              <p>No appointments available.</p>
            ) : (
              <ul>
                {appointments.map((appointment, index) => (
                  <li key={appointment._id}>
                    <div className="appointment-item">
                      <div className="appointment-number">
                        <strong>{index + 1}.</strong>
                      </div>
                      <div className="appointment-details">
                        <div><strong>Patient Name:</strong> {appointment.firstName} {appointment.lastName}</div>
                        <div><strong>Date:</strong> {appointment.date}</div>
                        <div><strong>Phone Number:</strong> {appointment.phoneNo}</div>
                        <div><strong>Reason:</strong> {appointment.reason ? appointment.reason : 'Reason not provided'}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="section">
            <h4>Update Availability</h4>
            <form onSubmit={handleAvailabilitySubmit}>
              <label>
                Available Days (comma separated):
                <input
                  type="text"
                  name="days"
                  value={newAvailability.days}
                  onChange={handleAvailabilityChange}
                  required
                />
              </label>
              <br />
              <label>
                Available Timeslots (comma separated):
                <input
                  type="text"
                  name="timeslots"
                  value={newAvailability.timeslots}
                  onChange={handleAvailabilityChange}
                  required
                />
              </label>
              <br />
              <button type="submit">Update Availability</button>
            </form>
            <div>
              <h5>Current Availability</h5>
              <p>Days: {availability.days.join(", ")}</p>
              <p>Timeslots: {availability.timeslots.join(", ")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
