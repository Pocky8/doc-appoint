// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="logo">
          <h1><Link to="/" style={{ color: 'white' }}>Doct-Appoint</Link></h1>
        </div>
        <nav className="layout-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/doctors">Doctors</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/appointments" className="appointment-button">Make an Appointment</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      </header>
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
}

export default Layout;
