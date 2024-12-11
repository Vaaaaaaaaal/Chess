import type { Move as MoveInterface } from "../dto/move.dto";
import { MoveDto } from "../dto/move.dto";
import Game from "../models/game.model";
import Move from "../models/move.model";
import { gameService } from "./game.service";

class MoveService {
  async createMove(
    gameId: number,
    playerId: number,
    moveDto: MoveDto
  ): Promise<MoveInterface> {
    const game = await Game.findByPk(gameId);
    if (!game) {
      throw new Error("Partie non trouvée");
    }

    const currentPositions = await gameService.getCurrentPositions(gameId);
    const piece = currentPositions[moveDto.from_position];

    // Vérifier si c'est une promotion de pion valide
    if (piece.type === "pawn") {
      const targetRank = moveDto.to_position[1];
      const isPromotion =
        (piece.color === "white" && targetRank === "8") ||
        (piece.color === "black" && targetRank === "1");

      if (isPromotion) {
        if (!moveDto.promotion) {
          throw new Error("La promotion est requise pour ce mouvement");
        }

        if (
          !["queen", "rook", "bishop", "knight"].includes(moveDto.promotion)
        ) {
          throw new Error("Type de promotion invalide");
        }
      } else if (moveDto.promotion) {
        throw new Error("La promotion n'est pas possible pour ce mouvement");
      }
    }

    // Vérifier si le mouvement est valide
    const possibleMoves = await gameService.getPossibleMoves(
      gameId,
      moveDto.from_position
    );
    if (!possibleMoves.includes(moveDto.to_position)) {
      throw new Error("Mouvement invalide");
    }

    const moveCount = await Move.count({ where: { game_id: gameId } });

    // Simuler le mouvement pour vérifier l'échec
    const simulatedPositions = { ...currentPositions };
    delete simulatedPositions[moveDto.from_position];
    simulatedPositions[moveDto.to_position] = piece;

    // Vérifier si le mouvement met l'adversaire en échec
    const opponentColor = piece.color === "white" ? "black" : "white";
    const isCheck = await gameService.isKingInCheck(gameId, opponentColor);

    // Vérifier si c'est un échec et mat
    let isCheckmate = false;
    if (isCheck) {
      isCheckmate = await gameService.isCheckmate(gameId, opponentColor);
    }

    const move = await Move.create({
      game_id: gameId,
      player_id: playerId,
      from_position: moveDto.from_position,
      to_position: moveDto.to_position,
      piece_type: piece.type,
      captured_piece: currentPositions[moveDto.to_position]?.type || null,
      is_check: isCheck,
      is_checkmate: isCheckmate,
      move_number: moveCount + 1,
      promotion: moveDto.promotion || null,
    });

    await game.update({
      game_state: isCheckmate ? "terminée" : "en_cours",
      winner_id: isCheckmate ? playerId : null,
    });

    // Mettre à jour le cache des positions
    if (moveDto.promotion) {
      const updatedPositions = { ...currentPositions };
      delete updatedPositions[moveDto.from_position];
      updatedPositions[moveDto.to_position] = {
        type: moveDto.promotion,
        color: piece.color,
      };
      await gameService.setCachedPositions(gameId, updatedPositions);
    } else {
      await gameService.updateGamePositions(gameId);
    }

    return move;
  }

  async getGameMoves(gameId: number): Promise<MoveInterface[]> {
    return Move.findAll({
      where: { game_id: gameId },
      order: [["move_number", "ASC"]],
    });
  }
}

export default new MoveService();
