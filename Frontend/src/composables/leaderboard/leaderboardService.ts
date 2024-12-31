import { getLeaderboardData } from '@/api/leaderboard';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

export function useLeaderboardService() {
  const leaderboard = ref([]);
  const loading = ref(true);
  const toast = useToast();

  const getLeaderboard = async () => {
    try {
      loading.value = true;
      const response = await getLeaderboardData();
      leaderboard.value = response.map(player => ({
        ...player,
        elo: player.eloRating
      }));
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de charger le classement',
        life: 3000,
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    leaderboard,
    loading,
    getLeaderboard
  };
}
