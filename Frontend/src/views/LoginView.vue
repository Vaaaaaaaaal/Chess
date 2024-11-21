<template>
  <div class="login">
    <div class="login-card">
      <h1 class="login-title">Connexion</h1>

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

        <h2>Mots de Passe</h2>
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

const router = useRouter();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    // Appel API pour la connexion
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Stockage du token dans le localStorage
      localStorage.setItem("token", data.token);
      router.push("/"); // Redirection vers la page d'accueil
    } else {
      const error = await response.json();
      alert(error.message || "Erreur lors de la connexion");
    }
  } catch (error) {
    alert("Erreur lors de la connexion");
  }
};
</script>
