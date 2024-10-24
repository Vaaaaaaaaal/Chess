import { Body, Controller, Delete, Get, Path, Post, Put, Route } from "tsoa";
import { CreateGameDto, UpdateGameDto } from "../dto/game.dto";
import Game from "../models/game.model";
import GameService from "../services/game.service";

@Route("games")
export class GameController extends Controller {
  @Post()
  public async createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return GameService.createGame(
      createGameDto.player1_id,
      createGameDto.username2,
      createGameDto.initialState,
      createGameDto.is_public
    );
  }

  @Get("{id}")
  public async getGame(@Path() id: number): Promise<Game | null> {
    return GameService.getGame(id);
  }

  @Get()
  public async getAllGames(): Promise<Game[]> {
    return GameService.getAllGames();
  }

  @Put("{id}")
  public async updateGame(
    @Path() id: number,
    @Body() updateGameDto: UpdateGameDto
  ): Promise<Game | null> {
    const [, updatedGames] = await GameService.updateGame(id, updateGameDto);
    return updatedGames[0] || null;
  }

  @Delete("{id}")
  public async deleteGame(@Path() id: number): Promise<void> {
    await GameService.deleteGame(id);
  }

  @Get("public")
  public async getPublicGames(): Promise<Game[]> {
    return GameService.getPublicGames();
  }
}
