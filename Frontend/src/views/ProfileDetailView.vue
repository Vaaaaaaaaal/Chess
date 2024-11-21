<template>
  <div class="profile-detail">
    <!-- En-tête du profil -->
    <div class="profile-header">
      <div class="profile-icon">
        <i class="pi pi-user"></i>
      </div>
      <h1 class="username">VALGX</h1>
      <router-link to="/profile/edit" class="edit-button">
        <i class="pi pi-pencil"></i>
      </router-link>
    </div>

    <!-- Statistiques -->
    <div class="stats-container">
      <div class="stat-card">
        <h3>Ratio</h3>
        <span class="stat-value">0.5</span>
      </div>
      <div class="stat-card">
        <h3>Nb de Partie</h3>
        <span class="stat-value">18</span>
      </div>
      <div class="stat-card">
        <h3>Partie Gagné</h3>
        <span class="stat-value">9</span>
      </div>
      <div class="stat-card">
        <h3>Partie Perdu</h3>
        <span class="stat-value">9</span>
      </div>
    </div>

    <!-- Conteneur pour l'historique avec titre -->
    <div class="history-container">
      <div class="games-history">
        <div class="games-list">
          <div v-for="game in games" :key="game.date" class="game-item">
            <span class="game-date">{{ game.date }}</span>
            <i
              :class="getGameStatusIcon(game.status)"
              :style="getGameStatusColor(game.status)"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "primeicons/primeicons.css";
import { ref } from "vue";

interface Game {
  date: string;
  status: "win" | "loss" | "draw";
}

const games = ref<Game[]>([
  { date: "Partie du 24/10/2024", status: "win" },
  { date: "Partie du 10/10/2024", status: "loss" },
  { date: "Partie du 01/10/2024", status: "draw" },
  { date: "Partie du 24/09/2024", status: "win" },
  { date: "Partie du 17/09/2024", status: "draw" },
  { date: "Partie du 16/09/2024", status: "win" },
  { date: "Partie du 15/09/2024", status: "loss" },
  { date: "Partie du 14/09/2024", status: "win" },
  { date: "Partie du 13/09/2024", status: "draw" },
]);

const getGameStatusIcon = (status: string) => {
  switch (status) {
    case "win":
      return "pi pi-check";
    case "loss":
      return "pi pi-times";
    case "draw":
      return "pi pi-equals";
    default:
      return "";
  }
};

const getGameStatusColor = (status: string) => {
  switch (status) {
    case "win":
      return { color: "#4CAF50" };
    case "loss":
      return { color: "#FF6B6B" };
    case "draw":
      return { color: "#9E9E9E" };
    default:
      return {};
  }
};
</script>

<style scoped>
.profile-detail {
  min-height: 100vh;
  padding: 2rem;
  background-color: #1e1e1e;
  color: white;
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 3rem;
}

.profile-icon {
  width: 100px;
  height: 100px;
  background-color: #333;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
}

.profile-icon .pi-user {
  font-size: 3rem;
  color: white;
}

.username {
  font-size: 2.5rem;
  margin: 0;
}

.edit-button {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding: 0 2rem;
}

.stat-card {
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.stat-card h3 {
  color: #ff6b6b;
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
}

.history-container {
  padding: 0 2rem; /* Même padding que stats-container */
}

.games-history {
  background-color: #2a2a2a;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1rem;
}

.games-list {
  max-height: 300px; /* Hauteur fixe pour le scroll */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ff6b6b #2a2a2a;
}

/* Style de la scrollbar pour Chrome/Safari */
.games-list::-webkit-scrollbar {
  width: 8px;
}

.games-list::-webkit-scrollbar-track {
  background: #2a2a2a;
}

.games-list::-webkit-scrollbar-thumb {
  background-color: #ff6b6b;
  border-radius: 4px;
}

.game-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #3a3a3a;
}

.game-item:last-child {
  border-bottom: none;
}

.game-item:hover {
  background-color: #3a3a3a;
  transition: background-color 0.3s ease;
}

.game-date {
  font-size: 1rem;
}

.game-item i {
  font-size: 1.2rem;
}
</style>
