// src/routes/appointments.js

import express from "express";
import Appointment from "../config/models/appointment.js";

const router = express.Router();

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).send({ message: "Appointment booked successfully!" });
  } catch (error) {
    res.status(400).send({ message: "Error booking appointment", error });
  }
});

// Get all appointments (optional, if you need this for admin purposes)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId");
    res.status(200).send(appointments);
  } catch (error) {
    res.status(400).send({ message: "Error fetching appointments", error });
  }
});

export default router;
