import React, { useState } from 'react';

function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    doctor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    console.log('Appointment Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Date:
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </label>
      <label>
        Time:
        <input type="time" name="time" value={formData.time} onChange={handleChange} />
      </label>
      <label>
        Doctor:
        <input type="text" name="doctor" value={formData.doctor} onChange={handleChange} />
      </label>
      <button type="submit">Book Appointment</button>
    </form>
  );
}

export default AppointmentForm;
