import { Action } from "../../enums/action.enum";
import { Color } from "../../enums/color.enum";
import { MoveError } from "../../enums/moveError.enum";
import { PieceType } from "../../enums/piece.enum";
import { Case } from "../case";
import { King } from "../Piece/king";
import { Piece } from "../Piece/piece";

export class ChessRules {
  static isValidMove(
    piece: Piece,
    toI: number,
    toJ: number,
    listCase: Case[][],
    userTurn: Color
  ): { valid: boolean; error?: MoveError } {
    if (!this.isInBounds(toI, toJ))
      return { valid: false, error: MoveError.INVALID_MOVE };

    if (piece.color !== userTurn)
      return { valid: false, error: MoveError.INVALID_TURN };

    if (!piece.move(toI, toJ, listCase))
      return { valid: false, error: MoveError.INVALID_MOVE };

    if (piece instanceof King) {
      const kingStatus = this.isValidKingMove(piece, toI, toJ, listCase);
      if (!kingStatus.valid) {
        return { valid: false, error: MoveError.KING_IN_CHECK };
      }
    }

    return { valid: true };
  }

  static isInBounds(i: number, j: number): boolean {
    return i >= 0 && i < 8 && j >= 0 && j < 8;
  }

  private static isValidKingMove(
    king: King,
    toI: number,
    toJ: number,
    listCase: Case[][]
  ): boolean {
    const copyKing = new King(
      king.pieceType,
      king.color === Color.BLACK ? 0 : 1,
      toI,
      toJ
    );

    const kingStatus = King.checkKingStatus(listCase, copyKing);
    return kingStatus.status === Action.KINGSAFE;
  }

  static checkPromotion(
    piece: Piece | undefined,
    i: number,
    j: number,
    pieceKilled: Piece[],
    userTurn: Color
  ): string {
    if (!piece || !(piece instanceof Pawn)) return Action.NOPROMOTION;

    const availablePieces = pieceKilled.filter(
      (p) => p.pieceType !== PieceType.PAWN && p.color === userTurn
    );

    if (availablePieces.length === 0) return Action.NOPROMOTION;

    if (
      (userTurn === Color.WHITE && i === 0) ||
      (userTurn === Color.BLACK && i === 7)
    ) {
      return userTurn === Color.WHITE
        ? Action.WHITEPROMOTION
        : Action.BLACKPROMOTION;
    }

    return Action.NOPROMOTION;
  }

  static verifyKingStatus(listCase: Case[][]): string[] {
    const results: string[] = [];

    listCase.forEach((row) => {
      row.forEach((cell) => {
        if (cell.piece?.pieceType === PieceType.KING) {
          const status = King.checkKingStatus(listCase, cell.piece);
          results.push(`${status.status}:${status.king.color}`);
        }
      });
    });

    return results;
  }
}