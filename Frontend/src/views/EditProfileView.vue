<template>
  <div class="edit-profile">
    <div class="profile-card">
      <div class="profile-icon">
        <i class="pi pi-user"></i>
      </div>

      <div class="profile-info">
        <h2>Pseudo</h2>
        <div class="input-group">
          <input
            v-model="username"
            type="text"
            class="profile-input"
            placeholder="Entrez votre pseudo"
          />
        </div>

        <h2>Mail</h2>
        <div class="input-group">
          <input
            v-model="email"
            type="email"
            class="profile-input"
            placeholder="Entrez votre email"
          />
        </div>

        <h2>Mots de Passe</h2>
        <div class="input-group">
          <input
            v-model="password"
            type="password"
            class="profile-input"
            placeholder="Entrez votre mot de passe"
          />
        </div>

        <h2>Confirmation de Mots de Passe</h2>
        <div class="input-group">
          <input
            v-model="confirmPassword"
            type="password"
            class="profile-input"
            placeholder="Confirmez votre mot de passe"
          />
        </div>
      </div>

      <button class="btn-modifier" @click="updateProfile">Modifier</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import "primeicons/primeicons.css"; // Import des styles PrimeIcons
import { ref } from "vue";

const username = ref("VALGX");
const email = ref("val66666677777@gmail.com");
const password = ref("");
const confirmPassword = ref("");

const updateProfile = () => {
  // Logique de mise à jour du profil
  if (password.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }
  // Appel API pour mettre à jour le profil
};
</script>

<style scoped>
.edit-profile {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #1e1e1e;
}

.profile-card {
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  background-color: #333;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-icon .pi-user {
  font-size: 2.5rem;
  color: white;
}

.profile-info {
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

.profile-input {
  width: 100%;
  padding: 0.8rem;
  background-color: #1a1a1a;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
}

.profile-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #ff6b6b;
}

.btn-modifier {
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

.btn-modifier:hover {
  background-color: #ff5252;
}
</style>
