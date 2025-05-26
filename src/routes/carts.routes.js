import { Router } from 'express';
import { purchaseCart } from '../controllers/carts.controller.js';
import { authJWT } from '../middleware/current.js';
import { authorizeAction } from '../middleware/authorize.js';

const router = Router();

router.post('/:cid/purchase', authJWT, authorizeAction('user'), purchaseCart);

export default router;
