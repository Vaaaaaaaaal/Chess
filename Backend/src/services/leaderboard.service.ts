import { Op, WhereOptions } from "sequelize";
import { GameDTO } from "../dto/game.dto";
import { LeaderboardEntryDTO } from "../dto/leaderboard.dto";
import { StatsDTO } from "../dto/stats.dto";
import { Color } from "../enums/color.enum";
import { Game, GameAttributes } from "../models/game.model";
import { User } from "../models/user.model";

export class LeaderboardService {
  public async getLeaderboard(): Promise<LeaderboardEntryDTO[]> {
    const users = await User.findAll();

    const whereClause: WhereOptions<GameAttributes> = {
      owner_win: {
        [Op.ne]: undefined,
      },
    };

    const games = await Game.findAll({
      where: whereClause,
    });

    const userVictories = new Map<string, number>();

    users.forEach((user) => {
      userVictories.set(user.username, 0);
    });

    games.forEach((game) => {
      if (game.owner_win) {
        const winner = game.owner;
        if (winner) {
          userVictories.set(
            winner.username,
            userVictories.get(winner.username)! + 1
          );
        }
      }
    });

    const sortedEntries: LeaderboardEntryDTO[] = Array.from(
      userVictories.entries()
    )
      .sort(([, a], [, b]) => b - a)
      .map(([username, score], index) => ({
        username,
        score,
        rank: index + 1,
        userId: users[index].id,
      }));

    return sortedEntries;
  }

  public async getUserGames(userId: number): Promise<GameDTO[]> {
    const game = await Game.findAll({
      where: { owner_id: userId },
      order: [["id", "DESC"]],
    });
    return game;
  }

  public async getLeaderboardUser(userId: number): Promise<GameDTO[]> {
    const games = await Game.findAll({
      where: { owner_id: userId, public: true },
      include: [{ model: User, as: "owner" }],
      order: [["id", "DESC"]],
    });
    return games;
  }

  public async getUserStats(userId: number): Promise<StatsDTO> {
    const games = await Game.findAll({
      where: {
        owner_id: userId,
      },
      include: [{ model: User, as: "owner" }],
    });

    const totalGames = games.length;
    const wins = games.filter((game) => game.owner_win === 1).length;
    const publicGames = games.filter((game) => game.public === true).length;
    const privateGames = games.filter((game) => game.public === false).length;
    const gamesAsWhite = games.filter(
      (game) => game.owner_color === Color.WHITE
    ).length;
    const gamesAsBlack = games.filter(
      (game) => game.owner_color === Color.BLACK
    ).length;

    return {
      totalGames,
      wins,
      winRate: totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0,
      publicGames,
      privateGames,
      gamesAsWhite,
      gamesAsBlack,
    };
  }
}

export const leaderboardService = new LeaderboardService();
