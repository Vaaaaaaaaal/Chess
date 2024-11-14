import Leaderboard from "../models/leaderboard.model";

class LeaderboardService {
  async updateLeaderboard(
    user_id: number,
    updateData: Partial<Leaderboard>
  ): Promise<[number, Leaderboard[]]> {
    return Leaderboard.update(updateData, {
      where: { user_id },
      returning: true,
    });
  }

  async getLeaderboard(): Promise<Leaderboard[]> {
    return Leaderboard.findAll();
  }

  async getUserLeaderboard(user_id: number): Promise<Leaderboard | null> {
    return Leaderboard.findOne({ where: { user_id } });
  }
}

export default new LeaderboardService();
