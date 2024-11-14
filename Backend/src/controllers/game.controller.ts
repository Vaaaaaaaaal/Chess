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
import GameService from "../services/game.service";

@Route("games")
@Tags("Game")
export class GameController extends Controller {
  @Security("jwt")
  @Post()
  public async createGame(
    @Body() createGameDto: CreateGameDto,
    @Request() request: any
  ): Promise<GameResponse> {
    try {
      console.log("User ID from token:", request.user.id);
      console.log("Create game DTO:", createGameDto);

      const game = await GameService.createGame({
        ...createGameDto,
        player1_id: request.user.id,
      });

      return this.mapGameToResponse(game);
    } catch (error) {
      console.error("Game creation error:", error);
      this.setStatus(400);
      throw error;
    }
  }

  @Get("{id}")
  public async getGame(@Path() id: number): Promise<GameResponse> {
    const game = await GameService.getGame(id);
    if (!game) {
      this.setStatus(404);
      throw new Error("Partie non trouvée");
    }
    return this.mapGameToResponse(game);
  }

  @Security("jwt")
  @Get()
  public async getAllGames(): Promise<GameResponse[]> {
    const games = await GameService.getPublicGames();
    return games.map(this.mapGameToResponse);
  }

  @Get("public")
  public async getPublicGames(): Promise<GameResponse[]> {
    const games = await GameService.getPublicGames();
    return games.map(this.mapGameToResponse);
  }

  @Security("jwt")
  @Get("my")
  public async getMyGames(@Request() request: any): Promise<GameResponse[]> {
    const games = await GameService.getGamesByPlayer(request.user.id);
    return games.map(this.mapGameToResponse);
  }

  private mapGameToResponse(game: any): GameResponse {
    return {
      id: game.id,
      player1_id: game.player1_id,
      username2: game.player2?.username || game.username2,
      winner_id: game.winner_id,
      is_public: game.is_public,
      status: game.status,
      game_state: game.game_state,
      created_at: game.created_at,
      updated_at: game.updated_at,
    };
  }
}
