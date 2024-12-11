import NodeCache from "node-cache";
import { CreateGameDto } from "../dto/game.dto";
import Game from "../models/game.model";
import Move from "../models/move.model";

// Création d'une instance de cache avec un TTL de 1 heure
const gameCache = new NodeCache({
  stdTTL: 3600, // 1 heure en secondes
  checkperiod: 600, // Vérification toutes les 10 minutes
  useClones: false, // Pour de meilleures performances
});

class GameService {
  async createGame(
    player1_id: number,
    createGameDto: CreateGameDto
  ): Promise<Game> {
    const game = await Game.create({
      player1_id,
      username2: createGameDto.username2,
      winner_id: null,
      is_public: true,
      game_state: "en_cours",
      created_at: new Date(),
      who_start: createGameDto.who_start,
    });

    // Initialiser le cache avec les positions initiales
    const initialPositions = await this.calculatePiecesPositions(game.id);
    this.setCachedPositions(game.id, initialPositions);

    return game;
  }

  async getGameById(id: number): Promise<Game | null> {
    return Game.findByPk(id);
  }

  private getCacheKey(gameId: number): string {
    return `game_positions_${gameId}`;
  }

  async getCachedPositions(
    gameId: number
  ): Promise<Record<string, { type: string; color: string }> | null> {
    return gameCache.get(this.getCacheKey(gameId)) || null;
  }

  async setCachedPositions(
    gameId: number,
    positions: Record<string, { type: string; color: string }>
  ): Promise<void> {
    gameCache.set(this.getCacheKey(gameId), positions);
  }

  async getCurrentPositions(
    gameId: number
  ): Promise<Record<string, { type: string; color: string }>> {
    // Vérifier d'abord le cache
    const cachedPositions = await this.getCachedPositions(gameId);
    if (cachedPositions !== null) {
      return cachedPositions;
    }

    // Si pas en cache, recalculer et mettre en cache
    const positions = await this.calculatePiecesPositions(gameId);
    this.setCachedPositions(gameId, positions);
    return positions;
  }

  async updateGamePositions(gameId: number): Promise<void> {
    const positions = await this.calculatePiecesPositions(gameId);
    this.setCachedPositions(gameId, positions);
  }

  async calculatePiecesPositions(
    gameId: number
  ): Promise<Record<string, { type: string; color: string }>> {
    // Position initiale des pièces
    const initialPositions: Record<string, { type: string; color: string }> = {
      // Pièces blanches
      a1: { type: "rook", color: "white" },
      b1: { type: "knight", color: "white" },
      c1: { type: "bishop", color: "white" },
      d1: { type: "queen", color: "white" },
      e1: { type: "king", color: "white" },
      f1: { type: "bishop", color: "white" },
      g1: { type: "knight", color: "white" },
      h1: { type: "rook", color: "white" },
      a2: { type: "pawn", color: "white" },
      b2: { type: "pawn", color: "white" },
      c2: { type: "pawn", color: "white" },
      d2: { type: "pawn", color: "white" },
      e2: { type: "pawn", color: "white" },
      f2: { type: "pawn", color: "white" },
      g2: { type: "pawn", color: "white" },
      h2: { type: "pawn", color: "white" },

      // Pièces noires
      a8: { type: "rook", color: "black" },
      b8: { type: "knight", color: "black" },
      c8: { type: "bishop", color: "black" },
      d8: { type: "queen", color: "black" },
      e8: { type: "king", color: "black" },
      f8: { type: "bishop", color: "black" },
      g8: { type: "knight", color: "black" },
      h8: { type: "rook", color: "black" },
      a7: { type: "pawn", color: "black" },
      b7: { type: "pawn", color: "black" },
      c7: { type: "pawn", color: "black" },
      d7: { type: "pawn", color: "black" },
      e7: { type: "pawn", color: "black" },
      f7: { type: "pawn", color: "black" },
      g7: { type: "pawn", color: "black" },
      h7: { type: "pawn", color: "black" },
    };

    // Récupérer tous les mouvements de la partie
    const moves = await Move.findAll({
      where: { game_id: gameId },
      order: [["move_number", "ASC"]],
    });

    if (moves.length === 0) {
      return initialPositions;
    }

    // Copier les positions initiales
    let currentPositions = { ...initialPositions };

    // Appliquer chaque mouvement
    for (const move of moves) {
      // Supprimer la pièce de sa position d'origine
      const piece = currentPositions[move.from_position];
      delete currentPositions[move.from_position];

      // Si une pièce a été capturée, la supprimer
      if (move.captured_piece) {
        delete currentPositions[move.to_position];
      }

      // Placer la pièce à sa nouvelle position
      currentPositions[move.to_position] = piece;
    }

    return currentPositions;
  }

  async getPossibleMoves(gameId: number, position: string): Promise<string[]> {
    const currentPositions = await this.getCurrentPositions(gameId);
    const piece = currentPositions[position];

    if (!piece) {
      return [];
    }

    const possibleMoves = await this.getPossibleMovesWithoutCheckValidation(
      gameId,
      position
    );

    // Filtrer les mouvements qui mettraient ou laisseraient le roi en échec
    const validMoves: string[] = [];

    for (const move of possibleMoves) {
      // Simuler le mouvement
      const simulatedPositions = { ...currentPositions };
      delete simulatedPositions[position];
      simulatedPositions[move] = piece;

      // Sauvegarder temporairement les positions actuelles
      const tempPositions = await this.getCachedPositions(gameId);

      // Mettre à jour temporairement le cache avec la simulation
      this.setCachedPositions(gameId, simulatedPositions);

      // Vérifier si le roi est en échec après ce mouvement
      const color = piece.color === "white" ? "white" : "black";
      const isInCheck = await this.isKingInCheck(gameId, color);

      // Restaurer les positions originales
      if (tempPositions) {
        this.setCachedPositions(gameId, tempPositions);
      }

      if (!isInCheck) {
        validMoves.push(move);
      }
    }

    return validMoves;
  }

  async isKingInCheck(
    gameId: number,
    color: "white" | "black"
  ): Promise<boolean> {
    const currentPositions = await this.getCurrentPositions(gameId);

    // Trouver la position du roi
    let kingPosition = "";
    for (const [position, piece] of Object.entries(currentPositions)) {
      if (piece.type === "king" && piece.color === color) {
        kingPosition = position;
        break;
      }
    }

    if (!kingPosition) {
      return false;
    }

    // Vérifier si une pièce adverse peut atteindre le roi
    for (const [position, piece] of Object.entries(currentPositions)) {
      if (piece.color === color) continue;

      const possibleMoves = await this.getPossibleMovesWithoutCheckValidation(
        gameId,
        position
      );

      if (possibleMoves.includes(kingPosition)) {
        return true;
      }
    }

    return false;
  }

  // Version de getPossibleMoves sans vérification d'échec pour éviter la récursion infinie
  private async getPossibleMovesWithoutCheckValidation(
    gameId: number,
    position: string
  ): Promise<string[]> {
    // Copier le code existant de getPossibleMoves mais sans la vérification d'échec
    // Pour éviter une boucle infinie lors de la vérification
    // Le code est identique à getPossibleMoves mais sans la partie échec
    const currentPositions = await this.getCurrentPositions(gameId);
    const piece = currentPositions[position];

    if (!piece) {
      return [];
    }

    const possibleMoves: string[] = [];
    const [file, rank] = position.split("");
    const fileIndex = "abcdefgh".indexOf(file.toLowerCase());
    const rankNum = parseInt(rank);

    const isPathClear = (targetFile: number, targetRank: number): boolean => {
      const targetPos = `${String.fromCharCode(97 + targetFile)}${targetRank}`;
      const targetPiece = currentPositions[targetPos];

      // Si la case est vide ou contient une pièce adverse
      return !targetPiece || targetPiece.color !== piece.color;
    };

    const addMoveIfValid = (targetFile: number, targetRank: number) => {
      if (
        targetFile >= 0 &&
        targetFile < 8 &&
        targetRank > 0 &&
        targetRank <= 8 &&
        isPathClear(targetFile, targetRank)
      ) {
        possibleMoves.push(
          `${String.fromCharCode(97 + targetFile)}${targetRank}`
        );
      }
    };

    switch (piece.type) {
      case "pawn":
        const direction = piece.color === "white" ? 1 : -1;
        const startRank = piece.color === "white" ? 2 : 7;

        // Mouvement simple vers l'avant
        if (!currentPositions[`${file}${rankNum + direction}`]) {
          addMoveIfValid(fileIndex, rankNum + direction);

          // Double mouvement depuis la position initiale
          if (
            rankNum === startRank &&
            !currentPositions[`${file}${rankNum + 2 * direction}`]
          ) {
            addMoveIfValid(fileIndex, rankNum + 2 * direction);
          }
        }

        // Captures en diagonale
        [-1, 1].forEach((offset) => {
          const targetPos = `${String.fromCharCode(97 + fileIndex + offset)}${
            rankNum + direction
          }`;
          const targetPiece = currentPositions[targetPos];
          if (targetPiece && targetPiece.color !== piece.color) {
            addMoveIfValid(fileIndex + offset, rankNum + direction);
          }
        });
        break;

      case "knight":
        const knightMoves = [
          [-2, -1],
          [-2, 1],
          [-1, -2],
          [-1, 2],
          [1, -2],
          [1, 2],
          [2, -1],
          [2, 1],
        ];
        knightMoves.forEach(([fileOffset, rankOffset]) => {
          addMoveIfValid(fileIndex + fileOffset, rankNum + rankOffset);
        });
        break;

      case "bishop":
        const directions = [
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1],
        ];
        for (const [fileOffset, rankOffset] of directions) {
          for (let i = 1; i <= 7; i++) {
            const targetFile = fileIndex + fileOffset * i;
            const targetRank = rankNum + rankOffset * i;

            // Vérifier si la case est valide
            if (
              targetFile < 0 ||
              targetFile >= 8 ||
              targetRank <= 0 ||
              targetRank > 8
            ) {
              break;
            }

            // Vérifier si le chemin est bloqué
            const targetPos = `${String.fromCharCode(
              97 + targetFile
            )}${targetRank}`;
            const targetPiece = currentPositions[targetPos];

            if (targetPiece) {
              // Si c'est une pièce adverse, on peut la capturer mais on ne peut pas aller plus loin
              if (targetPiece.color !== piece.color) {
                addMoveIfValid(targetFile, targetRank);
              }
              break; // On arrête dans cette direction car une pièce bloque le chemin
            }

            addMoveIfValid(targetFile, targetRank);
          }
        }
        break;

      case "rook":
        const rookDirections = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
        ];
        for (const [fileOffset, rankOffset] of rookDirections) {
          for (let i = 1; i <= 7; i++) {
            const targetFile = fileIndex + fileOffset * i;
            const targetRank = rankNum + rankOffset * i;
            if (!isPathClear(targetFile, targetRank)) break;
            addMoveIfValid(targetFile, targetRank);
          }
        }
        break;

      case "queen":
        const queenDirections = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ];
        for (const [fileOffset, rankOffset] of queenDirections) {
          for (let i = 1; i <= 7; i++) {
            const targetFile = fileIndex + fileOffset * i;
            const targetRank = rankNum + rankOffset * i;
            if (!isPathClear(targetFile, targetRank)) break;
            addMoveIfValid(targetFile, targetRank);
          }
        }
        break;

      case "king":
        const kingMoves = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ];
        kingMoves.forEach(([fileOffset, rankOffset]) => {
          addMoveIfValid(fileIndex + fileOffset, rankNum + rankOffset);
        });
        break;
    }

    return possibleMoves;
  }

  async isCheckmate(
    gameId: number,
    color: "white" | "black"
  ): Promise<boolean> {
    // Vérifier d'abord si le roi est en échec
    const isInCheck = await this.isKingInCheck(gameId, color);
    if (!isInCheck) {
      return false;
    }

    // Récupérer toutes les pièces de la couleur en échec
    const currentPositions = await this.getCurrentPositions(gameId);
    const pieces = Object.entries(currentPositions).filter(
      ([_, piece]) => piece.color === color
    );

    // Pour chaque pièce, vérifier si elle a des mouvements valides
    for (const [position] of pieces) {
      const possibleMoves = await this.getPossibleMoves(gameId, position);
      if (possibleMoves.length > 0) {
        return false; // Si une pièce peut bouger, ce n'est pas échec et mat
      }
    }

    // Si aucune pièce ne peut bouger, c'est échec et mat
    return true;
  }

  async reloadCache(
    gameId: number
  ): Promise<Record<string, { type: string; color: string }>> {
    const positions = await this.calculatePiecesPositions(gameId);
    this.setCachedPositions(gameId, positions);
    return positions;
  }

  // Modifier getCacheContent pour inclure plus d'informations
  async getCacheContent(): Promise<Record<string, any>> {
    const keys = gameCache.keys();
    const cacheContent: Record<string, any> = {};

    for (const key of keys) {
      const value =
        gameCache.get<Record<string, { type: string; color: string }>>(key);
      if (value) {
        const gameId = key.replace("game_positions_", "");
        cacheContent[gameId] = {
          positions: value,
          timestamp: gameCache.getTtl(key),
        };
      }
    }

    // Si le cache est vide, essayons de charger les parties actives
    if (Object.keys(cacheContent).length === 0) {
      const activeGames = await Game.findAll({
        where: { game_state: "en_cours" },
      });

      for (const game of activeGames) {
        const positions = await this.reloadCache(game.id);
        cacheContent[game.id] = {
          positions,
          timestamp: Date.now() + 3600000, // TTL en millisecondes
        };
      }
    }

    return cacheContent;
  }

  async getCacheStats(): Promise<{
    keys: number;
    hits: number;
    misses: number;
    ttl: number;
  }> {
    return {
      keys: gameCache.keys().length,
      hits: gameCache.getStats().hits,
      misses: gameCache.getStats().misses,
      ttl: gameCache.options.stdTTL ?? 0,
    };
  }
}

export const gameService = new GameService();
