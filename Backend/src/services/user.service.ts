import bcrypt from "bcrypt";
import { Op } from "sequelize";
import User from "../models/user.model";

class UserService {
  async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new Error(
        "Un utilisateur avec cet email ou ce nom d'utilisateur existe déjà"
      );
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await User.create({
        username,
        email,
        password_hash: hashedPassword,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      throw new Error("Impossible de créer l'utilisateur");
    }
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
