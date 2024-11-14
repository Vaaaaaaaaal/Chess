import { NextFunction, Request, Response } from "express";
import { Body, Controller, Delete, Get, Path, Put, Route, Tags } from "tsoa";
import { CreateGameDto, GameDto, UpdateGameDto } from "../dto/game.dto";
import Game from "../models/game.model";
import GameService from "../services/game.service";

@Route("games")
@Tags("Game")
export class GameController extends Controller {
  private gameService: typeof GameService;

  constructor() {
    super();
    this.gameService = GameService;
  }

  private mapGameToDto(game: Game): GameDto {
    return {
      id: game.id,
      player1_id: game.player1_id,
      username2: game.username2,
      winner_id: game.winner_id,
      is_public: game.is_public,
      game_state: game.game_state,
      created_at: game.created_at,
    };
  }

  public createGame = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const gameData: CreateGameDto = req.body as CreateGameDto;
      const createdGame: Game = await this.gameService.createGame(
        gameData.player1_id,
        gameData.username2,
        gameData.is_public ? "true" : "false"
      );
      res.status(201).json(this.mapGameToDto(createdGame));
    } catch (error) {
      next(error);
    }
  };

  @Get("{id}")
  public async getGame(@Path() id: number): Promise<GameDto | null> {
    const game = await this.gameService.getGame(id);
    return game ? this.mapGameToDto(game) : null;
  }

  @Get()
  public async getAllGames(): Promise<GameDto[]> {
    const games = await this.gameService.getAllGames();
    return games.map(this.mapGameToDto);
  }

  @Put("{id}")
  public async updateGame(
    @Path() id: number,
    @Body() updateGameDto: UpdateGameDto
  ): Promise<GameDto | null> {
    const [, updatedGames] = await this.gameService.updateGame(
      id,
      updateGameDto
    );
    const updatedGame = updatedGames[0];
    return updatedGame ? this.mapGameToDto(updatedGame) : null;
  }

  @Delete("{id}")
  public async deleteGame(@Path() id: number): Promise<void> {
    await this.gameService.deleteGame(id);
  }

  @Get("public")
  public async getPublicGames(): Promise<GameDto[]> {
    const games = await this.gameService.getPublicGames();
    return games.map(this.mapGameToDto);
  }
}
