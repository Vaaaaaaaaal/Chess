<template>
  <div class="login">
    <div class="login-card">
      <h1 class="login-title">Connexion</h1>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="login-info">
        <h2>Mail</h2>
        <div class="input-group">
          <input
            v-model="email"
            type="email"
            class="login-input"
            placeholder="Entrez votre email"
            :disabled="isLoading"
          />
        </div>

        <h2>Mot de passe</h2>
        <div class="input-group">
          <input
            v-model="password"
            type="password"
            class="login-input"
            placeholder="Entrez votre mot de passe"
            :disabled="isLoading"
          />
        </div>
      </div>

      <button class="btn-login" @click="handleLogin" :disabled="isLoading">
        {{ isLoading ? "Connexion..." : "Se connecter" }}
      </button>

      <div class="register-link">
        Pas encore de compte ?
        <router-link to="/register" class="link">S'inscrire</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/auth/useAuth";
import { ref } from "vue";

const { login, error, isLoading } = useAuth();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    await login(email.value, password.value);
  } catch (err) {
    console.error("Erreur de connexion:", err);
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

.register-link {
  text-align: center;
  margin-top: 1rem;
  color: #ffffff80;
}

.link {
  color: #ff6b6b;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
