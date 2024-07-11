// src/config/models/Doctor.js
import mongoose from 'mongoose';
import Joi from 'joi';

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

function validateDoctor(doctor) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    specialization: Joi.string().min(3).max(50).required(),
    phoneNumber: Joi.string().min(10).max(15).required(),
    address: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(doctor);
}

export { Doctor, validateDoctor };
