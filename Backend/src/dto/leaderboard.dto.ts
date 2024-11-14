import { IsNumber } from "class-validator";

export class UpdateLeaderboardDto {
  @IsNumber()
  user_id!: number;

  @IsNumber()
  total_games!: number;

  @IsNumber()
  wins!: number;

  @IsNumber()
  losses!: number;

  @IsNumber()
  draws!: number;
}

export interface LeaderboardDto {
  id: number;
  user_id: number;
  total_games: number;
  wins: number;
  losses: number;
  draws: number;
}
