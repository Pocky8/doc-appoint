// src/pages/HomePage.js
import React from 'react';
import './HomePage.css';

const doctorsData = [
  {
    id: 1,
    name: 'Dr. John Doe',
    specialization: 'Cardiologist',
    rating: 4.5,
    location: 'New York, NY',
    feedback: 'Excellent doctor with great experience.',
    cost: '$200 per consultation',
    photo: 'https://via.placeholder.com/100'
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    specialization: 'Dermatologist',
    rating: 4.7,
    location: 'Los Angeles, CA',
    feedback: 'Very knowledgeable and friendly.',
    cost: '$180 per consultation',
    photo: 'https://via.placeholder.com/100'
  },
  // Add more placeholder doctors as needed
];

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="homepage-text">
        YOUR COMPLETE HEALTHCARE<br />SOLUTION
      </div>
      <div className="doctors-carousel">
        {doctorsData.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p>{doctor.specialization}</p>
              <p>Rating: {doctor.rating}</p>
              <p>Location: {doctor.location}</p>
              <p>Feedback: {doctor.feedback}</p>
              <p>Cost: {doctor.cost}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
