import { IsBoolean, IsOptional, IsString } from "class-validator";

export class MoveDto {
  @IsString()
  from_position!: string;

  @IsString()
  to_position!: string;

  @IsString()
  piece_type!: string;

  @IsString()
  @IsOptional()
  captured_piece?: string;

  @IsBoolean()
  @IsOptional()
  is_check?: boolean;

  @IsBoolean()
  @IsOptional()
  is_checkmate?: boolean;

  @IsString()
  game_state!: string;
}

export interface MoveResponse {
  id: number;
  game_id: number;
  player_id: number;
  from_position: string;
  to_position: string;
  piece_type: string;
  captured_piece?: string;
  is_check: boolean;
  is_checkmate: boolean;
  move_number: number;
  created_at: Date;
}
