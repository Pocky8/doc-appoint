// DoctorRegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios'; // Assuming you use axios for HTTP requests

const DoctorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    qualification: '', // Add more fields as needed
    specialization: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/doctors/register', formData);
      console.log('Doctor registration successful:', response.data);
      // Optionally, handle success action (redirect, show message, etc.)
    } catch (error) {
      console.error('Error registering doctor:', error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div className="doctor-registration-form">
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNo">Phone Number:</label>
          <input type="text" id="phoneNo" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="qualification">Qualification:</label>
          <input type="text" id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="specialization">Specialization:</label>
          <input type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default DoctorRegistrationForm;
