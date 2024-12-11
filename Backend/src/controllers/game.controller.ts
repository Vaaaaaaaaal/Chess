import {
  Body,
  Controller,
  Get,
  Header,
  Path,
  Post,
  Request,
  Response,
  Route,
  Security,
  Tags,
} from "tsoa";
import { CreateGameDto, GameResponse } from "../dto/game.dto";
import { Move, MoveDto } from "../dto/move.dto";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { gameService } from "../services/game.service";
import MoveService from "../services/move.service";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Post("/")
  @Security("jwt")
  public async createGame(
    @Request() request: AuthenticatedRequest,
    @Body() createGameDto: CreateGameDto
  ): Promise<GameResponse> {
    try {
      if (!request.user?.id) {
        this.setStatus(401);
        throw new Error("Utilisateur non authentifié");
      }

      const game = await gameService.createGame(request.user.id, createGameDto);

      return {
        id: game.id,
        player1_id: game.player1_id,
        username2: createGameDto.username2,
        winner_id: null,
        is_public: game.is_public,
        game_state: game.game_state,
        created_at: game.created_at,
        who_start: game.who_start,
      };
    } catch (error: any) {
      this.setStatus(error.status || 400);
      throw new Error(
        error.message || "Erreur lors de la création de la partie"
      );
    }
  }

  @Get("{id}")
  public async getGame(@Path() id: number): Promise<GameResponse> {
    try {
      const game = await gameService.getGameById(id);

      if (!game) {
        this.setStatus(404);
        throw new Error("Partie non trouvée");
      }

      return {
        id: game.id,
        player1_id: game.player1_id,
        username2: game.username2,
        winner_id: game.winner_id,
        is_public: game.is_public,
        game_state: game.game_state,
        created_at: game.created_at,
        who_start: game.who_start,
      };
    } catch (error: any) {
      this.setStatus(error.status || 400);
      throw new Error(
        error.message || "Erreur lors de la récupération de la partie"
      );
    }
  }

  @Get("cache/status")
  public async getCacheStatus() {
    try {
      const cacheContent = await gameService.getCacheContent();
      const cacheStats = await gameService.getCacheStats();

      return {
        content: cacheContent,
        stats: cacheStats,
      };
    } catch (error) {
      this.setStatus(500);
      throw new Error("Erreur lors de la récupération du cache");
    }
  }

  @Get("{gameId}/possible-moves/{position}")
  @Response<{ message: string }>(400, "Position invalide")
  @Response<{ message: string }>(404, "Partie non trouvée")
  /**
   * @summary Obtenir les mouvements possibles pour une pièce
   * @param gameId ID de la partie
   * @param position Position de la pièce (ex: 'e2')
   */
  public async getPossibleMoves(
    @Path() gameId: number,
    @Path() position: string
  ): Promise<string[]> {
    try {
      const game = await gameService.getGameById(gameId);
      if (!game) {
        this.setStatus(404);
        throw new Error("Partie non trouvée");
      }

      if (!/^[a-h][1-8]$/.test(position)) {
        this.setStatus(400);
        throw new Error("Position invalide");
      }

      return await gameService.getPossibleMoves(gameId, position);
    } catch (error) {
      this.setStatus(500);
      throw error;
    }
  }

  @Post("{gameId}/move")
  @Security("jwt")
  @Response<{ message: string }>(400, "Mouvement invalide")
  @Response<{ message: string }>(404, "Partie non trouvée")
  /**
   * @summary Effectuer un mouvement de pièce
   * @description Permet de déplacer une pièce et de promouvoir un pion si nécessaire
   */
  public async makeMove(
    @Path() gameId: number,
    @Body() moveDto: MoveDto,
    @Request() request: AuthenticatedRequest
  ): Promise<Move> {
    try {
      const playerId = request.user?.id;
      if (!playerId) {
        this.setStatus(401);
        throw new Error("Utilisateur non authentifié");
      }

      const game = await gameService.getGameById(gameId);
      if (!game) {
        this.setStatus(404);
        throw new Error("Partie non trouvée");
      }

      return await MoveService.createMove(gameId, playerId, moveDto);
    } catch (error) {
      this.setStatus(500);
      throw error;
    }
  }

  @Get("{gameId}/positions")
  @Response<{ message: string }>(304, "Positions non modifiées")
  @Response<{ message: string }>(404, "Partie non trouvée")
  /**
   * @summary Obtenir les positions des pièces d'une partie
   * @param gameId ID de la partie
   */
  public async getGamePositions(
    @Path() gameId: number,
    @Header("if-none-match") ifNoneMatch?: string
  ): Promise<Record<string, { type: string; color: string }> | void> {
    try {
      const game = await gameService.getGameById(gameId);
      if (!game) {
        this.setStatus(404);
        throw new Error("Partie non trouvée");
      }

      // Récupérer les positions en cache
      const cachedPositions = await gameService.getCachedPositions(gameId);
      console.log("Cache key:", `game_positions_${gameId}`);
      console.log("Cached positions:", cachedPositions);

      if (cachedPositions) {
        const etag = `"${Buffer.from(JSON.stringify(cachedPositions)).toString(
          "base64"
        )}"`;
        console.log("Generated ETag:", etag);
        console.log("Received If-None-Match:", ifNoneMatch);

        if (ifNoneMatch === etag) {
          console.log("Cache hit");
          this.setStatus(304);
        }
        this.setHeader("ETag", etag);
        return cachedPositions;
      }

      console.log("No cache found, calculating positions...");
      const positions = await gameService.calculatePiecesPositions(gameId);
      await gameService.setCachedPositions(gameId, positions);

      const etag = `"${Buffer.from(JSON.stringify(positions)).toString(
        "base64"
      )}"`;
      this.setHeader("ETag", etag);

      return positions;
    } catch (error) {
      this.setStatus(500);
      throw error;
    }
  }
}
