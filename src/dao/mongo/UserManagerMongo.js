import { UserModel } from '../../models/user.model.js';

export class UserManagerMongo {
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async findById(id) {
    return await UserModel.findById(id);
  }

  async create(data) {
    return await UserModel.create(data);
  }
}
