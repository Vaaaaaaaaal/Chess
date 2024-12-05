export interface CreateGameDto {
  username2: string;
  starter: boolean;
}

export interface GameResponse {
  id: number;
  player1_id: number;
  username2: string;
  winner_id: boolean | null;
  is_public: boolean;
  created_at: Date;
  game_state: string;
}
