<template>
  <div class="flex justify-content-center align-items-center min-h-screen bg-gray-100">
    <Card class="w-8">
      <template #title>
        <div class="text-center mb-4">
          <h1>Statistiques du joueur</h1>
        </div>
      </template>
      <template #content>
        <div class="flex-col flex justify-content-center">
          <div v-if="loading" class="text-center">
            <ProgressSpinner style="width: 50px; height: 50px" />
          </div>
          <div v-else class="grid">
            <div class="col-12 md:col-6 mb-4">
              <Card>
                <template #title>Parties jouées</template>
                <template #content>
                  <div class="text-center">
                    <h2 class="text-4xl mb-2">{{ stats.totalGames }}</h2>
                    <div class="text-sm text-gray-500">Total des parties</div>
                  </div>
                </template>
              </Card>
            </div>

            <div class="col-12 md:col-6 mb-4">
              <Card>
                <template #title>Taux de victoire</template>
                <template #content>
                  <div class="text-center">
                    <h2 class="text-4xl mb-2">{{ stats.winRate.toFixed(1) }}%</h2>
                    <div class="text-sm text-gray-500">{{ stats.wins }} victoires</div>
                  </div>
                </template>
              </Card>
            </div>

            <div class="col-12 md:col-6 mb-4">
              <Card>
                <template #title>Type de parties</template>
                <template #content>
                  <div class="text-center">
                    <div class="mb-2">
                      <div>Publiques: {{ stats.publicGames }}</div>
                      <div>Privées: {{ stats.privateGames }}</div>
                    </div>
                  </div>
                </template>
              </Card>
            </div>

            <div class="col-12 md:col-6 mb-4">
              <Card>
                <template #title>Couleurs jouées</template>
                <template #content>
                  <div class="text-center">
                    <div class="mb-2">
                      <div>Blancs: {{ stats.gamesAsWhite }}</div>
                      <div>Noirs: {{ stats.gamesAsBlack }}</div>
                    </div>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </div>
      </template>
    </Card>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useLeaderboardService } from '@/composables/leaderboard/leaderboardService';
import type { StatsModel } from '@/model/Stats.model';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const toast = useToast();
const { getUserStats, getMyStats } = useLeaderboardService();
const loading = ref(true);
const stats = ref<StatsModel>({
  totalGames: 0,
  wins: 0,
  winRate: 0,
  publicGames: 0,
  privateGames: 0,
  gamesAsWhite: 0,
  gamesAsBlack: 0,
});

const loadStats = async () => {
  try {
    loading.value = true;
    const userId = route.params.userId;
    const response = userId ? await getUserStats(Number(userId)) : await getMyStats();
    stats.value = response;
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de charger les statistiques',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadStats();
});
</script>

<style scoped>
.p-card {
  border-radius: 1rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style>
