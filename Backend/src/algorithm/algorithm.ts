import { Action } from "../enums/action.enum";
import { Color } from "../enums/color.enum";
import { PieceType } from "../enums/piece.enum";
import { FormatedGame } from "../interfaces/formatedGame.interface";
import { MovePieceResult } from "../interfaces/movePieceResult.interface";
import { GameAction } from "../models/gameAction.model";
import { deleteGameStorage, getGameStorage } from "./chessStorage";
import { Game } from "./game";
import { King } from "./Piece/king";
import { Pawn } from "./Piece/pawn";
import { ChessRules } from "./rules/ChessRules";

export function movePiece(
  game: Game,
  i: number,
  j: number,
  toI: number,
  toJ: number
): MovePieceResult {
  const piece = game.getListCase()[i][j].piece;

  if (!piece) return { success: false, result: [] };

  if (
    !ChessRules.isValidMove(
      piece,
      toI,
      toJ,
      game.getListCase(),
      game.getUserTurn()
    )
  ) {
    return { success: false, result: [] };
  }

  // Effectuer le mouvement
  const targetCase = game.getListCase()[toI][toJ];
  if (targetCase.piece) {
    game.getPieceKilled().push(targetCase.piece);
  }

  targetCase.piece = piece;
  game.getListCase()[i][j].piece = undefined;
  piece.i = toI;
  piece.j = toJ;

  // Vérifier la promotion et le statut du roi
  const promotionStatus = ChessRules.checkPromotion(
    piece,
    toI,
    toJ,
    game.getPieceKilled(),
    game.getUserTurn()
  );

  const kingStatus = ChessRules.verifyKingStatus(game.getListCase());

  return {
    success: true,
    result: [...kingStatus, promotionStatus].filter(
      (r) => r !== Action.NOPROMOTION
    ),
  };
}

export function checkTowerUpgrade(game: Game, i: number, j: number): string {
  const piece = game.getListCase()[i][j].piece;

  if (!piece || !(piece instanceof Pawn)) return Action["NOPROMOTION"];

  let pieceKilled = game
    .getPieceKilledByColor(game.getUserTurn())
    .filter((e) => e.pieceType != PieceType.PAWN);

  if (pieceKilled.length == 0) return Action["NOPROMOTION"];

  if (game.getUserTurn() == Color.WHITE && i == 0) {
    game.setPieceToPromote(i, j, Color.WHITE);
    return Action["WHITEPROMOTION"];
  }
  if (game.getUserTurn() == Color.BLACK && i == 7) {
    game.setPieceToPromote(i, j, Color.BLACK);
    return Action["BLACKPROMOTION"];
  }

  return Action["NOPROMOTION"];
}

export async function upgradePiece(
  userId: number,
  piece: PieceType
): Promise<FormatedGame> {
  const game = getGameStorage(userId);

  if (!game) return { success: false };

  if (game.isPieceToPromote() && piece != PieceType.PAWN) {
    let pieceToPromote = game.getPieceToPromote();
    const index = game
      .getPieceKilled()
      .findIndex(
        (p) => p.color == pieceToPromote.color && piece == p.pieceType
      );

    if (index == -1) {
      let returnAction = game.getFormatedGame();
      return { ...returnAction, success: false };
    }

    let pieceKilled = game.getPieceKilled();
    pieceKilled.splice(index, 1);
    game.setPieceKilled(pieceKilled);

    let p = game.getListCase()[pieceToPromote.i][pieceToPromote.j].piece;
    if (!p) return { success: false };
    p.pieceType = piece;

    const gameAction = await GameAction.findOne({
      where: { game_id: game.getIdInDB() },
      order: [["id", "DESC"]],
      limit: 1,
    });
    if (gameAction) {
      gameAction.piece = piece + ":" + pieceToPromote.color;
      await gameAction.save();
    }

    game.setPieceToPromote(-1, -1, Color.WHITE);

    let returnAction = game.getFormatedGame();
    return { ...returnAction, success: true };
  }
  let returnAction = game.getFormatedGame();
  return { ...returnAction, success: false };
}

export function verifyKingBeforeMove(game: Game): boolean {
  let result = false;
  game.getListCase().forEach((element) => {
    element.forEach((c) => {
      if (
        c.piece &&
        c.piece.pieceType == "KING" &&
        c.piece.color == game.getUserTurn()
      ) {
        const r = King.checkKingStatus(game.getListCase(), c.piece);
        result = r.status == Action.KINGSAFE;
      }
    });
  });
  return result;
}

export function verifyPieceToPromote(game: Game): string {
  if (game.isPieceToPromote()) {
    let action = "PROMOTION:" + game.getPieceToPromote().color;
    return action;
  }
  return "NOPROMOTION";
}

export function verifyKingStatus(game: Game, userId: number): string[] {
  let returnAction: string[] = [];

  game.getListCase().forEach((element) => {
    element.forEach((c) => {
      if (c.piece && c.piece.pieceType == "KING") {
        const r = King.checkKingStatus(game.getListCase(), c.piece);
        returnAction.push(r.status + ":" + r.king.color);
        if (r.status == "KINGLOSE") {
          deleteGameStorage(userId);
        }
      }
    });
  });
  return returnAction;
}
