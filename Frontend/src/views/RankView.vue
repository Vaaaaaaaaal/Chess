<template>
  <div class="rank-view">
    <div class="podium-section">
      <!-- Deuxième place -->
      <div class="podium-item second">
        <div class="medal">
          <img src="@/assets/medals/2.png" alt="Médaille d'argent" />
        </div>
        <span class="player-name">CALENDOS</span>
      </div>

      <!-- Première place -->
      <div class="podium-item first">
        <div class="medal">
          <img src="@/assets/medals/1.png" alt="Médaille d'or" />
        </div>
        <span class="player-name">PATOUZ</span>
      </div>

      <!-- Troisième place -->
      <div class="podium-item third">
        <div class="medal">
          <img src="@/assets/medals/3.png" alt="Médaille de bronze" />
        </div>
        <span class="player-name">TILALU</span>
      </div>
    </div>

    <div class="ranking-container">
      <div class="table-header">
        <div class="header-position">Position</div>
        <div class="header-pseudo">Pseudo</div>
        <div class="header-points">Nb de points</div>
      </div>

      <div class="ranking-table">
        <div v-for="(player, index) in players" :key="index" class="table-row">
          <div class="position">#{{ player.position }}</div>
          <div class="pseudo">{{ player.name }}</div>
          <div class="points">{{ player.points }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const players = [
  { position: 4, name: "POPO", points: 8090 },
  { position: 5, name: "TATO", points: 8090 },
  { position: 6, name: "LOLA", points: 8090 },
  { position: 7, name: "JOSUANT", points: 8090 },
  { position: 8, name: "PHILIPPE", points: 8090 },
  { position: 9, name: "KARO", points: 8090 },
  { position: 10, name: "MARIO", points: 8090 },
  { position: 11, name: "LUIGI", points: 8090 },
  { position: 12, name: "PEACH", points: 8090 },
  { position: 13, name: "BOWSER", points: 8090 },
];
</script>

<style scoped>
.rank-view {
  min-height: 100vh;
  padding: 2rem;
  background-color: #1e1e1e;
  color: white;
}

.podium-section {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 4rem;
  padding: 2rem;
}

.podium-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.medal {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.medal img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.first {
  transform: translateY(-20px);
}

.player-name {
  font-size: 1.2rem;
  font-weight: bold;
}

.ranking-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: #2a2a2a;
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 1rem;
  background-color: #ff6b6b;
  color: white;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 1;
}

.ranking-table {
  max-height: calc(7 * 3.5rem); /* Hauteur pour 7 éléments */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ff6b6b #2a2a2a;
}

/* Style de la scrollbar pour Chrome/Safari */
.ranking-table::-webkit-scrollbar {
  width: 8px;
}

.ranking-table::-webkit-scrollbar-track {
  background: #2a2a2a;
}

.ranking-table::-webkit-scrollbar-thumb {
  background-color: #ff6b6b;
  border-radius: 4px;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid #3a3a3a;
  height: 3.5rem; /* Hauteur fixe pour chaque ligne */
  align-items: center;
}

.table-row:last-child {
  border-bottom: none;
}

.position,
.header-position {
  text-align: center;
}

.pseudo,
.header-pseudo {
  text-align: left;
}

.points,
.header-points {
  text-align: center;
}

/* Ajout d'une animation au survol des lignes */
.table-row:hover {
  background-color: #3a3a3a;
  transition: background-color 0.3s ease;
}
</style>
