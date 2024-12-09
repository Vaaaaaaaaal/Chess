import {
  Body,
  Controller,
  Get,
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
import GameService from "../services/game.service";
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

      const game = await GameService.createGame(request.user.id, createGameDto);

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
      const game = await GameService.getGameById(id);

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
      const cacheContent = await GameService.getCacheContent();
      const cacheStats = await GameService.getCacheStats();

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
      const game = await GameService.getGameById(gameId);
      if (!game) {
        this.setStatus(404);
        throw new Error("Partie non trouvée");
      }

      if (!/^[a-h][1-8]$/.test(position)) {
        this.setStatus(400);
        throw new Error("Position invalide");
      }

      return await GameService.getPossibleMoves(gameId, position);
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

      const game = await GameService.getGameById(gameId);
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
}
