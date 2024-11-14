import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { CreateMoveDto, MoveDto } from "../dto/move.dto";
import MoveService from "../services/move.service";

@Route("moves")
@Tags("Move")
export class MoveController extends Controller {
  private moveService: typeof MoveService;

  constructor() {
    super();
    this.moveService = MoveService;
  }

  @Post()
  public async createMove(
    @Body() createMoveDto: CreateMoveDto
  ): Promise<MoveDto> {
    const move = await this.moveService.createMove(
      createMoveDto.game_id,
      createMoveDto.move_number,
      createMoveDto.move
    );
    return {
      id: move.id,
      game_id: move.game_id,
      move_number: move.move_number,
      move: move.move,
      created_at: move.created_at,
    };
  }

  @Get("{game_id}")
  public async getMovesByGameId(@Path() game_id: number): Promise<MoveDto[]> {
    const moves = await this.moveService.getMovesByGameId(game_id);
    return moves.map((move) => ({
      id: move.id,
      game_id: move.game_id,
      move_number: move.move_number,
      move: move.move,
      created_at: move.created_at,
    }));
  }
}
