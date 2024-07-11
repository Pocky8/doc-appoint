import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import AppointmentPage from './pages/AppointmentPage';
import ContactPage from './pages/ContactPage';
import DoctorsPage from './pages/DoctorsPage';
import Layout from './components/Layout';
import Signup from "./components/Singup";
import Login from "./components/Login";
import DoctorLogin from "./components/Login/DoctorLogin";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Layout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/appointments" element={<AppointmentPage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/doctors" element={<DoctorsPage />} />
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/doctorlogin" exact element={<DoctorLogin />} />
				<Route path="/" element={<Navigate replace to="/login" />} />
			</Routes>
		</Layout>
	);
}

export default App;
