import User from "../models/user.model";

class UserService {
  async createUser(
    username: string,
    email: string,
    password_hash: string
  ): Promise<User> {
    return User.create({ username, email, password_hash });
  }

  async getUserById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async updateUser(
    id: number,
    userData: Partial<User>
  ): Promise<[number, User[]]> {
    return User.update(userData, { where: { id }, returning: true });
  }
}

export default new UserService();
