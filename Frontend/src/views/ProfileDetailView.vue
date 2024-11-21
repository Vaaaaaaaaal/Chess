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

<style scoped></style>
