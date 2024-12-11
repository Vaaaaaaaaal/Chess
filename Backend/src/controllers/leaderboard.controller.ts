import { Request as ExpressRequest } from "express";
import { Controller, Get, Path, Request, Route, Security, Tags } from "tsoa";
import { LeaderboardEntryDTO } from "../dto/leaderboard.dto";
import { StatsDTO } from "../dto/stats.dto";
import { leaderboardService } from "../services/leaderboard.service";

@Route("leaderboards")
@Tags("Leaderboard")
export class LeaderboardController extends Controller {
  @Get("/")
  public async getLeaderboard(): Promise<LeaderboardEntryDTO[]> {
    const leaderboard = await leaderboardService.getLeaderboard();
    return leaderboard;
  }

  @Get("/history/me")
  @Security("jwt", [])
  public async getUserGame(@Request() req: ExpressRequest) {
    const games = await leaderboardService.getUserGames(req.user.id);
    return games;
  }

  @Get("/history/{userId}")
  public async getLeaderboardUser(
    @Request() req: ExpressRequest,
    @Path() userId: number
  ) {
    const games = await leaderboardService.getLeaderboardUser(userId);
    return games;
  }

  @Get("/stats/me")
  @Security("jwt", [])
  public async getMyStats(@Request() req: ExpressRequest): Promise<StatsDTO> {
    const stats = await leaderboardService.getUserStats(req.user.id);
    return stats;
  }

  @Get("/stats/{userId}")
  public async getUserStats(@Path() userId: number): Promise<StatsDTO> {
    const stats = await leaderboardService.getUserStats(userId);
    return stats;
  }
}
