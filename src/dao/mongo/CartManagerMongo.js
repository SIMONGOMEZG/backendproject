import { CartModel } from '../../models/cart.model.js';

export class CartManagerMongo {
  async getAll() {
    return await CartModel.find().populate('products.product');
  }

  async getById(id) {
    return await CartModel.findById(id).populate('products.product');
  }

  async create() {
    const newCart = new CartModel({ products: [] });
    return await newCart.save();
  }

  async addProduct(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    const existing = cart.products.find(p => p.product.equals(productId));

    if (existing) existing.quantity += 1;
    else cart.products.push({ product: productId, quantity: 1 });

    return await cart.save();
  }

  async updateProductQty(cartId, productId, qty) {
    const cart = await CartModel.findById(cartId);
    const item = cart.products.find(p => p.product.equals(productId));
    if (item) item.quantity = qty;
    return await cart.save();
  }

  async updateAll(cartId, products) {
    return await CartModel.findByIdAndUpdate(cartId, { products }, { new: true });
  }

  async removeProduct(cartId, productId) {
    return await CartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: { product: productId } } },
      { new: true }
    );
  }

  async clearCart(cartId) {
    return await CartModel.findByIdAndUpdate(cartId, { products: [] }, { new: true });
  }
}
