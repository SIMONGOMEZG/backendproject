import { UserDAO } from '../config/dao.config.js';

export class UserService {
  static async findByEmail(email) {
    return await UserDAO.findByEmail(email);
  }

  static async findById(id) {
    return await UserDAO.findById(id);
  }

  static async create(data) {
    return await UserDAO.create(data);
  }
}
