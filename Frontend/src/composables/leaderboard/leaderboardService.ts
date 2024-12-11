import type { HistoryModel } from '@/model/History.model';
import type { LeaderboardModel } from '@/model/Leaderboard.model';
import type { StatsModel } from '@/model/Stats.model';
import { useLeaderboardApi } from './leaderboardApi';

const leaderboardApi = useLeaderboardApi();
export function useLeaderboardService() {
  const getUserStats = async (userId: number): Promise<StatsModel> => {
    console.log('Début getUserStats avec userId:', userId);
    try {
      const response = await leaderboardApi.getUserStats(userId);
      console.log('Réponse getUserStats:', response);
      return response;
    } catch (error) {
      console.error('Erreur dans getUserStats:', error);
      throw error;
    }
  };

  const getMyStats = async (): Promise<StatsModel> => {
    console.log('Début getMyStats');
    try {
      const response = await leaderboardApi.getMyStats();
      console.log('Réponse getMyStats:', response);
      return response;
    } catch (error) {
      console.error('Erreur dans getMyStats:', error);
      throw error;
    }
  };

  return {
    async getLeaderboard(): Promise<LeaderboardModel[]> {
      console.log('Appel getLeaderboard');
      try {
        const response = await leaderboardApi.leaderboard();
        console.log('Réponse getLeaderboard:', response);
        return response;
      } catch (error) {
        console.error('Erreur dans getLeaderboard:', error);
        throw error;
      }
    },
    async getConnectedUserHistory(): Promise<HistoryModel[]> {
      console.log('Appel getConnectedUserHistory');
      try {
        const response = await leaderboardApi.connectedUserHistory();
        console.log('Réponse getConnectedUserHistory:', response);
        return response;
      } catch (error) {
        console.error('Erreur dans getConnectedUserHistory:', error);
        throw error;
      }
    },
    async getUserHistory(userId: number): Promise<HistoryModel[]> {
      console.log('Appel getUserHistory avec userId:', userId);
      try {
        const response = await leaderboardApi.historyUser(userId);
        console.log('Réponse getUserHistory:', response);
        return response;
      } catch (error) {
        console.error('Erreur dans getUserHistory:', error);
        throw error;
      }
    },
    getUserStats,
    getMyStats,
  };
}
