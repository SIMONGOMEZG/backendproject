import { CartDAO } from '../config/dao.config.js';

export class CartService {
  static async getAll() {
    return await CartDAO.getAll();
  }

  static async getById(id) {
    return await CartDAO.getById(id);
  }

  static async create() {
    return await CartDAO.create();
  }

  static async addProduct(cartId, productId) {
    return await CartDAO.addProduct(cartId, productId);
  }

  static async updateProductQty(cartId, productId, qty) {
    return await CartDAO.updateProductQty(cartId, productId, qty);
  }

  static async updateAll(cartId, products) {
    return await CartDAO.updateAll(cartId, products);
  }

  static async removeProduct(cartId, productId) {
    return await CartDAO.removeProduct(cartId, productId);
  }

  static async clear(cartId) {
    return await CartDAO.clearCart(cartId);
  }
}
