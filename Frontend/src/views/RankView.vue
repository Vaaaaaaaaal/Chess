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
