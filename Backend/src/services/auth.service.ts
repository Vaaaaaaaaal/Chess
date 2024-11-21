import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService from "./user.service";

const JWT_SECRET = process.env.JWT_SECRET || "votre_secret_jwt";

class AuthService {
  async register(username: string, email: string, password: string) {
    return UserService.createUser(username, email, password);
  }

  async login(email: string, password: string) {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      throw new Error("Mot de passe incorrect");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "20m" }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}

export default new AuthService();
