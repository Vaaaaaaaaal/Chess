import { MoveDto } from "../dto/move.dto";
import Game from "../models/game.model";
import Move from "../models/move.model";

class MoveService {
  async createMove(
    gameId: number,
    playerId: number,
    moveDto: MoveDto
  ): Promise<Move> {
    const game = await Game.findByPk(gameId);
    if (!game) {
      throw new Error("Partie non trouvée");
    }

    const isPlayer1 = game.player1_id === playerId;
    const isPlayer2 = game.player2_id === playerId;

    if (!isPlayer1 && !isPlayer2) {
      throw new Error("Vous n'êtes pas un joueur de cette partie");
    }

    const moveCount = await Move.count({ where: { game_id: gameId } });

    const move = await Move.create({
      game_id: gameId,
      player_id: playerId,
      from_position: moveDto.from_position,
      to_position: moveDto.to_position,
      piece_type: moveDto.piece_type,
      captured_piece: moveDto.captured_piece,
      is_check: moveDto.is_check || false,
      is_checkmate: moveDto.is_checkmate || false,
      move_number: moveCount + 1,
    });

    await game.update({
      game_state: moveDto.game_state,
      winner_id: moveDto.is_checkmate ? playerId : null,
    });

    return move;
  }

  async getGameMoves(gameId: number): Promise<Move[]> {
    return Move.findAll({
      where: { game_id: gameId },
      order: [["move_number", "ASC"]],
    });
  }
}

export default new MoveService();
