import dotenv from 'dotenv';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Doctor, validateDoctor } from '../config/models/Doctor.js';

dotenv.config();

console.log('JWT_PRIVATE_KEY:', process.env.JWT_PRIVATE_KEY);

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { error } = validateDoctor(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let doctor = await Doctor.findOne({ email: req.body.email });
    if (doctor) return res.status(400).send('Doctor already registered.');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    doctor = new Doctor({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      specialization: req.body.specialization,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    });

    await doctor.save();
    res.status(200).send('Doctor registered successfully.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/login', async (req, res) => {
  try {
    let doctor = await Doctor.findOne({ email: req.body.email });
    if (!doctor) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, doctor.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: doctor._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '7d' });
    res.header('x-auth-token', token).send('Login successful.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
