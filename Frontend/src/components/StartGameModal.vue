<template>
  <Transition name="modal">
    <div v-if="modelValue" class="modal-overlay">
      <div class="modal-content">
        <h2 class="modal-title">Nouvelle Partie</h2>

        <div class="players-section">
          <div class="player-card">
            <span class="player-name">ValGX</span>
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
              :class="['starter-btn', { active: starter === 'ValGX' }]"
              @click="starter = 'ValGX'"
            >
              ValGX
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
import { ref } from "vue";

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
const starter = ref("ValGX");

const startGame = () => {
  if (player2.value) {
    emit("start", {
      player1: "ValGX",
      player2: player2.value,
      starter: starter.value,
    });
    emit("update:modelValue", false);
    player2.value = "";
    starter.value = "ValGX";
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
  padding: 2rem;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.modal-title {
  color: white;
  text-align: center;
  font-size: 1.8rem;
  margin: 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid #333;
}

.players-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.player-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.player-name {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
}

.opponent-input {
  background: transparent;
  border: none;
  border-bottom: 2px solid #333;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  padding: 0.5rem;
  width: 120px;
  transition: border-color 0.3s;
}

.opponent-input:focus {
  outline: none;
  border-color: #ff6b6b;
}

.starter-section {
  text-align: center;
}

.starter-section h3 {
  color: #999;
  margin-bottom: 1rem;
}

.starter-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.starter-btn {
  padding: 0.8rem 1.5rem;
  border: 2px solid #333;
  border-radius: 25px;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.starter-btn.active {
  background: #ff6b6b;
  border-color: #ff6b6b;
}

.btn-start {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 25px;
  background: #ff6b6b;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-start:hover {
  background: #ff5252;
  transform: translateY(-2px);
}

.btn-start:disabled {
  background: #4a4a4a;
  cursor: not-allowed;
  transform: none;
}

/* Animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.vs {
  color: #ff6b6b;
  font-weight: bold;
  font-size: 2rem;
  margin: 0 1.5rem;
}
</style>
