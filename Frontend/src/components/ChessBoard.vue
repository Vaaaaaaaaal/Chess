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
            'selected-piece':
              selectedPiece?.row === row && selectedPiece?.col === col,
            'possible-move': possibleMoves.some(
              (move) => move.row === row && move.col === col
            ),
          },
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
const possibleMoves = ref<{ row: number; col: number }[]>([]);

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

      // Convertir les positions en coordonnées de la grille
      const convertedMoves = moves.map((move) => {
        const file = move.charAt(0).toUpperCase();
        const rank = parseInt(move.charAt(1));
        const colIndex = columns.indexOf(file) + 1;
        const rowIndex = 9 - rank;
        return { row: rowIndex, col: colIndex };
      });

      console.log("Cases correspondantes:", convertedMoves);
      selectedPiece.value = { row, col };
      possibleMoves.value = convertedMoves;
    } catch (error) {
      console.error("Erreur lors de la récupération des mouvements:", error);
    }
  } else {
    selectedPiece.value = null;
    possibleMoves.value = [];
  }
};
</script>

<style scoped>
.chess-board {
  position: relative;
  display: grid;
  grid-template-columns: repeat(8, 90px);
  grid-template-rows: repeat(8, 90px);
  border: 3px solid #333;
  width: 720px;
  height: 720px;
}

.board-row {
  display: contents;
}

.board-cell {
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.white-cell {
  background-color: #fff;
}

.red-cell {
  background-color: #ff9999;
}

.piece {
  width: 60px;
  height: 60px;
  z-index: 2;
}

.piece img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.possible-move::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background-color: #59675980;
  border-radius: 50%;
  z-index: 1;
}

.selected-piece {
  background-color: #59675980 !important;
}

.col-labels {
  position: absolute;
  bottom: -35px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  font-size: 1.2em;
}

.row-labels {
  position: absolute;
  left: -35px;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 1.2em;
}
</style>
