<template>
  <div class="game-container">
    <!-- En-tête de la partie -->
    <div class="game-header">
      <div class="player player-one">
        <h3>{{ player1Name || "Joueur 1" }}</h3>
        <div class="player-time">{{ formatTime(player1Time) }}</div>
      </div>

      <div class="game-status">
        <span class="status-text">{{ gameStatus }}</span>
      </div>

      <div class="player player-two">
        <h3>{{ player2Name || "Joueur 2" }}</h3>
        <div class="player-time">{{ formatTime(player2Time) }}</div>
      </div>
    </div>

    <!-- Plateau de jeu (à implémenter) -->
    <div class="chess-board">
      <!-- Le plateau sera ajouté plus tard -->
    </div>

    <!-- Contrôles du jeu -->
    <div class="game-controls">
      <button class="control-btn" @click="handleForfeit">Abandonner</button>
      <button class="control-btn" @click="handleDrawOffer">
        Proposer nulle
      </button>
    </div>

    <!-- Historique des coups -->
    <div class="moves-history">
      <h4>Historique des coups</h4>
      <div class="moves-list">
        <!-- L'historique sera ajouté plus tard -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// États du jeu
const player1Name = ref("");
const player2Name = ref("");
const player1Time = ref(600); // 10 minutes en secondes
const player2Time = ref(600);
const gameStatus = ref("En attente...");

// Méthodes
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const handleForfeit = () => {
  if (confirm("Êtes-vous sûr de vouloir abandonner la partie ?")) {
    // Logique d'abandon à implémenter
    console.log("Partie abandonnée");
  }
};

const handleDrawOffer = () => {
  // Logique de proposition de nulle à implémenter
  console.log("Nulle proposée");
};
</script>

<style scoped>
.game-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.player {
  text-align: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  min-width: 200px;
}

.player-time {
  font-size: 1.5em;
  font-weight: bold;
  color: #2c3e50;
}

.game-status {
  font-size: 1.2em;
  font-weight: bold;
  color: #42b983;
}

.chess-board {
  aspect-ratio: 1;
  max-width: 600px;
  margin: 0 auto;
  background-color: #e5e5e5;
  border: 2px solid #333;
  margin-bottom: 20px;
}

.game-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.control-btn {
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #42b983;
  color: white;
  transition: background-color 0.3s;
}

.control-btn:hover {
  background-color: #3aa876;
}

.moves-history {
  max-width: 300px;
  margin: 0 auto;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.moves-history h4 {
  margin-top: 0;
  text-align: center;
}

.moves-list {
  height: 200px;
  overflow-y: auto;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .game-header {
    flex-direction: column;
    gap: 10px;
  }

  .player {
    width: 100%;
  }

  .chess-board {
    width: 100%;
  }
}
</style>
