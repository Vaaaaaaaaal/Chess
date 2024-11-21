import { Body, Controller, Post, Route, Security, Tags } from "tsoa";
import { CreateGameDto, GameResponse } from "../dto/game.dto";
import GameService from "../services/game.service";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Post("/")
  @Security("jwt")
  public async createGame(
    @Body() createGameDto: CreateGameDto
  ): Promise<GameResponse> {
    try {
      const userId = 1;

      const game = await GameService.createGame(userId, createGameDto);
      const gameState = JSON.parse(game.game_state);

      return {
        id: game.id,
        player1_id: game.player1_id,
        player2_id: game.player2_id,
        guest_username: gameState.guest_username,
        status: game.status,
        is_public: game.is_public,
        current_turn: game.current_turn,
        starter: gameState.starter,
        created_at: game.created_at,
      };
    } catch (error: any) {
      this.setStatus(400);
      throw new Error(
        error.message || "Erreur lors de la création de la partie"
      );
    }
  }
}
