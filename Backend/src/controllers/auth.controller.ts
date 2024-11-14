import { Body, Controller, Post, Route, Tags } from "tsoa";
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
      return {
        message: "Inscription réussie",
        userId: user.id,
      };
    } catch (error) {
      this.setStatus(400);
      return {
        message: "Erreur lors de l'inscription",
        userId: 0,
      };
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
}
