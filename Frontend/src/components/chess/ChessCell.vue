<template>
  <div
    :class="[
      'chess-cell cursor-pointer',
      (row + col) % 2 === 0 ? 'bg-white' : 'noir',
      {
        'possible-move': isPossibleMove,
        'selected-cell': isSelected,
        'last-move-from': isLastMoveFrom,
        'last-move-to': isLastMoveTo,
      },
    ]"
    @click="!isReplayMode && handleClick"
  >
    <CellCoordinates 
      :row="row" 
      :col="col" 
      :colorPlayer="colorPlayer" 
    />
    <ChessPiece
      v-if="piece"
      :piece="piece"
      :isMoving="isMoving"
      :isCaptured="isCaptured"
    />
  </div>
</template>

<script setup lang="ts">
import type { Piece } from '@/model/Pieces.model';
import CellCoordinates from './CellCoordinates.vue';
import ChessPiece from './ChessPiece.vue';

defineProps<{
  row: number;
  col: number;
  piece?: Piece;
  colorPlayer: string;
  isPossibleMove: boolean;
  isSelected: boolean;
  isLastMoveFrom: boolean;
  isLastMoveTo: boolean;
  isMoving: boolean;
  isCaptured: boolean;
  isReplayMode?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click', row: number, col: number): void;
}>();

const handleClick = () => emit('click', row, col);
</script> 