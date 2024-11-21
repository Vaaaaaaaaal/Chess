<template>
  <div v-if="modelValue" class="modal-overlay">
    <div class="modal-content">
      <h2>Fin de la partie 🏆</h2>
      <div class="game-result">
        <p class="winner">{{ winner }} a gagné !</p>
        <div class="stats">
          <p>Durée de la partie: {{ duration }}</p>
          <p>Nombre de coups: {{ moves }}</p>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn replay" @click="replay">Nouvelle partie</button>
        <button class="btn home" @click="goHome">Retour à l'accueil</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  modelValue: boolean;
  winner: string;
  duration: string;
  moves: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "replay"): void;
}>();

const replay = () => {
  emit("replay");
  emit("update:modelValue", false);
};

const goHome = () => {
  emit("update:modelValue", false);
  router.push("/");
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
</style>
