import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGameDto {
  @IsNumber()
  player1_id: number;

  @IsString()
  username2: string;

  @IsString()
  initialState: string;

  @IsBoolean()
  @IsOptional()
  is_public?: boolean;

  constructor(
    player1_id: number,
    username2: string,
    initialState: string,
    is_public?: boolean
  ) {
    this.player1_id = player1_id;
    this.username2 = username2;
    this.initialState = initialState;
    this.is_public = is_public;
  }
}

export class UpdateGameDto {
  @IsNumber()
  @IsOptional()
  winner_id?: number;

  @IsString()
  @IsOptional()
  game_state?: string;

  @IsBoolean()
  @IsOptional()
  is_public?: boolean;

  constructor(winner_id?: number, game_state?: string, is_public?: boolean) {
    this.winner_id = winner_id;
    this.game_state = game_state;
    this.is_public = is_public;
  }
}

export interface GameDto {
  id: number;
  player1_id: number;
  username2: string;
  winner_id: number | null;
  is_public: boolean;
  game_state: string;
  created_at: Date;
}
