import Move from "../models/move.model";

class MoveService {
  async createMove(
    game_id: number,
    move_number: number,
    move: string
  ): Promise<Move> {
    return Move.create({ game_id, move_number, move });
  }

  async getMovesByGameId(game_id: number): Promise<Move[]> {
    return Move.findAll({ where: { game_id } });
  }
}

export default new MoveService();
