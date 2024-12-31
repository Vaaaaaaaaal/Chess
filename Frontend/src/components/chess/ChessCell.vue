<template>
  <div
    :data-cy="`cell-${row}-${col}`"
    class="chess-cell"
    :class="cellClasses"
    @click="!isReplayMode && handleClick"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <div 
      v-if="piece"
      class="piece"
      :data-piece-type="piece.pieceType"
      :data-piece-color="piece.color"
      :class="pieceClasses"
      v-html="getPieceSVG(`${piece.color}_${piece.pieceType}` as FullPieceProperty)"
    ></div>
  </div>
</template>

<script setup lang="ts">
// ... autres imports
import { computed, ref } from 'vue';

// ... autres props

const touchStartTime = ref(0);
const LONG_PRESS_DURATION = 500;

const cellClasses = computed(() => ({
  'cursor-pointer': !isReplayMode,
  'bg-white': (row + col) % 2 === 0,
  'noir': (row + col) % 2 !== 0,
  'possible-move': isPossibleMove,
  'selected-cell': isSelected,
  'last-move-from': isLastMoveFrom,
  'last-move-to': isLastMoveTo,
}));

const pieceClasses = computed(() => ({
  'piece-black': piece?.color === 'BLACK',
  'piece-moving': isMoving,
  'piece-captured': isCaptured,
  'piece-touch-active': isTouchActive.value
}));

const handleTouchStart = (event: TouchEvent) => {
  event.preventDefault();
  touchStartTime.value = Date.now();
  isTouchActive.value = true;
};

const handleTouchEnd = (event: TouchEvent) => {
  event.preventDefault();
  isTouchActive.value = false;
  const touchDuration = Date.now() - touchStartTime.value;
  
  if (touchDuration < LONG_PRESS_DURATION) {
    handleClick();
  }
};
</script>

<style scoped>
.chess-cell {
  position: relative;
  width: min(12.5vw, 75px);
  height: min(12.5vw, 75px);
  touch-action: none;
}

.piece {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.piece img {
  width: 90%;
  height: 90%;
  object-fit: contain;
  pointer-events: none;
}

.piece-touch-active {
  transform: scale(1.1);
  z-index: 10;
}

@media (max-width: 768px) {
  .chess-cell {
    width: 12.5vw;
    height: 12.5vw;
  }

  .piece img {
    width: 95%;
    height: 95%;
  }
}
</style> 