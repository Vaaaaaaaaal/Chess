<template>
  <div class="list-piece-killed">
    <div
      v-for="piece in pieces"
      :key="`${piece}_${Math.random()}`"
      class="piece"
      :class="{ 'piece-black': color === 'BLACK' }"
      v-html="getPieceSVG(`${color}_${piece}` as FullPieceProperty)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { PieceType, type FullPieceProperty } from '@/model/Pieces.model';
import { getPieceSVG } from '@/utils/pieceUtils';

const props = defineProps<{
  pieces: PieceType[];
  color: 'BLACK' | 'WHITE';
}>();
</script> 