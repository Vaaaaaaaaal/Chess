<template>
  <div class="register">
    <div class="register-card">
      <h1 class="register-title">Créer un compte</h1>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="handleRegister" class="register-info">
        <h2>Pseudo</h2>
        <div class="input-group">
          <input
            v-model="formData.username"
            type="text"
            class="register-input"
            placeholder="Entrez votre pseudo"
            required
          />
        </div>

        <h2>Mail</h2>
        <div class="input-group">
          <input
            v-model="formData.email"
            type="email"
            class="register-input"
            placeholder="Entrez votre email"
            required
          />
        </div>

        <h2>Mot de passe</h2>
        <div class="input-group">
          <input
            v-model="formData.password"
            type="password"
            class="register-input"
            placeholder="Entrez votre mot de passe"
            required
            minlength="6"
          />
        </div>

        <h2>Confirmation du mot de passe</h2>
        <div class="input-group">
          <input
            v-model="formData.confirmPassword"
            type="password"
            class="register-input"
            placeholder="Confirmez votre mot de passe"
            required
          />
        </div>

        <button type="submit" class="btn-register" :disabled="isLoading">
          {{ isLoading ? "Inscription en cours..." : "S'inscrire" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserService } from "@/composables/user/userService";
import type { UserRegistration } from "@/types/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { register, error, isLoading } = useUserService();

const formData = ref<UserRegistration>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const handleRegister = async () => {
  try {
    await register(formData.value);
    router.push("/login");
  } catch (err) {
    // L'erreur est déjà gérée dans le service
    console.error("Erreur d'inscription:", err);
  }
};
</script>

<style scoped>
.btn-register:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.7;
}

.error-message {
  color: #ff4444;
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: rgba(255, 68, 68, 0.1);
  border-radius: 4px;
}
</style>
