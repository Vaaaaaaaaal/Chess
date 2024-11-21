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
