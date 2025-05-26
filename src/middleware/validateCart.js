import Joi from 'joi';

const productUpdateSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required()
});

const cartUpdateSchema = Joi.object({
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().hex().length(24).required(),
      quantity: Joi.number().integer().min(1).required()
    })
  ).required()
});

export function validateCartProduct(req, res, next) {
  const { error } = productUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Cantidad inválida', errors: error.details });
  }
  next();
}

export function validateCartArray(req, res, next) {
  const { error } = cartUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Productos inválidos', errors: error.details });
  }
  next();
}
