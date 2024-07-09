// src/validators/doctorValidator.js

import Joi from 'joi';

export const validateDoctor = (doctor) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    specialization: Joi.string().required(),
    phoneNumber: Joi.string().min(10).required(),
    address: Joi.string().required()
  });
  return schema.validate(doctor);
};
