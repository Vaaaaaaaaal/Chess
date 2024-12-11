<template>
  <div class="chess-board">
    <div v-for="row in 8" :key="row" class="board-row">
      <div
        v-for="col in 8"
        :key="col"
        :class="[
          'board-cell',
          getCellColor(row, col),
          {
            'selected': selectedPiece === getChessNotation(row, col),
            'possible-move': possibleMoves.includes(getChessNotation(row, col))
          }
        ]"
        @click="handleCellClick(row, col)"
      >
        <div v-if="getPiece(9 - row, col)" class="piece">
          <img :src="getPiece(9 - row, col)" :alt="getPiece(9 - row, col)" />
        </div>
      </div>
    </div>

    <div class="col-labels">
      <span v-for="col in columns" :key="col">{{ col }}</span>
    </div>

    <div class="row-labels">
      <span v-for="row in 8" :key="row">{{ 9 - row }}</span>
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

const props = defineProps<{
  gameId: number;
}>();

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

const selectedPiece = ref<string | null>(null);
const possibleMoves = ref<string[]>([]);

const getCellColor = (row: number, col: number): string => {
  return (row + col) % 2 === 0 ? "white-cell" : "red-cell";
};

const getPiece = (row: number, col: number): string => {
  if (row === 1) {
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
  if (row === 2) return pieces.value.white.pawn;

  if (row === 8) {
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
  if (row === 7) return pieces.value.black.pawn;

  return "";
};

const getChessNotation = (row: number, col: number): string => {
  const file = String.fromCharCode(97 + col - 1); // 'a' à 'h'
  const rank = 9 - row; // Inverse la numérotation des rangs
  return `${file}${rank}`;
};

const handleCellClick = async (row: number, col: number) => {
  const position = getChessNotation(row, col);
  
  if (selectedPiece.value) {
    // Si une pièce est déjà sélectionnée et que la nouvelle position est dans les mouvements possibles
    if (possibleMoves.value.includes(position)) {
      try {
        const response = await fetch(`http://localhost:3000/games/${props.gameId}/move`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          body: JSON.stringify({
            from_position: selectedPiece.value,
            to_position: position
          })
        });

        if (response.ok) {
          selectedPiece.value = null;
          possibleMoves.value = [];
        }
      } catch (error) {
        console.error('Erreur lors du déplacement:', error);
      }
    } else {
      selectedPiece.value = null;
      possibleMoves.value = [];
    }
  } else {
    if (getPiece(row, col)) {
      selectedPiece.value = position;
      try {
        const response = await fetch(`http://localhost:3000/games/${props.gameId}/possible-moves/${position}`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          possibleMoves.value = await response.json();
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des mouvements possibles:', error);
      }
    }
  }
};
</script>

<style scoped>
.board-cell {
  cursor: pointer;
  position: relative;
}

.board-cell.selected {
  background-color: rgba(255, 255, 0, 0.3) !important;
}

.board-cell.possible-move::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-color: rgba(0, 255, 0, 0.3);
  border-radius: 50%;
  pointer-events: none;
}

/* ... autres styles existants ... */
</style>
