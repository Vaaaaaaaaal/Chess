export interface MoveDto {
  from_position: string;
  to_position: string;
  promotion?: string;
}

export interface Move {
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
  promotion?: string;
}
