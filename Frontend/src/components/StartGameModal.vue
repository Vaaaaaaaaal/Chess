<template>
  <Transition name="modal">
    <div v-if="modelValue" class="modal-overlay">
      <div class="modal-content">
        <h2 class="modal-title">Nouvelle Partie</h2>

        <div class="players-section">
          <div class="player-card">
            <span class="player-name">{{ currentUsername }}</span>
          </div>

          <span class="vs">VS</span>

          <div class="player-card">
            <input
              v-model="player2"
              type="text"
              placeholder="Adversaire"
              class="opponent-input"
              maxlength="10"
            />
          </div>
        </div>

        <div class="starter-section">
          <h3>Premier joueur</h3>
          <div class="starter-buttons">
            <button
              :class="['starter-btn', { active: starter === currentUsername }]"
              @click="starter = currentUsername"
            >
              {{ currentUsername }}
            </button>
            <button
              v-if="player2"
              :class="['starter-btn', { active: starter === player2 }]"
              @click="starter = player2"
            >
              {{ player2 }}
            </button>
          </div>
        </div>

        <div class="actions">
          <button class="btn-start" @click="startGame" :disabled="!player2">
            Commencer la partie
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (
    e: "start",
    players: { player1: string; player2: string; starter: string }
  ): void;
}>();

const player2 = ref("");
const currentUsername = ref("");
const starter = ref("");

onMounted(() => {
  currentUsername.value = sessionStorage.getItem("username") || "Joueur 1";
  starter.value = currentUsername.value;
});

const startGame = () => {
  if (player2.value) {
    emit("start", {
      player1: currentUsername.value,
      player2: player2.value,
      starter: starter.value,
    });
    emit("update:modelValue", false);
    player2.value = "";
    starter.value = currentUsername.value;
  }
};
</script>
