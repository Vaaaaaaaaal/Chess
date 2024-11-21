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
