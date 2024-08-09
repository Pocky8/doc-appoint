// src/pages/HomePage.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [doctorsData, setDoctorsData] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const textRef = useRef(null);
  const underRef = useRef(null);
  const featuredRef = useRef(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://doc-appoint-server.onrender.com /api/doctors');
        setDoctorsData(response.data.slice(0, 3)); // Fetch and display only the first 3 doctors
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (textRef.current) {
      observer.observe(textRef.current);
    }
    if (underRef.current) {
      observer.observe(underRef.current);
    }
    if (featuredRef.current) {
      observer.observe(featuredRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
      if (underRef.current) {
        observer.unobserve(underRef.current);
      }
      if (featuredRef.current) {
        observer.unobserve(featuredRef.current);
      }
    };
  }, []);

  const handleAppointmentClick = (doctor) => {
    navigate('/appointments', { state: { doctor } });
  };

  return (
    <div className="homepage-container">
      <div className={`homepage-text ${visible ? 'fade-in' : ''}`} ref={textRef}>
        Find the best doctors<br />for your healthcare <br />needs.
      </div>
      <div className={`home-under ${visible ? 'fade-in' : ''}`} ref={underRef}>
        <p>Book appointments with top-rated doctors in your area. Get <br/>personalized care and convenient access to healthcare.</p>
      </div>
      <div className={`featured-doctors ${visible ? 'fade-in' : ''}`} ref={featuredRef}>
        <h1>Featured Doctors</h1>
        <p>Browse our selection of top-rated doctors and book your <br/> appointment today.</p>
      </div>
      <div className="doctors-carousel">
        {doctorsData.map((doctor, index) => (
          <div key={doctor._id} className={`doctor-card ${visible ? 'fade-in' : ''}`} style={{ transitionDelay: `${index * 200}ms` }}>
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
