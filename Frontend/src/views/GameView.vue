<template>
  <div class="game-view">
    <div class="turn-indicator">Au tour de {{ currentPlayer }}</div>
    <div class="game-container">
      <div class="game-controls">
        <button class="control-btn start-btn" @click="showStartModal = true">
          Start
        </button>
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
import { ref } from "vue";

const currentPlayer = ref("ValentinBG47");
const showStartModal = ref(false);
const showEndModal = ref(false);
const winner = ref("ValentinBG47");

const handleGameStart = (players: { player1: string; player2: string }) => {
  currentPlayer.value = players.player1;
  // Logique pour démarrer la partie
};

const handleReplay = () => {
  showStartModal.value = true;
  // Logique pour réinitialiser le jeu
};
</script>

<style scoped>
.game-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  background-color: #1e1e1e;
  min-height: 100vh;
  color: white;
}

.turn-indicator {
  background-color: white;
  color: black;
  padding: 10px 20px;
  margin: 0;
  width: 100vw;
  text-align: center;
}

.game-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-top: 2rem;
}

.game-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-btn {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-btn {
  background-color: #4caf50;
  color: white;
}

.start-btn:hover {
  background-color: #45a049;
}

.end-btn {
  background-color: #f44336;
  color: white;
}

.end-btn:hover {
  background-color: #da190b;
}

@media (max-width: 768px) {
  .game-container {
    flex-direction: column-reverse;
    align-items: center;
  }

  .game-controls {
    flex-direction: row;
    margin-top: 1rem;
  }
}
</style>
