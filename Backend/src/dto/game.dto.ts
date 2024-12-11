export interface CreateGameDto {
  username2: string;
  who_start: boolean;
  is_public: boolean;
}

export interface GameResponse {
  id: number;
  player1_id: number;
  username2: string;
  winner_id: number | null;
  is_public: boolean;
  created_at: Date;
  game_state: any;
  who_start: boolean;
}
