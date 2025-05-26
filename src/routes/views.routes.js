import { Router } from 'express';
import { ProductModel } from '../models/product.model.js';
import { CartModel } from '../models/cart.model.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const router = Router();

router.get('/products', ensureAuthenticated, async (req, res) => {
  const { page = 1 } = req.query;
  const result = await ProductModel.paginate({}, { page, limit: 10 });

  res.render('products', {
    products: result.docs,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    totalPages: result.totalPages,
    cartId: 'fake-cart-id',
    user: req.user
  });
});

router.get('/products/:pid', async (req, res) => {
  const product = await ProductModel.findById(req.params.pid).lean();
  if (!product) return res.status(404).render('error', { message: 'Producto no encontrado' });
  res.render('product-detail', { product, cartId: 'fake-cart-id' });
});

router.get('/carts/:cid', async (req, res) => {
  const cart = await CartModel.findById(req.params.cid).populate('products.product');
  res.render('cart', { products: cart.products });
});

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

export default router;
