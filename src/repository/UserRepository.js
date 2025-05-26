import { UserDAO } from '../config/dao.config.js';

export class UserRepository {
  async getByEmail(email) {
    return await UserDAO.findByEmail(email);
  }

  async getById(id) {
    return await UserDAO.findById(id);
  }

  async create(user) {
    return await UserDAO.create(user);
  }
}
