import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGameDto {
  @IsNumber()
  player1_id!: number;

  @IsString()
  @IsOptional()
  username2?: string;

  @IsString()
  initialState!: string;

  @IsBoolean()
  @IsOptional()
  is_public?: boolean = false;
}

export interface GameResponse {
  id: number;
  player1_id: number;
  username2?: string;
  winner_id?: number;
  is_public: boolean;
  status: string;
  game_state: string;
  created_at: Date;
  updated_at: Date;
}
