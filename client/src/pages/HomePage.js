import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [doctorsData, setDoctorsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://doc-appoint-server.onrender.com/api/doctors');
        setDoctorsData(response.data.slice(0, 3)); // Fetch and display only the first 3 doctors
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleAppointmentClick = (doctor) => {
    navigate('/appointments', { state: { doctor } });
  };

  return (
    <div className="homepage-container">
      <div className="homepage-text">
        Find the best doctors<br />for your healthcare <br />needs.
      </div>
      <div className='home-under'>
        <p>Book appointments with top-rated doctors in your area. Get <br/>personalized care and convenient access to healthcare.</p>
      </div>
      <div className="featured-doctors">
        <h1>Featured Doctors</h1>
        <p>Browse our selection of top-rated doctors and book your <br/> appointment today.</p>
      </div>
      <div className="doctors-carousel">
        {doctorsData.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <img src={doctor.photo || 'https://via.placeholder.com/100'} alt={doctor.firstName + ' ' + doctor.lastName} className="doctor-photo" />
            <div className="doctor-info">
              <h3>{doctor.firstName} {doctor.lastName}</h3>
              <p>{doctor.specialization}</p>
              <p>Location: {doctor.address}</p>
              <button className="appointment-button" onClick={() => handleAppointmentClick(doctor)}>Make an Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
