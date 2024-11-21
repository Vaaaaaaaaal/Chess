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

<style scoped>
.register {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #1e1e1e;
}

.register-card {
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.register-title {
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

.register-info {
  padding: 0 1rem;
  margin-bottom: 2rem;
}

h2 {
  color: white;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: normal;
}

.input-group {
  margin-bottom: 1.5rem;
}

.register-input {
  width: 100%;
  padding: 0.8rem;
  background-color: #1a1a1a;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
}

.register-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #ff6b6b;
}

.btn-register {
  width: 100%;
  padding: 1rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-register:hover {
  background-color: #ff5252;
}
</style>
