<template>
  <div class="game-view">
    <!-- Header avec le tour du joueur -->
    <div class="turn-indicator">Au tour de {{ currentPlayer }}</div>

    <!-- Plateau d'échecs -->
    <div class="chess-board">
      <!-- Création de la grille 8x8 -->
      <div v-for="row in 8" :key="row" class="board-row">
        <div
          v-for="col in 8"
          :key="col"
          :class="['board-cell', getCellColor(row, col)]"
        >
          <!-- Pièces à implémenter -->
          <div v-if="getPiece(row, col)" class="piece">
            {{ getPiece(row, col) }}
          </div>
        </div>
      </div>

      <!-- Labels des colonnes -->
      <div class="col-labels">
        <span v-for="col in columns" :key="col">{{ col }}</span>
      </div>

      <!-- Labels des rangées -->
      <div class="row-labels">
        <span v-for="row in 8" :key="row">{{ row }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentPlayer = ref("ValentinBG47");
const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

// Détermine la couleur de la cellule (rouge ou blanche)
const getCellColor = (row: number, col: number): string => {
  return (row + col) % 2 === 0 ? "white-cell" : "red-cell";
};

// Fonction temporaire pour les pièces (à implémenter avec de vraies pièces)
const getPiece = (row: number, col: number): string => {
  // Logique temporaire pour l'affichage des pièces
  return "";
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

.chess-board {
  position: relative;
  width: 640px;
  height: 640px;
  border: 2px solid #333;
  background-color: white;
  margin-top: 20px;
}

.board-row {
  display: flex;
  height: 12.5%;
}

.board-cell {
  width: 12.5%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.white-cell {
  background-color: #ffffff;
}

.red-cell {
  background-color: #ff6b6b;
}

.piece {
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5em;
}

.col-labels {
  position: absolute;
  bottom: -25px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 0;
  width: 100%;
}

.col-labels span {
  width: 12.5%;
  text-align: center;
  color: white;
}

.row-labels {
  position: absolute;
  top: 0;
  left: -25px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0;
  height: 100%;
}

.row-labels span {
  height: 12.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

@media (max-width: 768px) {
  .chess-board {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }
}
</style>
