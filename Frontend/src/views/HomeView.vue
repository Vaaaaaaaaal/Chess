<template>
  <div v-if="loading" class="text-center">
    <ProgressSpinner style="width: 50px; height: 50px" />
  </div>
  <div id="home-page">
    <h1>Bienvenue sur ChessApp</h1>
    <p class="subtitle">Jouez aux échecs, suivez vos statistiques et améliorez votre jeu !</p>
    <div class="buttons-container">
      <template v-if="gameId === -1">
        <div class="start-game" @click="showGameDialog">
          <div>
            <p>Créer une nouvelle partie</p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="start-game" @click="joinGame">
          <div>
            <p>Reprendre la partie en cours : #{{ gameId }}</p>
          </div>
        </div>
      </template>
      <button class="btn secondary leaderboard-btn" @click="$router.push('/leaderboard')">
        Voir le classement
      </button>
    </div>
    <section class="chess-quote">
      <blockquote>
        "L'art le plus élevé du joueur d'échecs est de ne pas permettre à votre adversaire de vous
        montrer ce qu'il peut faire."
      </blockquote>
      <cite>Kasparov</cite>
    </section>

    <section class="features-grid">
      <div class="feature-card">
        <h3>Jeu local</h3>
        <p>Jouez avec un ami sur le même ordinateur pour des parties passionnantes.</p>
      </div>
      <div class="feature-card">
        <h3>Statistiques personnelles</h3>
        <p>Suivez votre progression et analysez vos performances.</p>
      </div>
      <div class="feature-card">
        <h3>Historique des parties</h3>
        <p>Revisionnez vos anciennes parties et apprenez de vos expériences.</p>
      </div>
      <div class="feature-card">
        <h3>Classement des joueurs</h3>
        <p>Comparez-vous aux autres joueurs et visez le sommet du classement.</p>
      </div>
    </section>
  </div>

  <Dialog
    v-model:visible="displayGameDialog"
    modal
    header="Paramètres de la partie"
    :style="{ width: '400px', backgroundColor: '#2a2a2a', color: 'white' }"
  >
    <div class="flex flex-column gap-3">
      <div class="flex align-items-center">
        <label class="w-8rem">Visibilité :</label>
        <SelectButton
          v-model="gameSettings.isPublic"
          :options="[
            { label: 'Privée', value: false },
            { label: 'Publique', value: true },
          ]"
          optionLabel="label"
          optionValue="value"
        />
      </div>

      <div class="flex align-items-center">
        <label class="w-8rem">Vous êtes :</label>
        <SelectButton
          v-model="gameSettings.ownerColor"
          :options="[
            { label: 'Blancs', value: 'WHITE' },
            { label: 'Noirs', value: 'BLACK' },
          ]"
          optionLabel="label"
          optionValue="value"
        />
      </div>
    </div>

    <template #footer>
      <Button
        label="Annuler"
        icon="pi pi-times"
        @click="displayGameDialog = false"
        class="p-button-text"
      />
      <Button
        label="Jouer"
        icon="pi pi-check"
        @click="createGameButton"
        :loading="creating"
        autofocus
      />
    </template>
  </Dialog>

  <Toast />
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import SelectButton from 'primevue/selectbutton';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useGameService } from '@/composables/game/gameService';
const { getCurrentGameID, createGame } = useGameService();

const router = useRouter();
const toast = useToast();
const gameId = ref<number>(-1);
const loading = ref(true);
const creating = ref(false);
const displayGameDialog = ref(false);

const createGameButton = async () => {
  try {
    creating.value = true;
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    await createGame(gameSettings);
    displayGameDialog.value = false;
    router.push(`/game`);
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de créer une nouvelle partie',
      life: 3000,
    });
  } finally {
    creating.value = false;
  }
};

const checkUserGame = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      loading.value = false;
      return;
    }

    const response = await getCurrentGameID();
    gameId.value = response.gameId;
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de récupérer les informations de la partie',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};

const gameSettings = reactive({
  isPublic: false,
  ownerColor: 'BLACK',
});

const showGameDialog = () => {
  displayGameDialog.value = true;
};

const joinGame = () => {
  if (gameId.value > -1) {
    router.push(`/game`);
  }
};

onMounted(() => {
  checkUserGame();
});
</script>
