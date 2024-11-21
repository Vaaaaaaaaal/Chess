<template>
  <div class="game-replay">
    <div class="game-container">
      <ChessBoard />

      <div class="right-panel">
        <!-- Section des joueurs -->
        <div class="players-info">
          <div class="player">
            <div class="player-avatar">
              <i class="pi pi-user"></i>
            </div>
            <span class="player-name">ValGX</span>
            <img
              src="@/assets/medals/1.png"
              alt="Médaille"
              class="player-medal"
            />
          </div>

          <div class="player">
            <div class="player-avatar">
              <i class="pi pi-user"></i>
            </div>
            <span class="player-name">Philou</span>
            <img
              src="@/assets/medals/2.png"
              alt="Médaille"
              class="player-medal"
            />
          </div>
        </div>

        <!-- Panel des coups -->
        <div class="moves-panel">
          <h3>Coups</h3>
          <div class="moves-list">
            <div class="move-item">
              <span>KE3</span>
              <span>KE6</span>
            </div>
            <!-- Plus de coups... -->
          </div>
          <div class="navigation-controls">
            <button class="nav-btn">
              <i class="pi pi-chevron-left"></i>
            </button>
            <button class="nav-btn">
              <i class="pi pi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChessBoard from "@/components/ChessBoard.vue";
import "primeicons/primeicons.css";
</script>
