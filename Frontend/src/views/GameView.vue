<template>
  <div class="game-view">
    <div class="turn-indicator">
      Au tour de
      {{ currentTurnPlayer }}
    </div>
    <div class="game-container">
      <div class="game-controls">
        <button class="control-btn end-btn" @click="showEndModal = true">
          End
        </button>
      </div>
      <ChessBoard :gameId="gameId" />
    </div>

    <StartGameModal v-model="showStartModal" @start="handleGameStart" />

    <EndGameModal
      v-model="showEndModal"
      :winner="winner"
      duration="10:30"
      :moves="25"
      @replay="handleReplay"
    />
  </div>
</template>

<script setup lang="ts">
import ChessBoard from "@/components/ChessBoard.vue";
import EndGameModal from "@/components/EndGameModal.vue";
import StartGameModal from "@/components/StartGameModal.vue";
import { gameService } from "@/services/game.service";
import { computed, onMounted, ref } from "vue";

const currentPlayer = ref("player1");
const showStartModal = ref(false);
const showEndModal = ref(false);
const winner = ref("");
const gameId = ref<number | null>(null);
const username = ref("");
const players = ref<{ player1: string; player2: string }>({
  player1: "",
  player2: "",
});
const gameState = ref<{ who_start: boolean }>({ who_start: true });
const isCurrentPlayerTurn = computed(() => currentPlayer.value === "player1");

const currentTurnPlayer = computed(() => {
  return gameState.value.who_start ? username.value : players.value.player2;
});

const fetchGameData = async (gameId: number) => {
  try {
    const response = await gameService.getGame(gameId);
    if (response) {
      gameState.value.who_start = response.who_start;
      players.value.player2 = response.username2;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la partie:", error);
  }
};

onMounted(async () => {
  username.value = sessionStorage.getItem("username") || "Joueur 1";
  const savedGameId = sessionStorage.getItem("currentGameId");
  
  if (savedGameId) {
    await fetchGameData(parseInt(savedGameId));
  } else {
    showStartModal.value = true;
  }
});

const handleGameStart = async (playersData: {
  player1: string;
  player2: string;
  starter: string;
}) => {
  players.value = {
    player1: playersData.player1,
    player2: playersData.player2,
  };
  try {
    const initialGameState = gameService.getInitialGameState(
      playersData.starter === playersData.player2
    );

    const response = await gameService.createGame({
      username2: playersData.player2,
      is_public: false,
      game_state: initialGameState,
      who_start: playersData.starter === playersData.player1,
      starter: playersData.starter === playersData.player2,
    });

    gameId.value = response.id;
    sessionStorage.setItem("currentGameId", response.id.toString());
    currentPlayer.value = response.game_state.starter;
    gameState.value.who_start = response.who_start;
  } catch (error) {
    console.error("Erreur lors de la création de la partie:", error);
  }
};

const handleReplay = () => {
  showStartModal.value = true;
  gameId.value = null;
  sessionStorage.removeItem("currentGameId");
};
</script>
