<template>
  <div
    :data-cy="`cell-${row}-${col}`"
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
    <div 
      v-if="piece"
      class="piece"
      :data-piece-type="piece.pieceType"
      :data-piece-color="piece.color"
      :class="{
        'piece-black': piece.color === 'BLACK',
        'piece-moving': isMoving,
        'piece-captured': isCaptured
      }"
      v-html="getPieceSVG(`${piece.color}_${piece.pieceType}` as FullPieceProperty)"
    ></div>
  </div>
</template> 