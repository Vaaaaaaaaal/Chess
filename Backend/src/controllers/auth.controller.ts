import { Body, Controller, Get, Post, Route, Security, Tags } from "tsoa";
import {
  LoginDto,
  LoginResponse,
  RegisterDto,
  RegisterResponse,
} from "../dto/auth.dto";
import AuthService from "../services/auth.service";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  @Post("/register")
  public async register(
    @Body() registerDto: RegisterDto
  ): Promise<RegisterResponse> {
    try {
      const user = await AuthService.register(
        registerDto.username,
        registerDto.email,
        registerDto.password
      );

      if (!user) {
        this.setStatus(400);
        throw new Error("Échec de la création de l'utilisateur");
      }

      return {
        message: "Inscription réussie",
        userId: user.id,
      };
    } catch (error: any) {
      this.setStatus(400);
      throw new Error(error.message || "Erreur lors de l'inscription");
    }
  }

  @Post("/login")
  public async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    try {
      const { token, user } = await AuthService.login(
        loginDto.email,
        loginDto.password
      );
      return {
        token,
        userId: user.id,
        username: user.username,
      };
    } catch (error) {
      this.setStatus(401);
      throw error;
    }
  }

  @Get("/verify")
  @Security("jwt")
  public async verifyToken(): Promise<{ message: string; userId: number }> {
    try {
      // @ts-ignore - L'utilisateur est ajouté par le middleware d'authentification
      const userId = this.request?.user?.id;
      return {
        message: "Token valide",
        userId: userId,
      };
    } catch (error) {
      this.setStatus(401);
      throw new Error("Token invalide");
    }
  }
}
