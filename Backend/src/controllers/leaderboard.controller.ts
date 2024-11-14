import { Controller, Get, Path, Route, Tags } from "tsoa";
import { LeaderboardDto } from "../dto/leaderboard.dto";
import LeaderboardService from "../services/leaderboard.service";

@Route("leaderboard")
@Tags("Leaderboard")
export class LeaderboardController extends Controller {
  private leaderboardService: typeof LeaderboardService;

  constructor() {
    super();
    this.leaderboardService = LeaderboardService;
  }

  @Get()
  public async getLeaderboard(): Promise<LeaderboardDto[]> {
    const leaderboard = await this.leaderboardService.getLeaderboard();
    return leaderboard.map((entry) => ({
      id: entry.id,
      user_id: entry.user_id,
      total_games: entry.total_games,
      wins: entry.wins,
      losses: entry.losses,
      draws: entry.draws,
    }));
  }

  @Get("{id}")
  public async getUserLeaderboard(
    @Path() id: number
  ): Promise<LeaderboardDto | null> {
    const entry = await this.leaderboardService.getUserLeaderboard(id);
    return entry
      ? {
          id: entry.id,
          user_id: entry.user_id,
          total_games: entry.total_games,
          wins: entry.wins,
          losses: entry.losses,
          draws: entry.draws,
        }
      : null;
  }
}
