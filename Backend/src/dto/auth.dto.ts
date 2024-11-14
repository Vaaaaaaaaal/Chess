import { IsEmail, IsString, MinLength } from "class-validator";

export interface RegisterResponse {
  message: string;
  userId: number;
}

export interface LoginResponse {
  token: string;
  userId: number;
  username: string;
}

export class RegisterDto {
  @IsString()
  @MinLength(3)
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
