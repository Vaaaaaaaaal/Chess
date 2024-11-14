<template>
  <div class="game-view">
    <div class="turn-indicator">Au tour de {{ currentPlayer }}</div>

    <div class="chess-board">
      <div v-for="row in 8" :key="row" class="board-row">
        <div
          v-for="col in 8"
          :key="col"
          :class="['board-cell', getCellColor(row, col)]"
        >
          <div v-if="getPiece(row, col)" class="piece">
            <img :src="getPiece(row, col)" :alt="getPiece(row, col)" />
          </div>
        </div>
      </div>

      <div class="col-labels">
        <span v-for="col in columns" :key="col">{{ col }}</span>
      </div>

      <div class="row-labels">
        <span v-for="row in 8" :key="row">{{ row }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BlackBishop from "../assets/chessIcon/BlackBishop.png";
import BlackKing from "../assets/chessIcon/BlackKing.png";
import BlackKnight from "../assets/chessIcon/BlackKnight.png";
import BlackPawn from "../assets/chessIcon/BlackPawn.png";
import BlackQueen from "../assets/chessIcon/BlackQueen.png";
import BlackRook from "../assets/chessIcon/BlackRook.png";
import WhiteBishop from "../assets/chessIcon/WhiteBishop.png";
import WhiteKing from "../assets/chessIcon/WhiteKing.png";
import WhiteKnight from "../assets/chessIcon/WhiteKnight.png";
import WhitePawn from "../assets/chessIcon/WhitePawn.png";
import WhiteQueen from "../assets/chessIcon/WhiteQueen.png";
import WhiteRook from "../assets/chessIcon/WhiteRook.png";

const currentPlayer = ref("ValentinBG47");
const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

const pieces = ref({
  white: {
    king: WhiteKing,
    queen: WhiteQueen,
    rook: WhiteRook,
    bishop: WhiteBishop,
    knight: WhiteKnight,
    pawn: WhitePawn,
  },
  black: {
    king: BlackKing,
    queen: BlackQueen,
    rook: BlackRook,
    bishop: BlackBishop,
    knight: BlackKnight,
    pawn: BlackPawn,
  },
});

const getCellColor = (row: number, col: number): string => {
  return (row + col) % 2 === 0 ? "white-cell" : "red-cell";
};

const getPiece = (row: number, col: number): string => {
  if (row === 8) {
    switch (col) {
      case 1:
      case 8:
        return pieces.value.white.rook;
      case 2:
      case 7:
        return pieces.value.white.knight;
      case 3:
      case 6:
        return pieces.value.white.bishop;
      case 4:
        return pieces.value.white.queen;
      case 5:
        return pieces.value.white.king;
    }
  }
  if (row === 7) return pieces.value.white.pawn;

  if (row === 1) {
    switch (col) {
      case 1:
      case 8:
        return pieces.value.black.rook;
      case 2:
      case 7:
        return pieces.value.black.knight;
      case 3:
      case 6:
        return pieces.value.black.bishop;
      case 4:
        return pieces.value.black.queen;
      case 5:
        return pieces.value.black.king;
    }
  }
  if (row === 2) return pieces.value.black.pawn;

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

.piece img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
