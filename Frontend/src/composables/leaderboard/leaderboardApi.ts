import axiosInstance from '@/config/AxiosConfig';
import { ApiUrlLeaderboard, ApiUrlLeaderboardHistory } from '@/constants/ApiUrl';
import type { HistoryModel } from '@/model/History.model';
import type { LeaderboardModel } from '@/model/Leaderboard.model';
import type { StatsModel } from '@/model/Stats.model';

export function useLeaderboardApi() {
  return {
    async leaderboard(): Promise<LeaderboardModel[]> {
      const res = await axiosInstance.get<LeaderboardModel[]>(`${ApiUrlLeaderboard}`);
      return res.data;
    },
    async connectedUserHistory(): Promise<HistoryModel[]> {
      const res = await axiosInstance.get<HistoryModel[]>(
        `${ApiUrlLeaderboard}${ApiUrlLeaderboardHistory}/me`,
      );
      return res.data;
    },
    async historyUser(userId: number): Promise<HistoryModel[]> {
      const res = await axiosInstance.get<HistoryModel[]>(
        `${ApiUrlLeaderboard}${ApiUrlLeaderboardHistory}/${userId}`,
      );
      return res.data;
    },
    async getUserStats(userId: number): Promise<StatsModel> {
      const res = await axiosInstance.get<StatsModel>(`${ApiUrlLeaderboard}/stats/${userId}`);
      return res.data;
    },
    async getMyStats(): Promise<StatsModel> {
      const res = await axiosInstance.get<StatsModel>(`${ApiUrlLeaderboard}/stats/me`);
      return res.data;
    },
  };
}
