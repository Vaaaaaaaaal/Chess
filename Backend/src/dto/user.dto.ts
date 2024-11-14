import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export interface UserDto {
  id: number;
  username: string;
  email: string;
  created_at: Date;
}
