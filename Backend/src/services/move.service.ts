import { MoveDto } from "../dto/move.dto";
import Game from "../models/game.model";
import Move from "../models/move.model";

class MoveService {
  async createMove(
    gameId: number,
    playerId: number,
    moveDto: MoveDto
  ): Promise<Move> {
    // Vérifier si la partie existe
    const game = await Game.findByPk(gameId);
    if (!game) {
      throw new Error("Partie non trouvée");
    }

    // Vérifier si c'est le tour du joueur
    if (game.status !== "active") {
      throw new Error("La partie n'est pas active");
    }

    const isPlayer1 = game.player1_id === playerId;
    const isPlayer2 = game.player2_id === playerId;

    if (!isPlayer1 && !isPlayer2) {
      throw new Error("Vous n'êtes pas un joueur de cette partie");
    }

    if (
      (game.current_turn === 1 && !isPlayer1) ||
      (game.current_turn === 2 && !isPlayer2)
    ) {
      throw new Error("Ce n'est pas votre tour");
    }

    // Compter le nombre de mouvements existants
    const moveCount = await Move.count({ where: { game_id: gameId } });

    // Créer le mouvement
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

    // Mettre à jour l'état de la partie
    await game.update({
      current_turn: game.current_turn === 1 ? 2 : 1,
      game_state: moveDto.game_state,
      status: moveDto.is_checkmate ? "completed" : "active",
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