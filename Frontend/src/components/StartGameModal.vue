<template>
  <Transition name="modal">
    <div v-if="modelValue" class="modal-overlay">
      <div class="modal-content">
        <h2 class="modal-title">Nouvelle Partie</h2>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

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
          <button
            class="btn-start"
            @click="startGame"
            :disabled="!player2 || isLoading"
          >
            {{ isLoading ? "Création en cours..." : "Commencer la partie" }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useGame } from "@/composables/game/useGame";
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

const { createGame, error, isLoading } = useGame();
const player2 = ref("");
const currentUsername = ref("");
const starter = ref("");

onMounted(() => {
  currentUsername.value = sessionStorage.getItem("username") || "Joueur 1";
  starter.value = currentUsername.value;
});

const startGame = async () => {
  if (player2.value) {
    try {
      console.log("Démarrage de la création de partie");
      
      const response = await createGame({
        username2: player2.value,
        who_start: starter.value === currentUsername.value,
        game_state: JSON.stringify({
          pieces: {},
          starter: starter.value === player2.value
        })
      });

      if (response) {
        console.log("Partie créée avec succès");
        emit("start", {
          player1: currentUsername.value,
          player2: player2.value,
          starter: starter.value
        });
        emit("update:modelValue", false);
        player2.value = "";
        starter.value = currentUsername.value;
      }
    } catch (err) {
      console.error("Erreur lors de la création de la partie:", err);
    }
  }
};
</script>

<style scoped>
.error-message {
  color: #ff4444;
  text-align: center;
  margin: 1rem;
  padding: 0.5rem;
  background-color: rgba(255, 68, 68, 0.1);
  border-radius: 4px;
}

.btn-start:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
