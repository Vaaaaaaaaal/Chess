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
            'selected-piece': selectedPiece?.row === row && selectedPiece?.col === col,
            'possible-move': possibleMoves.includes(`${columns[col - 1]}${9 - row}`)
          }
        ]"
        @click="handleCellClick(row, col)"
      >
        <div v-if="getPiece(row, col)" class="piece">
          <img :src="getPiece(row, col)" :alt="getPieceType(row, col)" />
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
import { gameService } from "../services/game.service";

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

const selectedPiece = ref<{ row: number; col: number } | null>(null);
const possibleMoves = ref<string[]>([]);

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

const getPieceType = (row: number, col: number): string => {
  if (row === 8) {
    switch (col) {
      case 1:
      case 8:
        return "Tour blanche";
      case 2:
      case 7:
        return "Cavalier blanc";
      case 3:
      case 6:
        return "Fou blanc";
      case 4:
        return "Reine blanche";
      case 5:
        return "Roi blanc";
    }
  }
  if (row === 7) return "Pion blanc";

  if (row === 1) {
    switch (col) {
      case 1:
      case 8:
        return "Tour noire";
      case 2:
      case 7:
        return "Cavalier noir";
      case 3:
      case 6:
        return "Fou noir";
      case 4:
        return "Reine noire";
      case 5:
        return "Roi noir";
    }
  }
  if (row === 2) return "Pion noir";

  return "";
};

const handleCellClick = async (row: number, col: number) => {
  const position = `${columns[col - 1]}${9 - row}`;
  const gameId = parseInt(sessionStorage.getItem("currentGameId") || "0");
  
  if (gameId && getPiece(row, col)) {
    try {
      const moves = await gameService.getPossibleMoves(gameId, position);
      console.log(`Mouvements possibles pour ${position}:`, moves);
      selectedPiece.value = { row, col };
      possibleMoves.value = moves;
    } catch (error) {
      console.error("Erreur lors de la récupération des mouvements:", error);
    }
  } else {
    selectedPiece.value = null;
    possibleMoves.value = [];
  }
};
</script>
