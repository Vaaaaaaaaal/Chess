export interface CreateGameDto {
  is_public: boolean;
  guest_username: string;
  starter: boolean;
}

export interface GameResponse {
  id: number;
  player1_id: number;
  player2_id?: number | null;
  guest_username: string;
  status: "pending" | "active" | "completed" | "abandoned";
  is_public: boolean;
  current_turn: number;
  starter: boolean;
  created_at: Date;
}
