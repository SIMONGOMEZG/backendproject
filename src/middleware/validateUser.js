import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export function validateRegister(req, res, next) {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Registro inválido', errors: error.details });
  next();
}

export function validateLogin(req, res, next) {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Login inválido', errors: error.details });
  next();
}
