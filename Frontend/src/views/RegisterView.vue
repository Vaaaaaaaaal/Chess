<template>
  <div class="register">
    <div class="register-card">
      <h1 class="register-title">Créer un compte</h1>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="register-info">
        <h2>Pseudo</h2>
        <div class="input-group">
          <input
            v-model="username"
            type="text"
            class="register-input"
            placeholder="Entrez votre pseudo"
          />
        </div>

        <h2>Mail</h2>
        <div class="input-group">
          <input
            v-model="email"
            type="email"
            class="register-input"
            placeholder="Entrez votre email"
          />
        </div>

        <h2>Mots de Passe</h2>
        <div class="input-group">
          <input
            v-model="password"
            type="password"
            class="register-input"
            placeholder="Entrez votre mot de passe"
          />
        </div>

        <h2>Confirmation de Mots de Passe</h2>
        <div class="input-group">
          <input
            v-model="confirmPassword"
            type="password"
            class="register-input"
            placeholder="Confirmez votre mot de passe"
          />
        </div>
      </div>

      <button class="btn-register" @click="handleRegister">S'inscrire</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axiosInstance from "@/utils/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");

const handleRegister = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      error.value = "Les mots de passe ne correspondent pas";
      return;
    }

    const response = await axiosInstance.post("/auth/register", {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    if (response.status === 200) {
      router.push("/login");
    }
  } catch (err: any) {
    console.error("Erreur détaillée:", err);
    error.value = err.response?.data?.message || "Erreur lors de l'inscription";
  }
};
</script>

<style scoped>
.error-message {
  color: #ff4444;
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: rgba(255, 68, 68, 0.1);
  border-radius: 4px;
}
</style>
