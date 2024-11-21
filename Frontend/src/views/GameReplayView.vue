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

<style scoped>
.game-replay {
  min-height: 100vh;
  padding: 2rem;
  background-color: #1e1e1e;
  color: white;
}

.game-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 300px;
  margin-top: 25px;
}

.players-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 1rem;
}

.player {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  background-color: #3a3a3a;
  border-radius: 8px;
}

.player-avatar {
  width: 40px;
  height: 40px;
  background-color: #4a4a4a;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.player-name {
  flex: 1;
}

.player-medal {
  width: 30px;
  height: 30px;
}

.moves-panel {
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 1rem;
}

.moves-panel h3 {
  color: #ff6b6b;
  margin-top: 0;
  margin-bottom: 1rem;
}

.moves-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.move-item {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem;
  border-bottom: 1px solid #3a3a3a;
}

.navigation-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.nav-btn {
  background-color: #3a3a3a;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s;
}

.nav-btn:hover {
  background-color: #ff6b6b;
}

@media (max-width: 1024px) {
  .game-container {
    flex-direction: column;
    align-items: center;
  }

  .right-panel {
    width: 100%;
    max-width: 640px;
    margin-top: 2rem;
  }
}
</style>
