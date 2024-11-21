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
          />
        </div>

        <h2>Mot de passe</h2>
        <div class="input-group">
          <input
            v-model="password"
            type="password"
            class="login-input"
            placeholder="Entrez votre mot de passe"
          />
        </div>
      </div>

      <button class="btn-login" @click="handleLogin">Se connecter</button>

      <div class="register-link">
        Pas encore de compte ?
        <router-link to="/register" class="link">S'inscrire</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  try {
    await store.dispatch("auth/login", {
      email: email.value,
      password: password.value,
    });

    // Si la connexion réussit, on redirige vers la page d'accueil
    router.push("/");
  } catch (err: any) {
    error.value = err.response?.data?.message || "Erreur lors de la connexion";
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
