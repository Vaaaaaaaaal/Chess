<template>
  <div class="register">
    <div class="register-card">
      <h1 class="register-title">Créer un compte</h1>

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
import "primeicons/primeicons.css";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }

  try {
    // Appel API pour l'inscription
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    });

    if (response.ok) {
      router.push("/login"); // Redirection vers la page de connexion après inscription
    } else {
      const error = await response.json();
      alert(error.message || "Erreur lors de l'inscription");
    }
  } catch (error) {
    alert("Erreur lors de l'inscription");
  }
};
</script>
