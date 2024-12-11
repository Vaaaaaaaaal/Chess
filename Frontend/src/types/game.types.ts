export interface GameState {
  pieces: Record<string, { type: string; color: string }>;
  starter: boolean;
}

export interface CreateGameDto {
  username2: string;
  who_start: boolean;
  game_state?: string;
}

export interface GameResponse {
  id: number;
  player1_id: number;
  username2: string;
  winner_id: boolean | null;
  is_public: boolean;
  current_turn: number;
  game_state: "pending" | "active" | "completed" | "abandoned";
  created_at: Date;
}
