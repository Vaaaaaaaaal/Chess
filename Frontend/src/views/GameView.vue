<template>
  <div class="game-view">
    <div class="turn-indicator">Au tour de {{ currentPlayer }}</div>
    <div class="game-container">
      <div class="game-controls">
        <button class="control-btn end-btn" @click="showEndModal = true">
          End
        </button>
      </div>
      <ChessBoard />
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
import { ref, onMounted } from "vue";

const currentPlayer = ref("");
const showStartModal = ref(false);
const showEndModal = ref(false);
const winner = ref("");
const gameId = ref<number | null>(null);

onMounted(() => {
  showStartModal.value = true;
});

const handleGameStart = async (players: { player1: string; player2: string; starter: string }) => {
  try {
    const initialGameState = gameService.getInitialGameState(players.starter);

    const response = await gameService.createGame({
      username2: players.player2,
      is_public: false,
      game_state: initialGameState
    });
    
    gameId.value = response.id;
    currentPlayer.value = response.game_state.starter;
    
  } catch (error) {
    console.error("Erreur lors de la création de la partie:", error);
  }
};

const handleReplay = () => {
  showStartModal.value = true;
  gameId.value = null;
};
</script>
