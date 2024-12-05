import { Body, Controller, Post, Request, Route, Security, Tags } from "tsoa";
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
      };
    } catch (error: any) {
      this.setStatus(error.status || 400);
      throw new Error(
        error.message || "Erreur lors de la création de la partie"
      );
    }
  }
}
