import { ProductService } from '../services/product.service.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const { limit, page, sort, query } = req.query;
    const result = await ProductService.getAll({ query }, { limit, page, sort });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await ProductService.getById(req.params.pid);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await ProductService.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await ProductService.update(req.params.pid, req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await ProductService.delete(req.params.pid);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
