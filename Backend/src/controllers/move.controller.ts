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
import { MoveDto } from "../dto/move.dto";
import MoveService from "../services/move.service";

@Route("moves")
@Tags("Move")
export class MoveController extends Controller {
  @Security("jwt")
  @Post("games/{gameId}")
  public async createMove(
    @Path() gameId: number,
    @Body() moveDto: MoveDto,
    @Request() request: any
  ): Promise<any> {
    const move = await MoveService.createMove(gameId, request.user.id, moveDto);
    return this.mapMoveToResponse(move);
  }

  @Get("games/{gameId}")
  public async getMovesByGameId(@Path() gameId: number): Promise<any[]> {
    const moves = await MoveService.getGameMoves(gameId);
    return moves.map(this.mapMoveToResponse);
  }

  private mapMoveToResponse(move: any) {
    return {
      id: move.id,
      game_id: move.game_id,
      player_id: move.player_id,
      from_position: move.from_position,
      to_position: move.to_position,
      piece_type: move.piece_type,
      captured_piece: move.captured_piece,
      is_check: move.is_check,
      is_checkmate: move.is_checkmate,
      move_number: move.move_number,
      created_at: move.created_at,
    };
  }
}
