import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products.controller.js';
import { validateProduct } from '../middleware/validateProduct.js';
import { authJWT } from '../middleware/current.js';
import { requireRole } from '../middleware/roles.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/:pid', getProductById);
router.post('/', authJWT, requireRole('admin'), validateProduct, createProduct);
router.put('/:pid', authJWT, requireRole('admin'), validateProduct, updateProduct);
router.delete('/:pid', authJWT, requireRole('admin'), deleteProduct);

export default router;
