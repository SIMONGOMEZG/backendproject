import { CartService } from '../services/cart.service.js';
import { ProductService } from '../services/product.service.js';
import { TicketModel } from '../models/ticket.model.js';
import { v4 as uuidv4 } from 'uuid';

export const purchaseCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await CartService.getById(cid);

    let total = 0;
    const rejected = [];

    for (const item of cart.products) {
      const product = await ProductService.getById(item.product._id);
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await ProductService.update(product._id, { stock: product.stock });
        total += product.price * item.quantity;
      } else {
        rejected.push(item.product._id);
      }
    }

    const ticket = await TicketModel.create({
      code: uuidv4(),
      amount: total,
      purchaser: req.user.email
    });

    cart.products = cart.products.filter(p =>
      rejected.includes(p.product._id.toString())
    );
    await cart.save();

    res.json({
      status: 'success',
      ticket,
      rejectedProducts: rejected
    });
  } catch (err) {
    next(err);
  }
};
