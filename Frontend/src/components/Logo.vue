<template>
  <div class="chess-logo">
    <div class="logo-pieces">
      <div class="piece white-king" v-html="PIECES_IMG[`${Color.WHITE}_${PieceType.KING}`]"></div>
      <div class="piece black-queen" v-html="PIECES_IMG[`${Color.BLACK}_${PieceType.QUEEN}`]"></div>
    </div>
    <h1 class="logo-text">ChessApp</h1>
  </div>
</template>

<script setup lang="ts">
import { Color, PIECES_IMG, PieceType } from '@/model/Pieces.model';
</script>

<style scoped>
.chess-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.logo-pieces {
  position: relative;
  width: 60px;
  height: 60px;
}

.piece {
  position: absolute;
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease;
}

.white-king {
  z-index: 2;
  transform: translate(10px, 0);
}

.black-queen {
  z-index: 1;
  transform: translate(0, 10px);
}

.chess-logo:hover .white-king {
  transform: translate(15px, -5px) rotate(-5deg);
}

.chess-logo:hover .black-queen {
  transform: translate(-5px, 15px) rotate(5deg);
}

.logo-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
}
</style> 