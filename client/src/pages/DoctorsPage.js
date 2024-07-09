// src/pages/DoctorsPage.js
import React, { useState } from 'react';
import './DoctorsPage.css';

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
  // Add more doctors as needed
];

function DoctorsPage() {
  const [dateRange, setDateRange] = useState('');
  const [specialist, setSpecialist] = useState('');

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const handleSpecialistChange = (event) => {
    setSpecialist(event.target.value);
  };

  return (
    <div className="doctors-page-container">
      <aside className="doctors-filter-section">
        <h2 className="doctors-filter-title">Filter</h2>
        <label className="doctors-filter-label">
          Date Range:
          <input
            type="date"
            value={dateRange}
            onChange={handleDateRangeChange}
            className="doctors-filter-input"
          />
        </label>
        <label className="doctors-filter-label">
          Specialist:
          <select
            value={specialist}
            onChange={handleSpecialistChange}
            className="doctors-filter-select"
          >
            <option value="">All</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="General Physician">General Physician</option>
            <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
            <option value="Psychiatrist">Psychiatrist</option>
          </select>
        </label>
      </aside>
      <main className="doctors-list-section">
        {doctorsData
          .filter((doctor) =>
            specialist ? doctor.specialization === specialist : true
          )
          .map((doctor) => (
            <div key={doctor.id} className="doctor-card-container">
              <img src={doctor.photo} alt={doctor.name} className="doctor-photo-img" />
              <div className="doctor-info-section">
                <h3 className="doctor-info-title">{doctor.name}</h3>
                <p>{doctor.specialization}</p>
              </div>
              <div className="doctor-details-section">
                <p className="doctor-details-text">Rating: {doctor.rating}</p>
                <p className="doctor-details-text">Location: {doctor.location}</p>
                <p className="doctor-details-text">Feedback: {doctor.feedback}</p>
                <p className="doctor-details-text">Cost: {doctor.cost}</p>
                <button className="appointment-button">Make an Appointment</button>
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}

export default DoctorsPage;
