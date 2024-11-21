<template>
  <div v-if="modelValue" class="modal-overlay">
    <div class="modal-content">
      <div class="vs-section">
        <span class="player">{{ props.player1 }}</span>
        <span class="vs">VS</span>
        <span class="player">{{ props.player2 }}</span>
      </div>

      <h2 class="save-question">Comment voulez vous conserver la partie ?</h2>

      <div class="visibility-options">
        <button
          :class="['visibility-btn', { active: visibility === 'public' }]"
          @click="visibility = 'public'"
        >
          Publique
        </button>
        <button
          :class="['visibility-btn', { active: visibility === 'private' }]"
          @click="visibility = 'private'"
        >
          Privé
        </button>
      </div>

      <button class="save-btn" @click="saveGame">Enregistrer</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  modelValue: boolean;
  player1: string;
  player2: string;
  // ... autres props existantes
}>();

const visibility = ref("public");

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "save", visibility: string): void;
}>();

const saveGame = () => {
  emit("save", visibility.value);
  emit("update:modelValue", false);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  text-align: center;
}

h2 {
  color: #ff6b6b;
  margin-bottom: 2rem;
}

.game-result {
  margin-bottom: 2rem;
}

.winner {
  font-size: 1.5rem;
  color: #4caf50;
  margin-bottom: 1rem;
}

.stats {
  color: #b0b0b0;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.replay {
  background: #4caf50;
  color: white;
}

.home {
  background: #666;
  color: white;
}

.vs-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.player {
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
}

.vs {
  font-size: 2.5rem;
  color: #ff6b6b;
  font-weight: bold;
}

.save-question {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
}

.visibility-options {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.visibility-btn {
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 25px;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.visibility-btn.active {
  background: #ff6b6b;
}

.save-btn {
  width: 200px;
  padding: 1rem;
  font-size: 1.2rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s;
}

.save-btn:hover {
  transform: translateY(-2px);
}
</style>
