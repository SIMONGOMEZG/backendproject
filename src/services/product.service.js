import { ProductDAO } from '../config/dao.config.js';

export class ProductService {
  static async getAll(filter = {}, options = {}) {
    return await ProductDAO.getAll(filter, options);
  }

  static async getById(id) {
    return await ProductDAO.getById(id);
  }

  static async create(data) {
    return await ProductDAO.create(data);
  }

  static async update(id, data) {
    return await ProductDAO.update(id, data);
  }

  static async delete(id) {
    return await ProductDAO.delete(id);
  }
}
