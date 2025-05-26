import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  code: Joi.string().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().required(),
  thumbnails: Joi.array().items(Joi.string()).optional()
});

export const validateProduct = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
