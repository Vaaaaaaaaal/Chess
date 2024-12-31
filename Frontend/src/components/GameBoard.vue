<template>
  <div id="main" class="flex flex-column gap-4">
    <div id="pieceKilled" class="piece-killed-container">
      <h2>Pièces prises</h2>
      <div class="flex all-piece-killed">
        <CapturedPieces
          :pieces="blackKilledPieces"
          color="BLACK"
          class="captured-pieces-section"
        />
        <CapturedPieces
          :pieces="whiteKilledPieces"
          color="WHITE"
          class="captured-pieces-section"
        />
      </div>
    </div>

    <div id="damier" class="board-container">
      <div 
        class="chess-board" 
        :class="boardClasses"
      >
        <div v-for="row in 8" :key="'row-' + row" class="flex">
          <ChessCell
            v-for="col in 8"
            :key="'cell-' + row + '-' + col"
            :row="row"
            :col="col"
            :piece="board[row - 1][col - 1]?.piece"
            :colorPlayer="colorPlayer"
            :isPossibleMove="isPossibleMove(row - 1, col - 1)"
            :isSelected="isSelectedCell(row - 1, col - 1)"
            :isLastMoveFrom="isLastMoveFrom(row - 1, col - 1)"
            :isLastMoveTo="isLastMoveTo(row - 1, col - 1)"
            :isMoving="isMovingPiece(row - 1, col - 1)"
            :isCaptured="isCapturedPiece(row - 1, col - 1)"
            :isReplayMode="isReplayMode"
            @click="handleCellClick"
          />
        </div>
      </div>
    </div>

    <PromotionDialog
      v-model:visible="showPromotionDialogLocal"
      :availablePieces="availablePromotionPieces"
      @promote="handlePromotion"
    />

    <GameOverDialog
      v-model:visible="showGameOverDialogLocal"
      :message="gameOverMessage"
      @go-home="$emit('goHome')"
    />
  </div>
</template>

<script setup lang="ts">
import type { Case } from '@/model/Game.model';
import {
  Color,
  PIECES_IMG,
  PieceType,
  type FullPieceProperty,
  type Piece,
} from '@/model/Pieces.model';
import type { PossibleMove } from '@/model/PossibleMove.model';
import type { GameMoveDTO } from '@/modelDTO/GameMove.dto';
import { computed, ref } from 'vue';
import CapturedPieces from './chess/CapturedPieces.vue';
import ChessCell from './chess/ChessCell.vue';
import GameOverDialog from './chess/GameOverDialog.vue';
import PromotionDialog from './chess/PromotionDialog.vue';

const props = defineProps<{
  board: Case[][];
  colorPlayer: 'Noirs' | 'Blancs';
  blackKilledPieces: PieceType[];
  whiteKilledPieces: PieceType[];
  lastMove: GameMoveDTO | null;
  isReplayMode?: boolean;
  possibleMoves: PossibleMove[];
  gameOverMessage?: string;
  showGameOverDialog?: boolean;
  showPromotionDialog?: boolean;
  availablePromotionPieces: FullPieceProperty[];
}>();

const emit = defineEmits<{
  (e: 'move', data: GameMoveDTO): void;
  (e: 'promote', pieceType: PieceType): void;
  (e: 'goHome'): void;
  (e: 'selectPiece', position: { row: number; col: number } | null): void;
}>();

const selectedPiece = ref<{ row: number; col: number } | null>(null);

const showPromotionDialogLocal = ref(props.showPromotionDialog);
const showGameOverDialogLocal = ref(props.showGameOverDialog);

const currentPlayerColor = computed(() => 
  props.colorPlayer === 'Noirs' ? Color.BLACK : Color.WHITE
);

const movingPiece = ref<{i: number, j: number} | null>(null);
const capturedPiece = ref<{i: number, j: number} | null>(null);

const handleCellClick = (row: number, col: number) => {
  const currentCase = props.board[row - 1][col - 1];
  const currentPlayerColor = props.colorPlayer === 'Noirs' ? Color.BLACK : Color.WHITE;

  if (selectedPiece.value?.row === row - 1 && selectedPiece.value?.col === col - 1) {
    selectedPiece.value = null;
    emit('selectPiece', null);
    return;
  }

  if (!selectedPiece.value) {
    if (currentCase.piece && currentCase.piece.color === currentPlayerColor) {
      selectedPiece.value = { row: row - 1, col: col - 1 };
      emit('selectPiece', { row: row - 1, col: col - 1 });
    }
  } else {
    emit('move', {
      i: selectedPiece.value.row,
      j: selectedPiece.value.col,
      toI: row - 1,
      toJ: col - 1,
    });
    selectedPiece.value = null;
  }
};

const handlePromotion = (pieceType: PieceType) => {
  emit('promote', pieceType);
};

const isPossibleMove = (row: number, col: number): boolean => {
  return props.possibleMoves.some((move) => move.i === row && move.j === col);
};

const isSelectedCell = (row: number, col: number): boolean => {
  return selectedPiece.value?.row === row && selectedPiece.value?.col === col;
};

const isLastMoveFrom = (row: number, col: number): boolean => {
  return props.lastMove?.i === row && props.lastMove?.j === col;
};

const isLastMoveTo = (row: number, col: number): boolean => {
  return props.lastMove?.toI === row && props.lastMove?.toJ === col;
};

const getPieceSVG = (pieceType: FullPieceProperty | null) => {
  return pieceType ? PIECES_IMG[pieceType] : '';
};

const getPieceFullProperty = (piece: Piece): FullPieceProperty => {
  return `${piece.color}_${piece.pieceType}` as FullPieceProperty;
};

const removePieceColor = (pieceType: FullPieceProperty): PieceType => {
  return pieceType.split('_')[1] as PieceType;
};

const isMovingPiece = (i: number, j: number): boolean => {
  return movingPiece.value?.i === i && movingPiece.value?.j === j;
};

const isCapturedPiece = (i: number, j: number): boolean => {
  return capturedPiece.value?.i === i && capturedPiece.value?.j === j;
};

const handleMove = async (moveData: GameMoveDTO) => {
  movingPiece.value = { i: moveData.i, j: moveData.j };
  
  if (props.board[moveData.toI][moveData.toJ].piece) {
    capturedPiece.value = { i: moveData.toI, j: moveData.toJ };
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    const response = await move(moveData);
  } finally {
    movingPiece.value = null;
    capturedPiece.value = null;
  }
};
</script>

<style scoped>
.board-container {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.piece-killed-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
}

.captured-pieces-section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

@media (max-width: 768px) {
  .board-container {
    padding: 0.5rem;
  }

  .piece-killed-container {
    padding: 0.25rem;
  }

  .captured-pieces-section {
    gap: 0.25rem;
  }

  h2 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
  }
}
</style>
