import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Request,
  Route,
  Security,
  Tags,
} from "tsoa";
import { CreateGameDto, GameResponse } from "../dto/game.dto";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import GameService from "../services/game.service";

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
}
