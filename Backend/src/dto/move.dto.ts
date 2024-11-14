import { IsNumber, IsString } from "class-validator";

export class CreateMoveDto {
  @IsNumber()
  game_id!: number;

  @IsNumber()
  move_number!: number;

  @IsString()
  move!: string;
}

export interface MoveDto {
  id: number;
  game_id: number;
  move_number: number;
  move: string;
  created_at: Date;
}
