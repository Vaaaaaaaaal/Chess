import { Request as ExpressRequest } from "express";
import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Request,
  Route,
  Security,
  Tags,
} from "tsoa";
import { PieceType } from "../enums/piece.enum";
import { CreateGameBody } from "../interfaces/createGameBody.interface";
import { MovePiece } from "../interfaces/movePiece.interface";
import { gameService } from "../services/game.service";
@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Post("/piece/move")
  @Security("jwt", [])
  public async movePiece(
    @Request() req: ExpressRequest,
    @Body() requestBody: MovePiece
  ) {
    const response = await gameService.movePiece(req.user.id, requestBody);

    if (!response) {
      this.setStatus(404);
      return null;
    }

    return response;
  }

  @Get("/replay/{id}")
  public async getReplay(@Path() id: number) {
    const response = await gameService.getReplay(id);

    if (!response) {
      this.setStatus(404);
      return undefined;
    }

    return response;
  }

  @Post("/create")
  @Security("jwt", [])
  public async createGame(
    @Body() requestBody: CreateGameBody,
    @Request() req: ExpressRequest
  ): Promise<{ gameId: number }> {
    const game = await gameService.createGame(requestBody, req.user.id);

    if (!game) {
      this.setStatus(401);
      return { gameId: -1 };
    }

    return { gameId: req.user.id };
  }

  @Get("/")
  @Security("jwt", [])
  public async getGame(@Request() req: ExpressRequest) {
    const game = gameService.getGame(req.user.id);

    if (!game) {
      this.setStatus(401);
      return null;
    }
    return game;
  }
  @Get("/current-game")
  @Security("jwt", [])
  public async getUserGameId(@Request() req: ExpressRequest) {
    return { gameId: gameService.getUserGameId(req.user.id) };
  }

  @Post("/piece/possible-move")
  @Security("jwt", [])
  public async getPossibleMove(
    @Body() body: { i: number; j: number },
    @Request() req: ExpressRequest
  ) {
    const move = await gameService.getPossibleMove(req.user.id, body.i, body.j);
    if (!move) this.setStatus(401);
    return move;
  }

  @Post("/piece/upgrade")
  @Security("jwt", [])
  public async upgradePiece(
    @Request() req: ExpressRequest,
    @Body() body: { piece: PieceType }
  ) {
    return await gameService.upgradePiece(req.user.id, body.piece);
  }

  @Delete("/")
  @Security("jwt", [])
  public delete(@Request() req: ExpressRequest) {
    return gameService.delete(req.user.id);
  }
}
